import os
import sys
import time
from pathlib import Path
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from functools import partial
from threading import Thread
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
PROTOTYPE_DIR = ROOT / 'prototype'
OUT_FULLPAGE = ROOT / 'fullpage'
OUT_DOCS_SS = ROOT / 'docs' / 'implementation' / 'screenshots'

OUT_FULLPAGE.mkdir(parents=True, exist_ok=True)
OUT_DOCS_SS.mkdir(parents=True, exist_ok=True)

# Start local HTTP server for assets and cross-origin compliance
server = ThreadingHTTPServer(('127.0.0.1', 0), partial(SimpleHTTPRequestHandler, directory=str(PROTOTYPE_DIR)))
Thread(target=server.serve_forever, daemon=True).start()
BASE_URL = f'http://127.0.0.1:{server.server_port}/index.html'

DEVICES = [
    ('Desktop', 1440, 900),
    ('Tablet', 820, 1180),
    ('Mobile', 390, 844)
]

ROUTES = [
    ('home', 'Beranda'),
    ('services', 'Layanan'),
    ('programs', 'Program_Kesehatan'),
    ('insights', 'Kesehatan_Wilayah'),
    ('public', 'Informasi_Publik'),
    ('office', 'Kantor_Virtual')
]

print(f"Starting QA Automation & Fullpage Capture at {BASE_URL}...")

with sync_playwright() as pw:
    browser = pw.chromium.launch(headless=True, channel='msedge', args=['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'])

    for device, w, h in DEVICES:
        print(f"\n--- Testing Viewport: {device} ({w}x{h}) ---")
        context = browser.new_context(
            viewport={'width': w, 'height': h},
            device_scale_factor=1,
            reduced_motion='reduce'
        )
        page = context.new_page()
        errors = []
        page.on('pageerror', lambda err: errors.append(str(err)))

        page.goto(BASE_URL, wait_until='networkidle')
        page.wait_for_timeout(300)

        for route, label in ROUTES:
            # Navigate via JS helper
            page.evaluate('(route) => navigate(route, false)', route)
            page.wait_for_timeout(200)

            # Assert visible page is singular and correct
            assert page.locator('.page.active').count() == 1, f"{device} {route}: Multiple active pages"
            assert page.locator(f'#page-{route}.active').count() == 1, f"{device} {route}: Target route not active"

            # Check horizontal overflow
            dims = page.evaluate('({viewport: innerWidth, scroll: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight})')
            assert dims['scroll'] <= w + 2, f"{device} {route}: Horizontal overflow detected! Viewport={w}, ScrollWidth={dims['scroll']}"
            assert dims['height'] > h, f"{device} {route}: Page is not full height! Height={dims['height']}"

            # Route-specific functional tests
            if route == 'services':
                # Initial cards count
                initial_count = page.locator('.service-card').count()
                assert initial_count >= 6, f"Services count was {initial_count}, expected >= 6"

                # Test search
                page.locator('#service-search').fill('gigi')
                page.wait_for_timeout(100)
                assert page.locator('.service-card').count() == 1, "Search for 'gigi' failed to filter to 1 card"

                # Test reset
                page.locator('#service-reset').click()
                page.wait_for_timeout(100)
                assert page.locator('.service-card').count() == initial_count, "Reset failed to restore services"

                # Test detail modal open and close
                page.locator('[data-service="ckg"]').click()
                page.wait_for_timeout(150)
                assert page.locator('#service-detail-modal').evaluate('(el) => el.classList.contains("open")'), "Detail modal failed to open"
                page.locator('#modal-svc-close').click()
                page.wait_for_timeout(150)
                assert not page.locator('#service-detail-modal').evaluate('(el) => el.classList.contains("open")'), "Detail modal failed to close"

            if route == 'insights':
                # Topic switcher test
                page.locator('[data-topic="ptm"]').click()
                page.wait_for_timeout(100)
                assert 'PTM' in page.locator('#topic-title').inner_text(), "Topic switcher to PTM failed"

                page.locator('[data-topic="ckg"]').click()
                page.wait_for_timeout(100)
                # Confirm data integrity: metrics show '—' placeholder rather than fake zero
                assert page.locator('#kpi-val-1').inner_text() == '—', "KPI value 1 fabricated!"
                assert page.locator('#kpi-val-2').inner_text() == '—', "KPI value 2 fabricated!"

            if route == 'public':
                # Public tabs switcher test
                page.locator('[data-ptab="maklumat"]').click()
                page.wait_for_timeout(100)
                assert page.locator('#ptab-maklumat').is_visible(), "Maklumat tab failed to display"
                page.locator('[data-ptab="standar"]').click()
                page.wait_for_timeout(100)
                assert page.locator('#ptab-standar').is_visible(), "Standar tab failed to display"

            if route == 'office':
                # Check initial tables
                assert page.locator('#office-service-table tr').count() >= 6, "Office service table missing rows"

            # Capture Full-Page Screenshot
            page.evaluate('window.scrollTo(0, 0)')
            page.wait_for_timeout(150)
            
            filename = f"{label}_{device}_{w}_FULLPAGE.png"
            path1 = OUT_FULLPAGE / filename
            path2 = OUT_DOCS_SS / filename

            page.screenshot(path=str(path1), full_page=True, animations='disabled', timeout=30000)
            page.screenshot(path=str(path2), full_page=True, animations='disabled', timeout=30000)

            print(f"  PASS: {label:22s} {device:7s} ({w}x{dims['height']}px) -> {filename}")

        if device == 'Mobile':
            # Test mobile navigation drawer
            page.locator('#menu-toggle').click()
            page.wait_for_timeout(150)
            assert page.locator('#mobile-nav').evaluate('(el) => el.classList.contains("open")'), "Mobile drawer failed to open"
            page.locator('#mobile-nav [data-go="services"]').click()
            page.wait_for_timeout(150)
            assert page.locator('#page-services.active').count() == 1, "Mobile navigation failed to route to services"
            print("  PASS: Mobile navigation drawer interaction and routing verified")

        assert not errors, f"JavaScript errors occurred on {device}: {errors}"
        context.close()

    browser.close()

server.shutdown()
print("\n=======================================================")
print("ALL QA AUTOMATION CHECKS PASSED SUCCESSFULLY!")
print("18 Full-Page Screenshots generated in fullpage/ and docs/implementation/screenshots/")
print("=======================================================")
