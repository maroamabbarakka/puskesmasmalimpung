# 06 — PROPOSAL TIGA ALTERNATIF KONSEP HERO BERANDA V3.1
**Platform:** Puskesmas Malimpung — Health Hub V3.1  
**Arah Kreatif:** Human-Centered Digital Health (*SATUSEHAT Tone × Mekari-Style Storytelling*)  
**Tanggal:** 17 September 2026  
**Status:** Draf Review & Pengambilan Keputusan Item-per-Item  

---

## 1. Landasan & Filosofi Desain Hero V3.1

Sesuai kesepakatan Change Request V3.1:
1. **Meninggalkan Pola Datar (Flat Card Rows):** Hero bukan lagi sekadar satu kartu statistik besar atau teks dengan deretan kartu identik. Hero harus memiliki **kedalaman berlapis (layered depth)**, **hirarki yang dinamis**, dan **ritme visual yang hidup**.
2. **Tone SATUSEHAT:**
   - Dominasi toska/turquoise bersih (`#16A5A1` dan `#087D79`), aksen segar lime (`#BED62F`), latar belakang bersih Soft Aqua (`#E6F8F6`) dan Putih (`#FFFFFF`), serta keterbacaan teks maksimal dengan Ink (`#18383A`).
   - Menghadirkan karakter digital kesehatan yang hangat, tepercaya, dan ramah masyarakat.
3. **Pengalaman Scroll & Struktur ala Mekari:**
   - Penyampaian narasi berbasis manfaat (*benefit-first storytelling*).
   - Pengenalan ekosistem secara modular: pintu layanan kesehatan masyarakat berdampingan harmonis dengan gerbang operasional internal (CKG pada `https://ckg.puskesmasmalimpung.id/`).
4. **Keaslian Identitas Malimpung:**
   - Lambang resmi Kabupaten Pinrang dan logo resmi Puskesmas Malimpung tetap menjadi elemen otoritas utama.
   - Tidak menyalin ilustrasi Kemenkes secara harfiah, melainkan membangun aset grafis editorial dan komposisi manusia asli.

---

## 2. ALTERNATIF 1: "The Human Ecosystem" (Editorial Storytelling & Layered Depth)

### A. Visi & Karakter Visual
Konsep ini menempatkan **manusia dan keluarga Malimpung sebagai pusat cerita**. Menggabungkan fotografi autentik warga lintas generasi (ibu menggendong balita, remaja, dan lansia sehat) yang dipadukan dengan bidang toska melengkung lembut (*organic backdrop*), garis aksen geometris segar (*Fresh Lime*), dan cuplikan antarmuka nyata (*floating glassmorphic UI pills*).

### B. Komposisi Tata Letak (Layout)
- **Tampilan Desktop (1440px / 1280px):**
  - **Kolom Kiri (52% Lebar):**
    - *Pill Kategori:* Background Soft Aqua (`#E6F8F6`), border tipis Teal (`#16A5A1`), teks bertuliskan *"● Transformasi Layanan Kesehatan Primer Malimpung"*.
    - *Headline Tipografi:* Kombinasi sans-serif tebal modern (*Plus Jakarta Sans* 52px) dengan aksen editorial italic (*Newsreader*):  
      **"Kesehatan keluarga Anda,** <br><em style="color: #087D79; font-weight: 500;">terhubung dalam satu ekosistem.</em>"
    - *Lead Paragraph:* Teks penjelas 18px warna Ink, mengalir tenang tanpa jargon teknis berlebihan.
    - *Aksi Ganda (CTA Dual Focus):*
      - Tombol Utama: `"Jelajahi Layanan & Jadwal"` (Teal solid `#16A5A1` dengan shadow lembut toska).
      - Tombol Sekunder: `"Akses Aplikasi CKG ↗"` (Outline transparan dengan ikon eksternal menuju `https://ckg.puskesmasmalimpung.id/`).
    - *Micro Trust Bar:* 3 indikator ringkas berstempel dinas (UGD 24 Jam, Akreditasi Fasyankes Paripurna, Wilayah Kerja 6 Desa).
  - **Kolom Kanan (48% Lebar):**
    - Bidang toska melengkung halus (*fluid organic mask*) berisi komposisi foto manusia hangat beresolusi tinggi.
    - **Lapisan Mengambang 1 (Kiri Atas Foto):** Kartu mini semi-transparan *"Pemeriksaan CKG Hari Ini: Terjadwal di Posyandu Melati"*.
    - **Lapisan Mengambang 2 (Kanan Bawah Foto):** Widget mini *"Health Atlas Patampanua: 6 Desa Terhubung Aktif"* dengan ikon poligon vektor mini.

- **Tampilan Mobile (390px / 360px):**
  - Alur vertikal berurutan yang anggun (*single continuous flow*).
  - Headline berukuran 32px yang proporsional dan tidak terpotong.
  - Komposisi visual foto manusia diletakkan tepat di bawah tombol CTA, dengan aspek rasio 4:3 yang terbingkai rapi dalam kurva toska lembut.
  - Floating badges disederhanakan menjadi 2 badge horizontal kompak tepat di bawah foto agar tidak menutupi wajah atau subjek utama.
  - Tidak ada scroll horizontal (0px overflow terjamin).

### C. Tipografi & Skema Warna
- **Background:** Gradasi vertikal sangat lembut dari `Clean White` (`#FFFFFF`) ke `Soft Aqua` (`#F2FBF9`).
- **Aksen Teks & Grafis:** `Deep Teal` (`#087D79`) untuk ketegasan, `Fresh Lime` (`#BED62F`) untuk aksen garis dan dot status.
- **Tipografi:** Plus Jakarta Sans (800, 600, 400) + Newsreader Italic (500).

### D. Spesifikasi Animasi & Motion
- **Staggered Entrance (Saat Halaman Dimuat):**
  1. Header & Pill Badge fade-in (0ms delay, durasi 400ms).
  2. Headline & Paragraf meluncur naik 12px dengan opacity transisi (delay 100ms, durasi 500ms).
  3. Tombol CTA muncul dengan skala mikro `0.96 -> 1.0` (delay 200ms, durasi 400ms).
  4. Visual foto manusia dan bidang toska muncul dari kanan (delay 250ms, durasi 600ms, cubic-bezier lembut).
  5. Floating cards mengambang masuk dengan delay terpisah (350ms & 450ms) lalu memiliki efek floating lambat (*idle float* 4 detik amplitudo 4px).
- **Reduced Motion Support:** Semua efek transform dinonaktifkan, digantikan fade-in instan 150ms.

---

## 3. ALTERNATIF 2: "Digital Gateway & Interactive Mosaic" (Modular Split & Product Showcase)

### A. Visi & Karakter Visual
Konsep ini terinspirasi langsung dari **gaya arsitektur produk teknologi Mekari**. Menampilkan Puskesmas Malimpung sebagai pelopor fasyankes modern yang mengintegrasikan layanan warga dengan sistem operasional digital. Menonjolkan **keterhubungan nyata antarmuka digital** tanpa menampilkan dashboard angka palsu.

### B. Komposisi Tata Letak (Layout)
- **Tampilan Desktop (1440px / 1280px):**
  - **Latar Belakang Penuh:** Area hero memiliki latar belakang bidang toska lebar (*Deep Teal* `#087D79` yang dipadukan dengan kisi grid geometris ultra-halus 2% opacity).
  - **Kolom Kiri (45% Lebar - High Contrast Light on Dark):**
    - Badge: *"Ekosistem Digital Kesehatan Puskesmas Malimpung"*.
    - Headline Putih Bersih (`#FFFFFF`):  
      **"Pelayanan publik yang transparan.** <br><span style="color: #BED62F;">Operasional fasyankes yang terintegrasi.</span>"
    - Teks pendukung dalam rona Soft Aqua (`#E6F8F6`) menjelaskan peran ganda website sebagai portal masyarakat dan gerbang petugas.
    - Kotak Pencarian Cepat Layanan / Poli langsung di dalam hero (*Interactive Quick Finder Input*).
  - **Kolom Kanan (55% Lebar - Mosaik Antarmuka Berlapis):**
    - **Mockup Laptop Presisi:** Menampilkan tangkapan layar antarmuka asli modul CKG Malimpung (`ckg.puskesmasmalimpung.id`) dengan bingkai minimalis modern.
    - **Mockup Smartphone Bertumpuk di Depan Laptop:** Menampilkan antarmuka portal jadwal dokter dan nomor antrean warga.
    - **Badge Status Sistem Real-Time:** Badge mengambang dengan aksen hijau neon: *"Portal Publik: Aktif • Subdomain CKG: Siaga"*.

- **Tampilan Mobile (390px / 360px):**
  - Kontras tinggi yang sangat ramah di bawah sinar matahari luar ruangan.
  - Form pencarian cepat menjadi elemen interaktif utama di layar pertama (*above the fold*).
  - Mosaik mockup disusun secara vertikal: mockup smartphone tampil penuh, sedangkan mockup laptop ditampilkan sebagai kartu latar yang elegan dengan efek perspektif terpotong aman.
  - Tombol akses cepat CKG tampil menonjol sebagai tombol sekunder berlatar toska terang.

### C. Tipografi & Skema Warna
- **Background:** `Deep Teal` (`#087D79`) dengan aksen radial glow `Primary Teal` (`#16A5A1`).
- **Aksen Teks:** `Fresh Lime` (`#BED62F`) untuk highlight kata kunci, `Clean White` (`#FFFFFF`) untuk judul.
- **Tipografi:** Plus Jakarta Sans murni (Bold & Extra Bold) untuk kesan presisi, teknologi, dan keandalan sistem.

### D. Spesifikasi Animasi & Motion
- **Entrance Berkoordinasi:**
  1. Konten teks sisi kiri slide-up 16px secara presisi (durasi 450ms).
  2. Mockup laptop masuk dari sisi kanan dengan bayangan dinamis (*soft elevation drop-shadow*, durasi 600ms).
  3. Mockup smartphone masuk 150ms setelah laptop dengan aksen elevasi bertingkat.
  4. Interaksi kursor pada desktop memicu kemiringan perspektif 3D sangat halus (paralaks mikro < 2 derajat).

---

## 4. ALTERNATIF 3: "Community Health Panorama" (Immersive Panoramic Arc & Floating Badges)

### A. Visi & Karakter Visual
Konsep ini mengedepankan **kehangatan komunitas lokal Patampanua, Pinrang** yang dipadukan dengan standar visual modern SATUSEHAT. Menggunakan elemen lengkungan panorama (*concave panoramic arc*) yang membelah layar secara dinamis, menyatukan foto fasilitas fisik Puskesmas Malimpung dengan petugas kesehatan dan warga.

### B. Komposisi Tata Letak (Layout)
- **Tampilan Desktop (1440px / 1280px):**
  - **Struktur Atas (Pusat Narasi):**
    - Tata letak terpusat (*centered hero narrative*) dengan lebar terkontrol (maksimal 880px) untuk keterbacaan yang fokus.
    - Tagline: *"Puskesmas Ramah, Terstandar, dan Terpercaya di Patampanua"*.
    - Headline Megah:  
      **"Mewujudkan Masyarakat Malimpung Sehat, Mandiri, dan Berdaya"**
    - Tombol ganda simetris di tengah: Tombol Layanan Warga & Tombol Kantor Virtual / CKG.
  - **Struktur Bawah (Pita Panorama Interaktif):**
    - Banner panorama melengkung lebar (*concave curved stage*) dengan latar belakang toska segar.
    - Berisi **5 Kapsul Siklus Hidup Cepat (Quick Life-Stage Selector)**:
      1. 👶 *Bayi & Balita (Posyandu & Imunisasi)*
      2. 🎒 *Remaja (UKS & Skrining Anemia)*
      3. 🩺 *Dewasa (Pemeriksaan Rutin & CKG)*
      4. 👵 *Lansia (Posbindu & Geriatri)*
      5. 🛡️ *P2P (Surveilans & Pencegahan)*
    - Mengklik kapsul langsung mengalirkan scroll secara mulus ke section program terkait.

- **Tampilan Mobile (390px / 360px):**
  - Judul terpusat dengan teks yang tajam dan nyaman dibaca.
  - 5 Kapsul Siklus Hidup berubah menjadi deretan kapsul horizontal (*smooth horizontal touch scrollbar-hidden*) yang dapat digeser mulus dengan jempol tangan.
  - Menghasilkan pengalaman interaksi yang sangat intuitif pada aplikasi mobile.

### C. Tipografi & Skema Warna
- **Background Atas:** `Clean White` (`#FFFFFF`).
- **Pita Lengkungan:** Gradasi `Soft Aqua` (`#E6F8F6`) ke `Primary Teal` (`#16A5A1`).
- **Tipografi:** Plus Jakarta Sans untuk teks fungsional + sentuhan Newsreader pada kata kunci misi pelayanan.

### D. Spesifikasi Animasi & Motion
- **Entrance:** Fade-in judul dari tengah dengan pelebaran kurva bawah secara ekspansif.
- **Micro-interactions:** Kapsul siklus hidup membesar 3% saat di-hover / disentuh dengan transisi warna latar belakang ke toska terang seketika (150ms).

---

## 5. Matriks Perbandingan Tiga Alternatif

| Kriteria Evaluasi | Alternatif 1: The Human Ecosystem | Alternatif 2: Digital Gateway & Mosaic | Alternatif 3: Community Health Panorama |
|---|---|---|---|
| **Kesesuaian dengan SATUSEHAT** | ⭐⭐⭐⭐⭐ (Sangat Tinggi - Hangat, manusiawi, toska bersih) | ⭐⭐⭐⭐ (Tinggi - Fokus pada ekosistem platform) | ⭐⭐⭐⭐⭐ (Sangat Tinggi - Bersih, terang, segar) |
| **Kesesuaian dengan Ritme Mekari** | ⭐⭐⭐⭐⭐ (Sangat Tinggi - Storytelling editorial & layered depth) | ⭐⭐⭐⭐⭐ (Sangat Tinggi - Modular showcase & product tech) | ⭐⭐⭐⭐ (Tinggi - Navigasi modular siklus hidup) |
| **Keterbacaan Pengguna Awam** | ⭐⭐⭐⭐⭐ (Sangat Ramah - Foto warga & alur jelas) | ⭐⭐⭐⭐ (Modern & Profesional) | ⭐⭐⭐⭐⭐ (Sangat Ramah & Terstruktur) |
| **Penonjolan Aplikasi CKG** | Seimbang & Proporsional via Tombol Eksternal | Sangat Menonjol via Mockup Perangkat Asli | Seimbang via Kapsul Siklus Hidup CKG |
| **Kinerja Loading & LCP (< 1.5s)** | Sangat Cepat (Optimasi WebP + CSS Vector Mask) | Cepat (Mockup ringan dengan WebP) | Paling Cepat (Struktur dominan CSS & Vektor) |
| **Kompatibilitas Mobile (320px–390px)** | Sangat Baik (Tumpukan vertikal alami) | Sangat Baik (Kontras tinggi & form sentuh) | Sangat Baik (Horizontal touch capsule) |

---

## 6. Rekomendasi & Pertanyaan untuk Pengguna

Berdasarkan keselarasan visi *Human-centered Digital Health*:
- **Rekomendasi Utama kami adalah ALTERNATIF 1 ("The Human Ecosystem")**:  
  Memberikan keseimbangan paling optimal antara **kehangatan pelayanan publik Puskesmas di tingkat kecamatan/desa** dengan **modernitas digital SATUSEHAT**. Menghilangkan sepenuhnya kesan "kartu berderet datar", menghadirkan kedalaman visual berlapis melalui komposisi manusia, bentuk toska organik, dan floating badge interaktif.
- **Alternatif 2** sangat kuat jika pimpinan Puskesmas ingin lebih menonjolkan kecanggihan teknologi digital dan operasional aplikasi CKG.
- **Alternatif 3** sangat kuat jika fokus utama adalah kecepatan warga menemukan layanan berdasarkan kelompok usia (siklus hidup ILP).

---

### Langkah Selanjutnya:
Setelah Anda meninjau ketiga alternatif di atas dan menentukan konsep pilihan (atau arahan kombinasi), kami akan:
1. Membangun purwarupa visual kode hero untuk konsep terpilih pada branch uji.
2. Memverifikasi kembali 0px overflow pada 7 viewport dan performa animasi sebelum melangkah ke section beranda berikutnya.
