# 01 — DOKUMENTASI ARSITEKTUR & KEPUTUSAN DESAIN (ADR)
**Proyek:** Puskesmas Malimpung — Health Hub V2  
**Tanggal:** 17 September 2026  
**Status:** Diterapkan (Accepted)  
**Tujuan:** Menjelaskan fondasi teknis, prinsip pengalaman, design tokens, dan keputusan arsitektural.

---

## 1. Visi & Filosofi Produk (Human-Centered Editorial Platform)
Puskesmas Malimpung Health Hub V2 bukan sekadar situs profil instansi pemerintah yang statis dan bukan dashboard teknis yang dijejalkan ke publik. Platform ini dirancang dengan prinsip:
1. **Benefit-First Storytelling:** Halaman depan menceritakan manfaat layanan bagi warga (akses cepat, jadwal pasti, prosedur jelas, program prioritas keluarga).
2. **Keterbukaan Data yang Akuntabel (Health Intelligence):** Mengedukasi masyarakat mengenai indikator kesehatan wilayah dengan metodologi transparan, membedakan data belum diverifikasi dengan tanda `—` (tidak memalsukan angka 0).
3. **Pemisahan Ruang Publik dan Ruang Kerja (Smart Virtual Office):** Membatasi akses data internal, modul integrasi, audit log, dan editor konten di balik gerbang terotorisasi berbasis peran.

---

## 2. Keputusan Arsitektur Utama (Architectural Decision Records)

### ADR-01: Arsitektur Single Page Application (SPA) Reaktif Ringan
- **Keputusan:** Menggunakan Semantic HTML5 + Vanilla CSS Modular + JavaScript ES6+ State Engine reaktif tanpa framework bundle raksasa.
- **Rasional:**
  - Waktu muat seketika (*Instant Load Time*) pada smartphone masyarakat kelas menengah di jaringan 3G/4G Kabupaten Pinrang.
  - LCP (*Largest Contentful Paint*) < 1.5 detik, CLS (*Cumulative Layout Shift*) 0.0, dan tidak ada runtime overhead.
  - Memudahkan pemeliharaan oleh tim Dinas Kesehatan / Puskesmas tanpa dependensi build tools yang rumit.

### ADR-02: Design Tokens & Identitas Visual Resmi
- **Warna Identitas:**
  - `forest-950` (`#07221d`) & `forest-900` (`#0e3b33`): Menghadirkan wibawa instansi resmi, ketenangan, dan keterpercayaan.
  - `jade-600` (`#18856f`) & `jade-500` (`#1fa288`): Elemen fokus aksi, tombol utama, dan indikator kesehatan aktif.
  - `mint-100` (`#d9f4e9`), `warm-100` (`#fff0d8`), `sky-100` (`#e3eaf8`): Penanda kategori ramah keluarga dan siklus hidup (KIA, Lansia, PTM).
- **Tipografi:**
  - Antarmuka & Teks Tubuh: `Plus Jakarta Sans` (keterbacaan optimal pada layar ponsel resolusi padat).
  - Sentuhan Editorial: `Newsreader` / `Georgia` italic untuk judul utama dan kutipan maklumat.
- **Branding:**
  - Menggunakan lambang resmi Pemerintah Kabupaten Pinrang (`logo_pinrang.png`) bersanding dengan lambang resmi Puskesmas Malimpung (`logo_puskesmas_malimpung.png`). Menghapus simbol hati konseptual pada prototipe awal.

### ADR-03: Tata Kelola & Isolasi Data Klinis (Zero PHI Leakage)
- **Keputusan:** Seluruh Protected Health Information (PHI), NIK pasien, nomor rekam medis, dan alamat individual tidak boleh berada di bundle atau diakses oleh browser publik.
- **Rasional:** Kepatuhan terhadap UU No. 27/2022 tentang Pelindungan Data Pribadi (UU PDP) dan Permenkes No. 24/2022 tentang Rekam Medis.
- **BFF (Backend-For-Frontend):** Snapshot publik hanya menyediakan data agregat yang telah disetujui (*Approved Aggregate Snapshot*) dengan penekanan sel kecil (*low-cell suppression*) untuk mencegah re-identifikasi warga di tingkat desa.

### ADR-04: Penetapan Domain & Separasi Subdomain Operasional CKG
- **Keputusan:**
  - **Website Utama (Publik & Virtual Office):** `https://puskesmasmalimpung.id/`
  - **Aplikasi Operasional Klinis (CKG):** `https://ckg.puskesmasmalimpung.id/`
- **Rasional & Batasan:**
  - Aplikasi CKG tidak diduplikasi di dalam website utama.
  - Kantor Virtual berfungsi sebagai portal gerbang (*gateway*) terpadu menuju aplikasi operasional internal.
  - Tautan CKG pada Kantor Virtual berupa URL absolut `https://ckg.puskesmasmalimpung.id/` (`target="_blank"`).
  - Tidak membuat mekanisme login tiruan atau asumsi SSO sepihak antar-subdomain, menjaga isolasi sesi klinis secara mandiri.
  - Aplikasi RME, Absensi, dan KPI hanya dicantumkan dalam katalog setelah sistem dan alamat domain resminya disahkan.

### ADR-05: Arah Kreatif V3.1 — Human-Centered Digital Health (SATUSEHAT Tone × Mekari Storytelling)
- **Tone SATUSEHAT:** Menghadirkan atmosfer kesehatan modern yang terang, bersih, segar, dan hangat.
  - `Primary Teal`: `#16A5A1`
  - `Deep Teal`: `#087D79`
  - `Fresh Lime`: `#BED62F`
  - `Soft Aqua`: `#E6F8F6`
  - `Sky Blue`: `#65C6E8`
  - `Clean White`: `#FFFFFF`
  - `Ink`: `#18383A`
- **Pengalaman Scroll & Ritme Ala Mekari:**
  - Menghilangkan kesan deretan kartu seragam yang berulang secara datar.
  - Mengadopsi komposisi editorial bertingkat, penekanan modul utama secara asimetris, dan staggered entrance.
  - Pemanfaatan CSS transform/opacity native dan Intersection Observer (durasi 400–600 ms) dengan kepatuhan penuh terhadap `@media (prefers-reduced-motion: reduce)`.
- **Integritas Aset Daerah:** Tetap mempertahankan lambang resmi Kabupaten Pinrang dan logo resmi Puskesmas Malimpung tanpa menyalin logo Kemenkes ataupun aset referensi secara harfiah.

---

## 3. Matriks Hierarki Responsivitas
| Viewport | Lebar | Adaptasi Tata Letak |
|---|---|---|
| **Desktop** | 1440px | Header 76px sticky, Hero komposisi mendalam berlapis, Modular editorial grid, Dynamic narrative flow, Footer multi-kolom. |
| **Tablet** | 820px | Header compact dengan menu navigasi, Penyesuaian staggered card vertikal-horizontal seimbang, Touch targets optimal. |
| **Mobile** | 390px / 320px | Hamburger drawer navigasi fullscreen, Single column flow bertumpuk teratur, Touch targets ≥ 44px, Zero horizontal scroll (`overflow-x: hidden`). |

