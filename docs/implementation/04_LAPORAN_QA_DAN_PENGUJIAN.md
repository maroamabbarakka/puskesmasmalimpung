# 04 — LAPORAN QA & HASIL PENGUJIAN OTOMATIS
**Platform:** Puskesmas Malimpung — Health Hub V2  
**Tanggal Pengujian:** 17 September 2026  
**Runner:** Python Playwright + Microsoft Edge (Chromium Native Windows)  
**Skrip Eksekusi:** `prototype/capture_qa_v2.py`  
**Status Keseluruhan:** **100% LULUS (ALL CHECKS PASSED)**

---

## 1. Ringkasan Hasil Pengujian Otomatis
- **Total Rute Diuji:** 6 Rute Primer (`home`, `services`, `programs`, `insights`, `public`, `office`).
- **Total Viewport Diuji:** 3 Resolusi Standar:
  1. Desktop: `1440 × 900 px`
  2. Tablet: `820 × 1180 px`
  3. Mobile: `390 × 844 px`
- **Total Screenshot Full-Page:** 18 Berkas Tangkapan Layar Lengkap (100% tinggi halaman penuh, bukan hanya viewport crop).
- **Horizontal Overflow:** **0 px** (Tidak ada scroll horizontal yang melanggar batas viewport pada seluruh perangkat).
- **JavaScript Page Errors:** **0 Error**.

---

## 2. Tabel Hasil Tangkapan Layar & Dimensi Aktual

| Rute / Halaman | Viewport | Dimensi Aktual (W × H) | Status Overflow | Nama Berkas Screenshot |
|---|---|---|---|---|
| **Beranda** | Desktop | 1440 × 4624 px | 0 px (Lulus) | `Beranda_Desktop_1440_FULLPAGE.png` |
| **Beranda** | Tablet | 820 × 6284 px | 0 px (Lulus) | `Beranda_Tablet_820_FULLPAGE.png` |
| **Beranda** | Mobile | 390 × 9946 px | 0 px (Lulus) | `Beranda_Mobile_390_FULLPAGE.png` |
| **Layanan** | Desktop | 1440 × 1857 px | 0 px (Lulus) | `Layanan_Desktop_1440_FULLPAGE.png` |
| **Layanan** | Tablet | 820 × 2637 px | 0 px (Lulus) | `Layanan_Tablet_820_FULLPAGE.png` |
| **Layanan** | Mobile | 390 × 4603 px | 0 px (Lulus) | `Layanan_Mobile_390_FULLPAGE.png` |
| **Program Kesehatan** | Desktop | 1440 × 2295 px | 0 px (Lulus) | `Program_Kesehatan_Desktop_1440_FULLPAGE.png` |
| **Program Kesehatan** | Tablet | 820 × 2761 px | 0 px (Lulus) | `Program_Kesehatan_Tablet_820_FULLPAGE.png` |
| **Program Kesehatan** | Mobile | 390 × 4348 px | 0 px (Lulus) | `Program_Kesehatan_Mobile_390_FULLPAGE.png` |
| **Kesehatan Wilayah** | Desktop | 1440 × 1961 px | 0 px (Lulus) | `Kesehatan_Wilayah_Desktop_1440_FULLPAGE.png` |
| **Kesehatan Wilayah** | Tablet | 820 × 2437 px | 0 px (Lulus) | `Kesehatan_Wilayah_Tablet_820_FULLPAGE.png` |
| **Kesehatan Wilayah** | Mobile | 390 × 4223 px | 0 px (Lulus) | `Kesehatan_Wilayah_Mobile_390_FULLPAGE.png` |
| **Informasi Publik** | Desktop | 1440 × 1375 px | 0 px (Lulus) | `Informasi_Publik_Desktop_1440_FULLPAGE.png` |
| **Informasi Publik** | Tablet | 820 × 1731 px | 0 px (Lulus) | `Informasi_Publik_Tablet_820_FULLPAGE.png` |
| **Informasi Publik** | Mobile | 390 × 2740 px | 0 px (Lulus) | `Informasi_Publik_Mobile_390_FULLPAGE.png` |
| **Kantor Virtual** | Desktop | 1440 × 1458 px | 0 px (Lulus) | `Kantor_Virtual_Desktop_1440_FULLPAGE.png` |
| **Kantor Virtual** | Tablet | 820 × 1851 px | 0 px (Lulus) | `Kantor_Virtual_Tablet_820_FULLPAGE.png` |
| **Kantor Virtual** | Mobile | 390 × 2984 px | 0 px (Lulus) | `Kantor_Virtual_Mobile_390_FULLPAGE.png` |

---

## 3. Verifikasi Fungsionalitas Interaktif
1. **Pencarian Layanan:** Pengujian kata kunci `"gigi"` berhasil memfilter grid dari 6 kartu menjadi 1 kartu layanan spesifik gigi.
2. **Reset Pencarian:** Tombol reset berhasil mengembalikan katalog ke 6 layanan lengkap seketika.
3. **Modal Standar Pelayanan:** Klik tombol detail pada layanan CKG berhasil memunculkan modal overlay yang menyajikan dasar hukum, persyaratan, biaya, dan alur SOP secara utuh, serta tombol close berhasil menutup modal.
4. **Health Intelligence Topics:** Pergantian topik ke `"ptm"` berhasil memperbarui judul dan deskripsi, serta pengembalian ke `"ckg"` memvalidasi bahwa metrik tetap menyajikan `'—'` (kejujuran data tanpa pemalsuan nol).
5. **Keterbukaan Informasi Publik:** Tab maklumat dan standar pelayanan berhasil berganti konten dengan mulus.
6. **Navigasi Mobile Drawer:** Tombol hamburger berhasil membuka drawer overlay pada viewport mobile (390px), dan navigasi ke rute layanan berhasil berpindah rute dengan benar.
7. **Modul Survei Kepuasan Masyarakat (SKM):** Partisipasi voting cepat warga (Sangat Puas, Puas, Cukup, Perlu Perbaikan) berhasil menyimpan pilihan ke `localStorage` (`malimpung_skm_vote`) dan memberikan pesan umpan balik instan tanpa reload halaman.
8. **Keamanan Input & Proteksi XSS:** Fungsi `escapeHTML` aktif pada seluruh penyajian data katalog layanan dan tabel Virtual Office/CMS untuk menangkal injeksi tag HTML atau script berbahaya.
9. **Eliminasi 404 Favicon:** Penambahan favicon SVG inline berbasis data-URI berhasil meniadakan error 404 request `/favicon.ico` pada peramban web modern.

---

## 4. Pengujian Ekstrem 7 Viewport & Deep-Linking URL (`test_extended_viewports.py`)

Pengujian otomatis tambahan telah dijalankan menggunakan Playwright Edge Chromium untuk menjamin tidak adanya horizontal overflow pada resolusi ekstrem serta fungsionalitas deep-linking URL slug:

| Skenario / Resolusi | Dimensi Viewport | Target Uji | Hasil Verifikasi | Status |
|---|---|---|---|---|
| **Mobile Small 320** | 320 × 568 px | 6 Rute Primer | Max scrollWidth = clientWidth (0px overflow) | **PASS** |
| **Mobile Android 360** | 360 × 640 px | 6 Rute Primer | Max scrollWidth = clientWidth (0px overflow) | **PASS** |
| **Mobile Standard 390** | 390 × 844 px | 6 Rute Primer | Max scrollWidth = clientWidth (0px overflow) | **PASS** |
| **Tablet Small 768** | 768 × 1024 px | 6 Rute Primer | Max scrollWidth = clientWidth (0px overflow) | **PASS** |
| **Tablet Standard 820** | 820 × 1180 px | 6 Rute Primer | Max scrollWidth = clientWidth (0px overflow) | **PASS** |
| **Desktop Small 1024** | 1024 × 768 px | 6 Rute Primer | Max scrollWidth = clientWidth (0px overflow) | **PASS** |
| **Desktop Standard 1440** | 1440 × 900 px | 6 Rute Primer | Max scrollWidth = clientWidth (0px overflow) | **PASS** |
| **Deep-Linking Direct URL** | URL `#services/ckg` | Buka browser langsung ke modal | Modal CKG terbuka otomatis & judul sesuai | **PASS** |
| **Deep-Linking Close Sync** | Tutup modal CKG | Sinkronisasi History Hash | Hash URL kembali ke `#services` | **PASS** |
| **Deep-Linking Hashchange** | Evaluasi `#services/gigi` | Navigasi dinamis antar-layanan | Modal berganti ke layanan Gigi dan Mulut | **PASS** |
| **Sanitasi XSS Input CMS** | String input uji karakter khusus | `escapeHTML` aktif | Karakter `<`, `>`, `"`, `'`, `&` di-escape sempurna | **PASS** |


