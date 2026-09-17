# MASTER TECHNICAL DIRECTION
## Website Puskesmas Malimpung — V3.2

**Status:** Dokumen Acuan Utama Pengembang (Locked Specification)  
**Tanggal:** 17 September 2026  
**Referensi Visual:** Mockup Master V3.2 (SATUSEHAT Tone × Mekari Scroll Dynamics × Identitas Asli Malimpung)  

---

### 1. Tujuan Produk
Website `puskesmasmalimpung.id` diposisikan sebagai **Digital Health Hub dan Virtual Office Puskesmas Malimpung**, bukan sekadar website profil.
Empat fungsi terintegrasi:
1. **Portal layanan publik** untuk masyarakat.
2. **Media informasi resmi pemerintah**: berita, kegiatan, artikel kesehatan, pengumuman, dokumen, keterbukaan informasi.
3. **Health Intelligence / Health Atlas** untuk melihat gambaran kesehatan wilayah kerja secara agregat.
4. **Gateway Kantor Virtual** menuju aplikasi operasional seperti CKG (`ckg.puskesmasmalimpung.id`), serta modul bertahap (RME, absensi, KPI).

Kompleksitas teknologi berada di balik layar; wajah depan sederhana, modern, manusiawi, dinamis, dan ramah masyarakat.

---

### 2. Keputusan Domain yang Dikunci
- **Portal Utama:** `https://puskesmasmalimpung.id`
- **Aplikasi CKG:** `https://ckg.puskesmasmalimpung.id`
- **Perilaku Menu:** Kantor Virtual → CKG Malimpung membuka subdomain CKG tersebut via tautan absolut (`target="_blank" rel="noopener noreferrer"`).
- **Batasan:**
  - Tidak menduplikasi aplikasi CKG di website utama.
  - Tidak membuat login CKG tiruan / palsu di portal utama.
  - Tidak mengasumsikan SSO otomatis tanpa arsitektur keamanan mandiri.
  - Kantor Virtual murni berfungsi sebagai **application launcher / work hub**.

---

### 3. Arah Visual & Larangan Desain
- **SATUSEHAT sebagai Inspirasi:** Tone kesehatan modern, turquoise/teal (`#087D79`, `#16A5A1`), putih bersih (`#FFFFFF`), hijau segar (`#BED62F` / `#10B981`), bentuk kurva organik, fotografi manusia asli, ramah masyarakat.
- **Mekari sebagai Inspirasi:** Storytelling saat scroll, variasi komposisi antar-section (tidak monoton), layered visual, depth, transisi halus, penyajian banyak modul tanpa terlihat penuh.
- **Larangan Desain:**
  - Dilarang mempertahankan deretan kartu seragam lalu menambahkan fade-in.
  - Dilarang memakai ikon generik sebagai visual utama.
  - Dilarang memakai dashboard palsu atau angka kesehatan karangan.
  - Dilarang memakai gambar stok anonim.

---

### 4. Struktur Halaman Beranda (Berdasarkan Mockup Master V3.2)

1. **Header & Topbar Resmi:**
   - Topbar: Pemerintah Kabupaten Pinrang | PPID | Pengaduan | Kontak Kami.
   - Main Header: Logo Pemkab Pinrang + Logo Puskesmas Malimpung ("PUSKESMAS MALIMPUNG Kabupaten Pinrang").
   - Navigasi: Beranda, Profil, Layanan, Program, Health Atlas, Kantor Virtual, Berita, Kontak, Icon Search, Tombol CTA "Hubungi Kami".
2. **Hero Beranda:**
   - Label: *"Bersama untuk Masyarakat"*
   - Headline: **"Bersama untuk Masyarakat Sehat Puskesmas Malimpung"**
   - Subtitle: *"Memberikan pelayanan kesehatan yang bermutu, mudah diakses dan berorientasi pada kebutuhan masyarakat."*
   - CTA Buttons: `[Lihat Layanan]` (Teal solid) & `[Kantor Virtual]` (Outline).
   - Visual Kanan: Foto asli nakes Puskesmas Malimpung berlatar gedung Puskesmas Malimpung warna hijau toska dengan ornamen gelombang organik toska dan kaligrafi *"Sehat Bersama Malimpung"*.
   - Fakta Struktur Wilayah (3 pilar terkonfirmasi):
     - **2 Desa** (Wilayah Kerja)
     - **1 Kelurahan** (Siap Melayani)
     - **8 Dusun / Lingkungan** (Dekat dengan Masyarakat)
3. **Akses Cepat (5 Pilar Pelayanan):**
   - Pelayanan Kesehatan (Pemeriksaan, pengobatan, rujukan)
   - Kesehatan Keluarga (Ibu, anak, remaja, lansia)
   - Promosi & Edukasi (Pencegahan penyakit)
   - Surveilans & Kewaspadaan (Deteksi dini dan respon cepat)
   - Kolaborasi (Bersama masyarakat)
4. **Layanan Unggulan:**
   - Visual utama + layanan unggulan berfoto: Kesehatan Ibu & Anak, Imunisasi, Pemeriksaan Umum, Kesehatan Gigi & Mulut, Posyandu & UKBM.
   - Tautan ke katalog lengkap layanan (`/layanan` atau modal/halaman detail transparan).
5. **Pemisahan Modul Berita & Artikel Edukasi:**
   - **Berita & Informasi Terkini:** Berita kegiatan posyandu, PHBS sekolah, kunjungan nakes, lokakarya stunting.
   - **Artikel & Edukasi Kesehatan:** Panduan medis terverifikasi nakes, dipisahkan secara tegas dari berita kegiatan.
6. **Health Atlas & Kantor Virtual (Section Komposit):**
   - **Health Atlas:** Peta wilayah 3 entitas (Desa Malimpung, Desa Padang Loang, Kelurahan Maccirinna) dengan OpenStreetMap/Leaflet + agregat indikator tervalidasi (zero individual PHI).
   - **Kantor Virtual Launcher:** Akses CKG (`ckg.puskesmasmalimpung.id`), PPID, Pengaduan Masyarakat, dan Layanan Administrasi.
7. **Footer Institusional BerAKHLAK:**
   - Identitas Puskesmas & Pemkab Pinrang, alamat Benteng Malimpung Kec. Patampanua, tautan cepat, hotline darurat, serta logo resmi BerAKHLAK.

---

### 5. Prinsip Implementasi & Standar Kualitas
- **Responsivitas Mutlak:** Lulus uji 100% pada 8 resolusi (320px, 360px, 390px, 430px, 768px, 820px, 1024px, 1440px) dengan **0px horizontal overflow**.
- **Performa & Aksesibilitas:** WCAG 2.2 AA, LCP ≤ 2.5s, CLS ≤ 0.1, dark/light contrast optimal.
- **Kepatuhan Data:** Tidak ada data statistik palsu; status draft/pending dicantumkan secara jujur.
- **Motion:** Kepatuhan `@media (prefers-reduced-motion: reduce)`.
