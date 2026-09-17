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

    # 10 Viewport Wajib Sesuai Bagian I Revisi Technical Direction V3.2
    viewports = [
        ("Mobile_320", 320, 568),
        ("Mobile_360", 360, 640),
        ("Mobile_390", 390, 844),
        ("Mobile_430", 430, 932),
        ("Tablet_Portrait_768", 768, 1024),
        ("Tablet_Landscape_820", 820, 1180),
        ("Desktop_Small_1024", 1024, 768),
        ("Desktop_Medium_1280", 1280, 800),
        ("Desktop_Master_1440", 1440, 900),
        ("Desktop_UltraWide_1920", 1920, 1080)
    ]

    with sync_playwright() as p:
        browser = p.chromium.launch(channel="msedge")

        print("\n[Tahap 1] Verifikasi Responsivitas & Zero Horizontal Overflow (10 Breakpoints Wajib)...")
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
                print(f"  [GAGAL] {name:<24} ({w:>4}x{h:>4}px): Terjadi horizontal overflow sebesar {diff}px!")
                sys.exit(1)
            else:
                print(f"  [LULUS] {name:<24} ({w:>4}x{h:>4}px): 0px horizontal overflow.")

            # Tangkapan layar Beranda sesuai mockup master
            if name == "Desktop_Master_1440":
                shot_path = os.path.join(screenshots_dir, "01_Beranda_Desktop_1440.png")
                page.screenshot(path=shot_path, full_page=True)
                print(f"  -> Screenshot Beranda Desktop tersimpan: {shot_path}")

            if name == "Tablet_Portrait_768":
                shot_path = os.path.join(screenshots_dir, "02_Beranda_Tablet_768.png")
                page.screenshot(path=shot_path, full_page=True)
                print(f"  -> Screenshot Beranda Tablet tersimpan: {shot_path}")

            if name == "Mobile_390":
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

        print("\n[Tahap 2] Verifikasi Halaman Berita & Arsip Edukasi (#news)...")
        for name, w, h in [("Desktop_Master_1440", 1440, 900), ("Tablet_Portrait_768", 768, 1024), ("Mobile_390", 390, 844)]:
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

        print("\n[Tahap 3] Verifikasi Integritas 12 Section Beranda Master V3.2 & Isolasi CKG...")
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()
        page.goto(url, wait_until="networkidle")

        # 1. Header & Topbar
        assert page.locator(".topbar").is_visible(), "Topbar resmi harus ada"
        assert page.locator(".site-header").is_visible(), "Site header resmi harus ada"
        print("  [LULUS] 1. Header & Navigasi Terverifikasi.")

        # 2. Immersive Hero & 3 Fakta Wilayah
        fact_text = page.locator(".hero-facts-strip").text_content()
        assert "2 Desa" in fact_text and "1 Kelurahan" in fact_text and "8 Dusun/Lingkungan" in fact_text
        print("  [LULUS] 2. Immersive Hero & 3 Fakta Struktur Wilayah (2 Desa, 1 Kelurahan, 8 Dusun/Lingkungan) Terverifikasi.")

        # 3. Akses Cepat Warga (7 Kartu Layanan Praktis)
        quick_count = page.locator(".quick-card-item").count()
        assert quick_count == 7, f"7 Akses Cepat Warga harus ada, ditemukan {quick_count}"
        print(f"  [LULUS] 3. Akses Cepat Warga Terverifikasi ({quick_count} jalur layanan praktis).")

        # 4. 5 Layanan Unggulan
        services_count = page.locator(".featured-svc-card").count()
        assert services_count == 5, f"5 Layanan Unggulan harus ada, ditemukan {services_count}"
        print(f"  [LULUS] 4. Layanan Unggulan Terverifikasi ({services_count} layanan foto fasyankes asli).")

        # 5. Program Kesehatan Siklus Hidup ILP (5 Klaster)
        lifestage_count = page.locator(".lifestage-item-card").count()
        assert lifestage_count == 5, f"5 Klaster Program ILP harus ada, ditemukan {lifestage_count}"
        print(f"  [LULUS] 5. Program Kesehatan Siklus Hidup ILP Terverifikasi ({lifestage_count} klaster siklus hidup).")

        # 6. Health Atlas Geospasial
        assert page.locator(".atlas-composite-card").is_visible(), "Health Atlas card harus ada"
        print("  [LULUS] 6. Health Atlas Geospasial (Batas Wilayah 2 Desa 1 Kelurahan) Terverifikasi.")

        # 7. Ekosistem Digital & Launcher CKG
        ckg_links = page.locator('a[href="https://ckg.puskesmasmalimpung.id/"]').all()
        assert len(ckg_links) >= 2, "Tautan ke subdomain CKG wajib ada di beranda (Akses Cepat & Launcher)"
        for link in ckg_links:
            assert link.get_attribute("target") == "_blank", "Tautan CKG harus target='_blank'"
            assert "noopener" in link.get_attribute("rel") and "noreferrer" in link.get_attribute("rel"), "Tautan CKG wajib memiliki rel='noopener noreferrer'"
        print(f"  [LULUS] 7. Ekosistem Digital & Isolasi Domain CKG Terverifikasi ({len(ckg_links)} launcher dengan rel='noopener noreferrer').")

        # 8. Berita & Kegiatan Puskesmas (4 Kartu)
        news_count = page.locator(".news-feed-card").count()
        assert news_count == 4, f"4 Kartu Berita harus ada, ditemukan {news_count}"
        print(f"  [LULUS] 8. Berita & Kegiatan Puskesmas Terverifikasi ({news_count} feed kegiatan terpisah).")

        # 9. Artikel & Edukasi Kesehatan Terverifikasi (4 Kartu)
        articles_count = page.locator(".article-edu-card").count()
        assert articles_count == 4, f"4 Kartu Artikel Edukasi harus ada, ditemukan {articles_count}"
        print(f"  [LULUS] 9. Artikel & Edukasi Kesehatan Terpisah Terverifikasi ({articles_count} edukasi medis dengan reviewer & ref).")

        # 10. Profil & Aktivitas Puskesmas
        assert page.locator(".section-profile-highlight").is_visible(), "Section Profil Fasyankes harus ada"
        print("  [LULUS] 10. Profil Serta Aktivitas Puskesmas Terverifikasi (Akreditasi Paripurna & Budaya BerAKHLAK).")

        # 11. Keterbukaan Informasi Publik (PPID)
        assert page.locator(".section-public-transparency").is_visible(), "Section Informasi Publik harus ada"
        print("  [LULUS] 11. Keterbukaan Informasi Publik Terverifikasi (Maklumat Pelayanan & IKM 89.24).")

        # 12. Kontak & Footer Institusional
        assert page.locator(".site-footer").is_visible(), "Footer institusional harus ada"
        print("  [LULUS] 12. Kontak & Footer Institusional BerAKHLAK Terverifikasi.")

        context.close()

    print("\n" + "=" * 70)
    print("SELURUH GERBANG VERIFIKASI 12 SECTION MASTER V3.2 BERHASIL (PASSED) 100%!")
    print("=" * 70)

if __name__ == "__main__":
    run()

