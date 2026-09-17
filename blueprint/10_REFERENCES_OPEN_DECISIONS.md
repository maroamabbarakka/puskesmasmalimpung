# 10 — SUMBER, FAKTA TERKONFIRMASI, ASUMSI & OPEN DECISIONS
Verifikasi sumber publik 17 September 2026. Materi ini memandu arsitektur dan informasi, bukan pengganti penafsiran resmi unit hukum/pengelola data.

## Sumber UI referensi
- Mekari halaman ekosistem: https://mekari.com/. Temuan: headline manfaat, solusi modular, platform, integrasi/insight, proof, jalur eksplorasi; jangan mengklaim telah melakukan audit animasi frame-by-frame atau menganggap Mekari berafiliasi dengan Malimpung.
- Mekari Officeless platform: https://officeless.mekari.com/id/platform. Temuan: arsitektur modular, app builder, report builder, API/integrasi, governance; digunakan sebagai analogi *pengalaman*, bukan membeli produk.

## Sumber hukum/publik
- UU 25/2009 naskah resmi: https://www.peraturan.go.id/files/uu25-2009bt.pdf. Pasal 21 komponen standar pelayanan; Pasal 22 maklumat; Pasal 23 informasi.
- PerKI 1/2021: https://ppid.ekon.go.id/id/regulasi/peraturan-lain/perki-no-1-tahun-2021. Kategori berkala/serta merta/setiap saat/dikecualikan. Penyelenggara PPID instansi harus dikonfirmasi.
- Permenkes 19/2024 berlaku: https://jdih.kemkes.go.id/documents/peraturan-menteri-kesehatan-nomor-19-tahun-2024. Pengaturan Puskesmas, mengubah dasar lama.
- Permenkes 6/2024 berlaku: https://jdih.kemkes.go.id/documents/peraturan-menteri-kesehatan-nomor-6-tahun-2024. SPM kesehatan, 12 layanan dasar kab/kota.
- Permenkes 24/2022 berlaku: https://jdih.kemkes.go.id/documents/peraturan-menteri-kesehatan-nomor-24-tahun-2022. RME.
- Juknis ILP (Kepmenkes 2015/2023) via https://kesprimkom.kemkes.go.id/modul/unduhan/40.
- Laporan Kemenkes 2025 terkait dashboard PWS desa: https://itjen.kemkes.go.id/storage/laporan/laporan_kinerja_inspektorat_2_tahun_2025.pdf.
- SATUSEHAT Platform: https://satusehat.kemkes.go.id/platform ; panduan fasyankes: https://satusehat.kemkes.go.id/platform/docs/id/registration-guide/regis-institution/ . Registrasi sistem RME mandiri/vendor dan akses API produksi diperlukan. Akses API FHIR tidak sama dengan hak baca data klinis untuk website.
- CKG 2026: cari Kepmenkes HK.01.07/MENKES/84/2026 pada JDIH https://jdih.kemkes.go.id/ ; verifikasi versi terbaru sebelum membuat SOP lapangan.

## Fakta dari komunikasi proyek
Aplikasi CKG Malimpung sudah ada sebagai sistem internal; akun ASIK masih dalam proses; akan ada integrasi RME, peta kondisi kesehatan, absensi dan KPI di masa depan. Informasi ini belum berarti konektor sudah berfungsi atau semuanya satu sistem.

## Open decisions prioritas
| ID | Keputusan yang dibutuhkan | Pemilik yang perlu dilibatkan | Bila belum ada |
|---|---|---|---|
| D01 | Domain/subdomain resmi, instansi pengelola | Pemkab/Diskominfo/Dinkes | Gunakan konsep lokal saja |
| D02 | Logo, foto asli fasilitas/kegiatan | Puskesmas/Humas | Pakai ilustrasi berlabel |
| D03 | Jenis layanan, tarif, jadwal, SOP | Unit pelayanan | Jangan publish placeholder |
| D04 | Kontak, alamat dan koordinat resmi | Sekretariat | Jangan tampilkan nomor/point rekaan |
| D05 | Dokumen standar, maklumat, SKM, PPID | Pimpinan/PPID | Tampilkan struktur tanpa klaim dokumen ada |
| D06 | Desa/dusun, fasilitas jejaring & peta resmi | Puskesmas/Dinkes/Bappeda | Peta nonaktif |
| D07 | Sasaran dan definisi 12 SPM/CKG | Dinkes/Pemilik program | Tidak menghitung cakupan |
| D08 | RME yang dipilih dan otorisasinya | Puskesmas/Dinkes/RME vendor | Integrasi dimatikan |
| D09 | Akun ASIK + izin automasi/pertukaran | Kemenkes/Dinkes/Puskesmas | Tidak ada bot produksi |
| D10 | Absensi/KPI resmi, kewenangan | Kepegawaian/Pemkab | Konsep workspace saja |
| D11 | Role matrix data dan publikasi | Pimpinan, data steward, keamanan | Tidak terbitkan aggregate |
| D12 | Anggaran, infrastruktur, pemulihan | Pemilik proyek/TI | Belum memilih stack produksi |

## Kejujuran status
Mockup full-page bisa direview dari sisi estetika, layout, dan wording; belum menegaskan website memenuhi kewajiban secara substantif. Semua tanda tanggal dalam metadata prototipe adalah tanggal pembuatan desain, bukan 'last updated' data lapangan.
