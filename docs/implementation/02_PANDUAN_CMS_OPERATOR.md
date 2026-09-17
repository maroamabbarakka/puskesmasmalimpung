# 02 — PANDUAN PENGGUNAAN CMS BAGI OPERATOR PUSKESMAS
**Platform:** Puskesmas Malimpung — Health Hub V2  
**Sasaran Pengguna:** Petugas Administrasi, Editor Konten, Pengelola Informasi Layanan, dan Pejabat Penyetuju  
**Tanggal:** 17 September 2026

---

## 1. Pendahuluan
Sistem Manajemen Konten (CMS) Puskesmas Malimpung dirancang agar staf dan operator puskesmas dapat memperbarui informasi layanan publik, jadwal dokter, maklumat, serta pengumuman secara mandiri tanpa memerlukan keahlian teknis pemrograman atau bantuan developer rutin.

---

## 2. Cara Mengakses Studio CMS
1. Buka website Puskesmas Malimpung.
2. Klik tombol **Kantor Virtual** di pojok kanan atas header (atau buka rute `#office`).
3. Pada halaman Smart Virtual Office, pilih peran Anda pada menu **Simulasi Peran** (misal: *Petugas Administrasi / Editor CMS*).
4. Klik tab menu internal **CMS Manajemen Konten**.

---

## 3. Alur Kerja Penerbitan Konten (Workflow)
Setiap konten melewati 4 tahapan validasi:
1. **Draft:** Operator menginput draft perubahan deskripsi, tarif, atau jadwal.
2. **Review:** Verifikator substantif (Tenaga Kesehatan / Dokter / Penanggung Jawab Pelayanan) memeriksa kebenaran medis dan operasional.
3. **Approved:** Kepala Puskesmas atau Pejabat Berwenang memberikan persetujuan legalitas dan kebijakan publik.
4. **Published:** Konten otomatis tayang di portal publik dan tercatat dalam buku catatan audit sistem.

---

## 4. Panduan Memperbarui Layanan Publik
1. Pada form editor CMS:
   - Pilih layanan yang ingin diubah (contoh: *Pemeriksaan Gigi dan Mulut*).
   - Nilai saat ini akan otomatis terisi pada form.
2. Lakukan perubahan pada teks deskripsi, ketentuan tarif (sesuai Perda terkini), atau jadwal operasional.
3. Klik tombol hijau **Simpan & Publikasikan ke Portal**.
4. Sistem akan:
   - Menyimpan data baru ke penyimpanan persisten browser (*localStorage*).
   - Memperbarui katalog layanan di menu **Layanan** seketika.
   - Menambahkan catatan ke dalam tabel **Audit Log & Kualitas Data**.
   - Menampilkan notifikasi pop-up (*toast*) konfirmasi keberhasilan.

---

## 5. Fitur Cadangan Data (Backup & Restore)
- **Ekspor JSON:** Klik tombol **Ekspor JSON** di pojok kanan atas CMS untuk mengunduh berkas salinan cadangan data master layanan (`master_layanan_malimpung_v2.json`).
- **Reset Default:** Jika terjadi kekeliruan pengisian data, klik tombol **Reset Default** untuk mengembalikan seluruh layanan ke standar master resmi awal.

---

## 6. Aturan Kepatuhan Konten
- Dilarang mencantumkan tarif sebelum adanya Perda atau SK penetapan resmi.
- Dilarang menjanjikan layanan 24 jam selain UGD dan Persalinan darurat.
- Dilarang mempublikasikan nama atau data medis pribadi pasien pada kolom deskripsi atau pengumuman.
