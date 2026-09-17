# 01 — VISI PRODUK & CREATIVE DIRECTION
Tanggal: 17-09-2026 · Status: Blueprint konseptual untuk validasi pimpinan/instansi.

## North star
**Puskesmas Malimpung: kesehatan masyarakat, dalam satu pandangan.** Website adalah kantor virtual institusi: kanal informasi layanan utama untuk masyarakat, kanal Health Insights agregat yang siap menjawab pertanyaan kesehatan wilayah, dan gerbang kerja terotorisasi untuk petugas. Pengunjung publik tidak perlu membuka situs setiap hari; staf dan pimpinan menjadi pengguna berulang, sementara halaman publik tetap menjawab kebutuhan warga dengan cepat. Keberhasilan bukan diukur dari animasi saja atau traffic semata, melainkan pencarian informasi cepat, data yang aktual/terverifikasi, efisiensi kerja, serta kepercayaan publik.

## Masalah blueprint lama
Hero menjadikan dashboard, ilustrasi peta tak resmi, dan status konektor sebagai wajah utama. Kartu seragam dan istilah teknis mengaburkan cerita. Ukuran sebagian teks terlalu kecil. Status demo berulang membuat website terlihat seperti lingkungan development. Struktur 'CKG/RME/ASIK/absensi/KPI' mencerminkan perangkat lunak, bukan kebutuhan manusia.

## Referensi Mekari — adaptasi, bukan duplikasi
Observasi dari https://mekari.com/: proposisi manfaat lebih dahulu; produk dikelompokkan ke solusi modular dan platform; setiap kelompok punya hierarki visual dan konteks; ekosistem terintegrasi dipresentasikan sebagai outcome. Belum dilakukan audit frame-by-frame animasi produksi atau penyalinan aset Mekari. Dalam Malimpung: manfaat layanan lebih dahulu, health insight sebagai bagian cerita, office hanya CTA utilitas; seksi berubah komposisi (hero editorial, quick-action asymmetric, dramatic dark feature, editorial mosaic, ecosystem constellation, civic info). Jangan menyalin logo, tata letak secara literal, imagery, ikon, teks, atau kode Mekari.

## Tiga janji pengalaman
1. **Masyarakat:** 'Saya tahu kapan, ke mana, untuk apa, apa syaratnya, bagaimana menyampaikan aspirasi'.
2. **Pimpinan/pengelola program:** 'Saya dapat menjawab bagaimana kondisi kesehatan wilayah saat ini menggunakan definisi dan periode yang dapat dipertanggungjawabkan'.
3. **Petugas:** 'Saya melihat pekerjaan prioritas dan mengakses sistem operasional sesuai hak saya; tidak perlu menyalin data klinis untuk publik'.

## Prinsip estetika
Gaya editorial healthcare + SaaS premium: latar hutan-hijau, ruang putih luas, pastel hijau/biru/amber lembut, tipografi judul geometris dengan *italic serif* untuk sentuhan manusiawi; kartu lebih sedikit tetapi lebih bermakna; illustrasi original abstrak yang tidak berpotensi dianggap foto gedung Malimpung. Dalam implementasi, ganti area dokumentasi dengan foto **asli** yang disetujui, menyertakan konteks, sumber, alt text, dan izin subjek bila diperlukan. Simbol hati prototipe tidak boleh diperlakukan sebagai logo resmi.

## Indikator pengalaman (target desain, bukan hasil pengujian pengguna)
- Jalur akses ke detail layanan: ≤3 tindakan dari beranda.
- Jadwal + prosedur layanan terlihat tanpa membaca PDF.
- Semua informasi status data tampil eksplisit dan tidak mengubah 'belum ada data' menjadi angka 0.
- Layout 320–1440 px tanpa horizontal overflow; 390/820/1440 sudah diuji otomatis pada prototipe.
- Target aksesibilitas WCAG 2.2 AA untuk implementasi akhir; prototipe belum diaudit tuntas.
- Pengguna internal bisa membedakan observasi, keterlambatan sinkron, verifikasi dan publikasi.

## Yang bukan tujuan
Tidak membangun RME dari sekadar website publik; tidak menjanjikan integrasi ASIK sebelum hak akses dan dokumen sah; tidak mengekspos data rekam medis/pegawai ke endpoint publik; tidak menciptakan angka fiktif demi visual; tidak menyatakan website ini sudah beroperasi.

## Keluaran kreatif
Full-page untuk 6 halaman × 3 ukuran; HTML/CSS/JS konsep offline; 11 dokumen blueprint. Prototipe digunakan untuk validasi rasa desain, urutan konten, responsivitas, dan interaksi dasar. Bukan aplikasi siap deploy.
