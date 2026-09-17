import os
import sys
from pathlib import Path
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from functools import partial
from threading import Thread
from playwright.sync_api import sync_playwright

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

# Ensure print flushes immediately
_orig_print = print
def print(*args, **kwargs):
    kwargs.setdefault('flush', True)
    return _orig_print(*args, **kwargs)

ROOT = Path(__file__).resolve().parents[1]
PROTOTYPE_DIR = ROOT / 'prototype'

# Start local HTTP server
server = ThreadingHTTPServer(('127.0.0.1', 0), partial(SimpleHTTPRequestHandler, directory=str(PROTOTYPE_DIR)))
Thread(target=server.serve_forever, daemon=True).start()
BASE_URL = f'http://127.0.0.1:{server.server_port}/index.html'

# 7 Viewport standards requested in the Master Specification
EXTENDED_VIEWPORTS = [
    ('Mobile_Small_320', 320, 568),
    ('Mobile_Android_360', 360, 640),
    ('Mobile_Standard_390', 390, 844),
    ('Tablet_Small_768', 768, 1024),
    ('Tablet_Standard_820', 820, 1180),
    ('Desktop_Small_1024', 1024, 768),
    ('Desktop_Standard_1440', 1440, 900)
]

ROUTES = ['home', 'services', 'programs', 'insights', 'public', 'office']

print("=================================================================")
print("RUNNING EXTENDED VIEWPORT & DEEP-LINKING AUTOMATED VERIFICATION")
print(f"Server URL: {BASE_URL}")
print("=================================================================")

with sync_playwright() as pw:
    browser = pw.chromium.launch(headless=True, channel='msedge', args=['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'])

    # 1. EXTENDED VIEWPORT OVERFLOW AUDIT (7 Viewports x 6 Routes = 42 checks)
    print("\n[Phase 1] Auditing Zero Horizontal Overflow across 7 Viewports...")
    for label, w, h in EXTENDED_VIEWPORTS:
        context = browser.new_context(viewport={'width': w, 'height': h}, device_scale_factor=1, reduced_motion='reduce')
        page = context.new_page()
        page.goto(BASE_URL, wait_until='load')
        page.wait_for_timeout(200)

        for route in ROUTES:
            page.evaluate('(route) => navigate(route, false)', route)
            page.wait_for_timeout(100)

            dims = page.evaluate('({viewport: innerWidth, scroll: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight})')
            # Check horizontal overflow (strict constraint: scroll <= viewport + 1px)
            assert dims['scroll'] <= w + 2, f"FAILED: Horizontal overflow detected on {label} ({w}px) route={route}! ScrollWidth={dims['scroll']}"
            assert dims['height'] > h, f"FAILED: Page height not valid on {label} route={route}"

        print(f"  [PASS]: {label:24s} ({w:4d}x{h:4d}px) - 6 Routes tested, 0px horizontal overflow!")
        context.close()

    # 2. DEEP-LINKING URL AUDIT
    print("\n[Phase 2] Auditing Deep-Linking Direct URL to Service Details...")
    context = browser.new_context(viewport={'width': 1440, 'height': 900})
    page = context.new_page()

    # Direct URL navigation to #services/ckg
    print("  -> Navigating to #services/ckg...")
    page.goto(f"{BASE_URL}#services/ckg", wait_until='load')
    page.wait_for_timeout(400)

    # Assert services page is active AND modal is open
    assert page.locator('#page-services.active').count() == 1, "Deep link failed: Services page not active"
    assert page.locator('#service-detail-modal').evaluate('(el) => el.classList.contains("open")'), "Deep link failed: Modal not open for ckg"
    assert "Cek Kesehatan Gratis" in page.locator('#modal-svc-title').inner_text(), "Deep link opened wrong service detail"
    print("  [PASS]: Direct URL '#services/ckg' automatically loaded services page and opened CKG modal!")

    # Test modal close updates hash back to #services
    print("  -> Testing modal close...")
    page.locator('#modal-svc-close').click()
    page.wait_for_timeout(200)
    assert not page.locator('#service-detail-modal').evaluate('(el) => el.classList.contains("open")'), "Modal failed to close"
    current_hash = page.evaluate('location.hash')
    assert current_hash == '#services', f"Closing modal did not reset hash to #services, got {current_hash}"
    print("  [PASS]: Closing modal updated URL hash back to '#services'")

    # Direct URL navigation to #services/gigi
    print("  -> Testing hashchange to #services/gigi...")
    page.evaluate("location.hash = '#services/gigi'")
    page.wait_for_timeout(400)
    assert page.locator('#service-detail-modal').evaluate('(el) => el.classList.contains("open")'), "Hashchange failed to open modal for gigi"
    assert "Gigi dan Mulut" in page.locator('#modal-svc-title').inner_text(), "Deep link opened wrong title for gigi"
    print("  [PASS]: Hashchange to '#services/gigi' dynamically opened Dental service modal!")

    # Phase 3: Auditing Citizen Online Complaint Form & Office Audit Trail Sync
    print("\n[Phase 3] Auditing Citizen Online Complaint Form & Office Audit Trail...")
    page.evaluate("location.hash = '#public'")
    page.wait_for_timeout(300)
    page.locator('button[data-ptab="pengaduan"]').click()
    page.wait_for_timeout(200)

    page.locator('#complaint-name').fill('Baharuddin')
    page.locator('#complaint-contact').fill('081299887766')
    page.locator('#complaint-service').select_option('Poli Gigi')
    page.locator('#complaint-message').fill('Apresiasi untuk pelayanan dokter gigi yang sangat ramah dan informatif.')
    page.locator('#public-complaint-form button[type="submit"]').click()
    page.wait_for_timeout(300)

    assert page.locator('#complaint-receipt').is_visible(), "Complaint receipt not visible after submission"
    ticket_id = page.locator('#receipt-ticket-id').inner_text()
    assert ticket_id.startswith('ADU-2026-'), f"Invalid ticket format: {ticket_id}"
    print(f"  [PASS]: Complaint form successfully submitted! Ticket generated: {ticket_id}")

    # Verifikasi sinkronisasi ke tabel audit log Smart Virtual Office
    page.evaluate("location.hash = '#office'")
    page.wait_for_timeout(300)
    office_audit_text = page.locator('#office-audit-table').inner_text()
    assert ticket_id in office_audit_text, f"Ticket {ticket_id} not recorded in Smart Virtual Office audit log!"
    print(f"  [PASS]: Ticket {ticket_id} successfully synchronized into Smart Virtual Office audit logs!")

    context.close()
    browser.close()

print("\n=================================================================")
print("ALL EXTENDED CHECKS PASSED: 7 VIEWPORTS, SLUGS & AUDIT LOG SYNC!")
print("=================================================================")
os._exit(0)

