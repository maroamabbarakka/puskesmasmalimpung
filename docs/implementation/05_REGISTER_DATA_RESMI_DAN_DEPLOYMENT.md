# 05 — REGISTER DATA RESMI, PANDUAN DEPLOYMENT & ROLLBACK
**Proyek:** Puskesmas Malimpung — Health Hub V2  
**Tanggal:** 17 September 2026  
**Status:** Panduan Kesiapan Rilis Produksi (Production Readiness Checklist)

---

## 1. Register Data & Dokumen Resmi yang Masih Diperlukan (Open Registry)
Sebelum dilakukan penerbitan resmi (*Go-Live*) ke domain publik pemerintah (contoh: `puskesmas-malimpung.pinrangkab.go.id`), pihak Puskesmas dan instansi pembina wajib melengkapi dan mengesahkan dokumen berikut:

| No | Kebutuhan Data / Dokumen | Unit Penanggung Jawab | Dampak Jika Belum Tersedia |
|---|---|---|---|
| 1 | **Surat Keputusan (SK) Standar Pelayanan & Maklumat** | Kepala Puskesmas Malimpung | Wajib diunggah naskah aslinya dalam format PDF berstempel dinas. |
| 2 | **Tarif Retribusi Pelayanan Kesehatan Resmi (Perda)** | Bapenda / Dinkes Kab. Pinrang | Teks biaya pada katalog layanan menggunakan referensi Perda resmi yang berlaku. |
| 3 | **Foto Dokumentasi Asli Fasilitas & Tenaga Kesehatan** | Bagian Humas / Tata Usaha Puskesmas | Menggantikan ilustrasi placeholder grafis dengan foto berizin rilis publik. |
| 4 | **Peta Batas Wilayah Kerja Geospasial Resmi (GIS)** | Bappeda / Dinas Kesehatan Kab. Pinrang | Peta poligon wilayah desa belum dapat diaktifkan tanpa shapefile resmi. |
| 5 | **Data Denominator Sasaran 12 SPM & CKG 2026** | Dinas Kesehatan / Disdukcapil Pinrang | Persentase cakupan kesehatan wilayah tidak boleh dihitung tanpa angka sasaran riil. |
| 6 | **Persetujuan Pejabat Pengelola Informasi (PPID)** | Diskominfo & PPID Dinkes Pinrang | Penetapan tautan permohonan informasi publik resmi daerah. |

---

## 2. Panduan Deployment Staging & Produksi

### A. Persyaratan Lingkungan (Environment Requirements)
- Web Server: Nginx, Apache, atau Hosting Statis Berkinerja Tinggi (Firebase Hosting / Cloudflare Pages / Server Pemkab Pinrang).
- Dukungan HTTPS (Sertifikat SSL/TLS Aktif wajib untuk kepatuhan keamanan data).
- Security Headers Terkonfigurasi:
  - Telah disediakan berkas konfigurasi HTTP Headers siap pakai: [`prototype/_headers`](file:///d:/PKM_MALIMPUNG/Malimpung_Smart_Virtual_Office/prototype/_headers) untuk platform static hosting (Cloudflare Pages, Vercel, Netlify).
  - Telah disediakan berkas contoh konfigurasi Nginx berstandar produksi: [`prototype/nginx.conf.example`](file:///d:/PKM_MALIMPUNG/Malimpung_Smart_Virtual_Office/prototype/nginx.conf.example) untuk server resmi Pemkab Pinrang / Diskominfo.

### B. Prosedur Deployment Staging & Produksi
1. Kloning branch rilis:
   ```bash
   git checkout feature/health-hub-v2
   ```
2. Salin isi folder `prototype/` (berkas `index.html`, `style.css`, `app.js`, `_headers`, dan direktori `assets/`) ke document root web server.
3. Untuk deployment Nginx: pasang konfigurasi dari `prototype/nginx.conf.example` ke `/etc/nginx/sites-available/` dan buat symlink ke `sites-enabled/`.
4. Jalankan pengujian otomatis `python prototype/test_extended_viewports.py` untuk memastikan seluruh rute, viewport, dan deep-linking slug berfungsi normal.

---

## 3. Rencana Pencadangan & Pemulihan (Backup & Rollback Plan)
- **Baseline Git Checkpoint:** Seluruh kondisi awal tersimpan aman pada commit baseline `bd82c55`.
- **Prosedur Rollback Cepat:**
  Jika ditemukan anomali mayor pada tahap uji penerimaan pengguna (UAT), rollback dapat dilakukan seketika dengan:
  ```bash
  git checkout master
  ```
  atau mengembalikan web server ke snapshot sebelumnya dalam waktu < 5 menit.
- **Pencadangan Konten CMS:** Operator wajib melakukan klik **Ekspor JSON** pada CMS sebelum dan sesudah melakukan perubahan massal untuk mengamankan data ke berkas lokal.
