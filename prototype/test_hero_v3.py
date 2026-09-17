import os
import sys
import time
import socket
import threading
from http.server import SimpleHTTPRequestHandler, HTTPServer
from playwright.sync_api import sync_playwright

def find_free_port():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind(('', 0))
    port = s.getsockname()[1]
    s.close()
    return port

def run():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    port = find_free_port()
    
    class SilentHandler(SimpleHTTPRequestHandler):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, directory=base_dir, **kwargs)
        def log_message(self, format, *args):
            pass

    server = HTTPServer(('127.0.0.1', port), SilentHandler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()

    url = f"http://127.0.0.1:{port}/index.html"
    print("=" * 65)
    print("VERIFIKASI HERO SECTION V3.1 (DIGITAL GATEWAY & INTERACTIVE MOSAIC)")
    print(f"Server Uji: {url}")
    print("=" * 65)

    screenshots_dir = os.path.join(base_dir, "..", "docs", "implementation", "screenshots")
    os.makedirs(screenshots_dir, exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(channel="msedge")
        
        viewports = [
            ("Mobile_Small_320", 320, 568),
            ("Mobile_Android_360", 360, 640),
            ("Mobile_Standard_390", 390, 844),
            ("Tablet_Small_768", 768, 1024),
            ("Tablet_Standard_820", 820, 1180),
            ("Desktop_Small_1024", 1024, 768),
            ("Desktop_Standard_1440", 1440, 900)
        ]

        print("\n[Phase 1] Audit Zero Horizontal Overflow pada Hero V3.1 across 7 Viewports...")
        for name, w, h in viewports:
            context = browser.new_context(viewport={"width": w, "height": h})
            page = context.new_page()
            page.goto(url, wait_until="networkidle")

            # Cek overflow
            overflow = page.evaluate("""() => {
                const hero = document.querySelector('.hero-v3-gateway');
                const doc = document.documentElement;
                return {
                    docScroll: doc.scrollWidth,
                    docClient: doc.clientWidth,
                    heroScroll: hero ? hero.scrollWidth : 0,
                    heroClient: hero ? hero.clientWidth : 0
                };
            }""")

            diff = overflow["docScroll"] - overflow["docClient"]
            if diff > 0:
                print(f"  [FAIL] {name} ({w}x{h}px): Horizontal overflow {diff}px!")
                sys.exit(1)
            else:
                print(f"  [PASS] {name:<22} ({w:>4}x{h:>4}px): 0px overflow!")

            # Ambil screenshot Hero khusus untuk Desktop 1440 dan Mobile 390
            if name == "Desktop_Standard_1440":
                hero_el = page.locator(".hero-v3-gateway")
                hero_shot = os.path.join(screenshots_dir, "Hero_V3_1_Desktop_1440.png")
                hero_el.screenshot(path=hero_shot)
                print(f"  -> Screenshot hero desktop disimpan: {hero_shot}")

            if name == "Mobile_Standard_390":
                hero_el = page.locator(".hero-v3-gateway")
                hero_shot = os.path.join(screenshots_dir, "Hero_V3_1_Mobile_390.png")
                hero_el.screenshot(path=hero_shot)
                print(f"  -> Screenshot hero mobile disimpan: {hero_shot}")

            context.close()

        print("\n[Phase 2] Uji Fungsionalitas Quick Service Finder & Tautan Eksternal CKG...")
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()
        page.goto(url, wait_until="networkidle")

        # 1. Verifikasi tautan CKG
        ckg_links = page.locator('a[href="https://ckg.puskesmasmalimpung.id/"]').all()
        assert len(ckg_links) >= 1, "Tautan CKG https://ckg.puskesmasmalimpung.id/ harus tersedia"
        print(f"  [PASS] Tautan eksternal ke https://ckg.puskesmasmalimpung.id/ terverifikasi ({len(ckg_links)} tautan ditemukan).")

        # 2. Uji Quick Finder input -> Services
        page.fill("#hero-service-finder", "Gigi")
        page.click("#btn-hero-finder")
        page.wait_for_timeout(400)

        current_hash = page.evaluate("() => window.location.hash")
        assert current_hash == "#services", f"Expected #services but got {current_hash}"
        
        filtered_val = page.input_value("#service-search")
        assert filtered_val == "Gigi", f"Expected 'Gigi' in search box but got {filtered_val}"

        visible_cards = page.locator(".service-card:visible").count()
        assert visible_cards == 1, f"Expected 1 filtered dental card but got {visible_cards}"
        print("  [PASS] Quick Finder berhasil mengalihkan ke #services dan memfilter poli Gigi secara instan!")

        browser.close()

    server.shutdown()
    print("\n" + "=" * 65)
    print("ALL CHECKS PASSED FOR HERO V3.1!")
    print("=" * 65)

if __name__ == "__main__":
    run()
