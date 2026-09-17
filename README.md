# PUSKESMAS MALIMPUNG — HEALTH HUB V2
**Paket blueprint, prototipe responsif, dan mockup full-page**  
Versi: 2.0 concept / 17 September 2026 · Status: PRA-IMPLEMENTASI

## Apa yang berubah dari paket sebelumnya?
Arah utama kini **human-centered / editorial healthcare / premium digital platform**. Website memulai cerita dari manfaat pelayanan, program, dan kesehatan wilayah; daftar API, status konektor, RME, absensi, KPI dipindahkan ke tempat yang sesuai, bukan menjadi wajah publik. Mekari dipakai sebagai *referensi prinsip pengalaman* (benefit-first, pengelompokan modular, ritme visual, storytelling), bukan dikloning.

## Buka yang mana?
- `prototype/index.html` — prototipe lokal dengan 6 halaman: Beranda, Layanan, Program Kesehatan, Kesehatan Wilayah, Informasi Publik, Kantor Virtual (demo). CSS/JS ada di folder yang sama; ekstrak ZIP seluruhnya, kemudian buka HTML. Tidak membutuhkan koneksi server atau API.
- `fullpage/` — **18 mockup PNG full-page terpisah**: 6 halaman × desktop 1440px, tablet 820px, mobile 390px. Semua menangkap seluruh tinggi halaman, bukan hanya viewport pertama.
- `blueprint/` — 11 dokumen Markdown yang memuat arahan desain, konten pemerintah, program kesehatan, integrasi, tata kelola data, CMS, dan instruksi implementasi kepada developer.
- `prototype/capture_qa.py` — skrip reproduksi screenshot dan uji perilaku antarmuka menggunakan Python Playwright + Chromium. Bisa dijalankan di lingkungan pengembangan yang mendukungnya.

## Peringatan keaslian dan status
Semua visual dalam prototipe adalah **konsep**. Logo simbol hati BUKAN logo resmi; gambar gedung/petugas adalah ilustrasi, bukan foto fasilitas; bentuk wilayah adalah ilustrasi, BUKAN batas Malimpung. Tidak ada angka kesehatan, foto pasien, jadwal, tarif, akun, kata sandi, token, atau data pegawai sungguhan. Kartu layanan adalah contoh kategori, bukan pernyataan ketersediaan riil.

CKG Malimpung adalah sumber aplikasi internal yang akan dipelajari untuk agregasi terotorisasi; tidak tersambung pada prototipe. RME belum ditetapkan, akun ASIK masih diproses, dan nama sistem resmi absensi/KPI belum terkonfirmasi. SATUSEHAT Platform tidak otomatis merupakan endpoint baca publik ataupun bukti laporan CKG ASIK telah diterima.

## Cara menyerahkan kepada developer
Mulai dari `01_VISI_CREATIVE_DIRECTION.md`, baca seluruh urutan dokumen, gunakan HTML hanya sebagai referensi pengalaman, lakukan inventaris data layanan/dokumen/program resmi, lalu implementasi bertahap. Tidak boleh deploy prototipe apa adanya, mengisi konten contoh sebagai fakta, atau mengambil raw clinical/workforce data ke frontend publik.

## Rujukan audit utama
- Mekari: https://mekari.com/ (ditelusuri 17 September 2026).
- UU No. 25/2009: https://www.peraturan.go.id/files/uu25-2009bt.pdf.
- PerKI No. 1/2021: https://komisiinformasi.go.id/ (konfirmasi naskah dan peraturan berlaku sebelum rilis).
- Permenkes No. 6/2024: https://jdih.kemkes.go.id/documents/peraturan-menteri-kesehatan-nomor-6-tahun-2024.
- SATUSEHAT: https://satusehat.kemkes.go.id/platform/docs/id/registration-guide/regis-institution/.
- PWS/ILP: https://itjen.kemkes.go.id/storage/laporan/laporan_kinerja_inspektorat_2_tahun_2025.pdf.

**Status acceptance internal:** screenshot dan automated smoke test ada dalam `11_QA_REPORT.md`. Audit ini tidak menggantikan UAT, audit aksesibilitas, audit keamanan, atau pengesahan konten oleh instansi.
