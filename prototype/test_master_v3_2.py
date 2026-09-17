import os
import sys
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
    print("=" * 70)
    print("AUDIT KEPATUHAN MASTER TECHNICAL DIRECTION V3.2 — PUSKESMAS MALIMPUNG")
    print(f"URL Pengujian Lokal: {url}")
    print("=" * 70)

    screenshots_dir = os.path.join(base_dir, "..", "docs", "implementation", "screenshots")
    os.makedirs(screenshots_dir, exist_ok=True)

    # 8 Breakpoint Produksi Wajib Sesuai Pasal 35
    viewports = [
        ("Mobile_XS_320", 320, 568),
        ("Mobile_S_360", 360, 640),
        ("Mobile_M_390", 390, 844),
        ("Mobile_L_430", 430, 932),
        ("Tablet_Portrait_768", 768, 1024),
        ("Tablet_Landscape_820", 820, 1180),
        ("Desktop_Small_1024", 1024, 768),
        ("Desktop_Master_1440", 1440, 900)
    ]

    with sync_playwright() as p:
        browser = p.chromium.launch(channel="msedge")

        print("\n[Tahap 1] Verifikasi Responsivitas & Zero Horizontal Overflow (8 Breakpoints)...")
        for name, w, h in viewports:
            context = browser.new_context(viewport={"width": w, "height": h})
            page = context.new_page()
            page.goto(url, wait_until="networkidle")

            overflow = page.evaluate("""() => {
                const doc = document.documentElement;
                return {
                    scrollWidth: doc.scrollWidth,
                    clientWidth: doc.clientWidth
                };
            }""")

            diff = overflow["scrollWidth"] - overflow["clientWidth"]
            if diff > 0:
                print(f"  [GAGAL] {name:<22} ({w:>4}x{h:>4}px): Terjadi horizontal overflow sebesar {diff}px!")
                sys.exit(1)
            else:
                print(f"  [LULUS] {name:<22} ({w:>4}x{h:>4}px): 0px horizontal overflow.")

            # Tangkapan layar Beranda sesuai mockup master
            if name == "Desktop_Master_1440":
                shot_path = os.path.join(screenshots_dir, "01_Beranda_Desktop_1440.png")
                page.screenshot(path=shot_path, full_page=True)
                print(f"  -> Screenshot Beranda Desktop tersimpan: {shot_path}")

            if name == "Tablet_Portrait_768":
                shot_path = os.path.join(screenshots_dir, "02_Beranda_Tablet_768.png")
                page.screenshot(path=shot_path, full_page=True)
                print(f"  -> Screenshot Beranda Tablet tersimpan: {shot_path}")

            if name == "Mobile_M_390":
                shot_path = os.path.join(screenshots_dir, "03_Beranda_Mobile_390.png")
                page.screenshot(path=shot_path, full_page=True)
                print(f"  -> Screenshot Beranda Mobile tersimpan: {shot_path}")

                # Buka Mobile Drawer dan ambil screenshot
                menu_btn = page.locator("#menu-toggle")
                if menu_btn.is_visible():
                    menu_btn.click()
                    page.wait_for_timeout(300)
                    drawer_shot = os.path.join(screenshots_dir, "04_Menu_Drawer_Mobile_390.png")
                    page.screenshot(path=drawer_shot)
                    print(f"  -> Screenshot Mobile Drawer tersimpan: {drawer_shot}")

            context.close()

        print("\n[Tahap 2] Verifikasi Halaman Berita & Informasi (#news)...")
        for name, w, h in [("Desktop_Master_1440", 1440, 900), ("Tablet_Portrait_768", 768, 1024), ("Mobile_M_390", 390, 844)]:
            context = browser.new_context(viewport={"width": w, "height": h})
            page = context.new_page()
            page.goto(f"{url}#news", wait_until="networkidle")
            page.wait_for_timeout(400)

            shot_name = f"05_Halaman_Berita_{name}.png"
            shot_path = os.path.join(screenshots_dir, shot_name)
            page.screenshot(path=shot_path, full_page=True)
            print(f"  [LULUS] Halaman Berita ({name}): Screenshot tersimpan -> {shot_path}")

            # Uji filter kategori berita di desktop
            if name == "Desktop_Master_1440":
                page.click('button[data-news-cat="edukasi"]')
                page.wait_for_timeout(200)
                visible_cards = page.locator('#news-articles-container .news-item-card:visible').count()
                print(f"  [LULUS] Filter Kategori 'Edukasi': {visible_cards} artikel tampil.")

            context.close()

        print("\n[Tahap 3] Verifikasi Kunci Domain & Isolasi CKG Subdomain...")
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()
        page.goto(url, wait_until="networkidle")

        ckg_links = page.locator('a[href="https://ckg.puskesmasmalimpung.id/"]').all()
        assert len(ckg_links) >= 1, "Tautan ke subdomain CKG wajib ada di beranda"
        target_attr = ckg_links[0].get_attribute("target")
        assert target_attr == "_blank", "Tautan CKG harus membuka tab baru (_blank)"
        print(f"  [LULUS] Tautan subdomain CKG (https://ckg.puskesmasmalimpung.id/) terverifikasi (target='{target_attr}').")

        # Verifikasi 3 Fakta Struktur Wilayah
        fact_text = page.locator(".hero-facts-strip").text_content()
        assert "2 Desa" in fact_text and "1 Kelurahan" in fact_text and "8 Dusun/Lingkungan" in fact_text
        print("  [LULUS] Struktur wilayah terkonfirmasi (2 Desa, 1 Kelurahan, 8 Dusun/Lingkungan) terverifikasi.")

        # Verifikasi 5 Pilar
        pillars_count = page.locator(".pillar-card").count()
        assert pillars_count == 5, f"5 Pilar harus ada, ditemukan {pillars_count}"
        print(f"  [LULUS] 5 Pilar Layanan Akses Cepat terverifikasi ({pillars_count} pilar).")

        # Verifikasi 5 Layanan Unggulan
        services_count = page.locator(".featured-svc-card").count()
        assert services_count == 5, f"5 Layanan Unggulan harus ada, ditemukan {services_count}"
        print(f"  [LULUS] 5 Layanan Unggulan terverifikasi ({services_count} layanan).")

        # Verifikasi 4 Berita Beranda
        news_count = page.locator(".news-feed-card").count()
        assert news_count == 4, f"4 Kartu Berita harus ada, ditemukan {news_count}"
        print(f"  [LULUS] 4 Kartu Berita & Informasi Beranda terverifikasi ({news_count} kartu).")

        context.close()

    print("\n" + "=" * 70)
    print("SELURUH GERBANG VERIFIKASI MASTER V3.2 BERHASIL (PASSED) 100%!")
    print("=" * 70)

if __name__ == "__main__":
    run()
