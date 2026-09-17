# 03 — SPESIFIKASI INTEGRASI DATA: CKG, RME, ASIK, ABSENSI & KPI
**Proyek:** Puskesmas Malimpung — Health Hub V2  
**Tanggal:** 17 September 2026  
**Status:** Arsitektur Modular Disiapkan (Integrasi Eksternal Bertahap / Nonaktif Terkendali)

---

## 1. Prinsip Dasar Integrasi
1. **Server-Side Gateway Only:** Tidak ada permintaan data klinis mentah langsung dari peramban (*browser*) publik ke basis data internal.
2. **Read-Only & Additive-Only:** Skema aplikasi CKG yang telah berjalan tidak boleh diubah secara destruktif.
3. **No Fake Active Integrations:** Sistem tidak boleh menampilkan status seolah-olah integrasi eksternal telah aktif jika izin, API kredensial, dan perjanjian pengolahan data belum disahkan secara legal.

---

## 2. Matriks Kesiapan Integrasi Sistem

| Nama Sistem | Fungsi | Status Aktual | Persyaratan Menuju Produksi |
|---|---|---|---|
| **Aplikasi CKG Malimpung** | Skrining kesehatan siklus hidup internal | **Staged (Read-Only)** | Pembuatan service account terbatas untuk agregasi harian/mingguan tanpa akses NIK mentah. |
| **Rekam Medis Elektronik (RME)** | Tata laksana rekam medis klinis fasyankes | **Dinonaktifkan** | Menunggu keputusan pemilihan vendor RME resmi dari Dinas Kesehatan Kab. Pinrang dan perjanjian kepatuhan Permenkes 24/2022. |
| **ASIK (Kemenkes RI)** | Pencatatan imunisasi & skrining nasional | **Dinonaktifkan** | Menunggu penerbitan akun institusi Puskesmas Malimpung resmi dan panduan pertukaran data resmi (tanpa bot scraping). |
| **SATUSEHAT Platform** | Interoperabilitas fasyankes HL7 FHIR | **Staging Mode** | Registrasi institusi selesai; menunggu kredensial API produksi dan pemetaan resource FHIR (Encounter, Condition, Observation). |
| **Absensi & KPI Pemkab** | Pencatatan kinerja & kehadiran ASN/Non-ASN | **Menunggu API** | Koordinasi teknis dengan BKPSDM / Diskominfo Kabupaten Pinrang terkait endpoint dan token otentikasi resmi. |

---

## 3. Kontrak Data Snapshot Publik (Public Indicator Snapshot Contract)
Semua indikator yang disajikan pada halaman **Kesehatan Wilayah** wajib mematuhi skema JSON berikut:
```json
{
  "indicator_id": "ckg_skrining_triwulan",
  "indicator_name": "Cakupan Skrining CKG 2026",
  "program_owner": "Tim Kerja CKG Malimpung",
  "geography_level": "kecamatan",
  "geography_name": "Kecamatan Patampanua",
  "period_start": "2026-01-01",
  "period_end": "2026-03-31",
  "numerator": null,
  "denominator": null,
  "percentage": null,
  "unit": "jiwa",
  "quality_state": "pending_verification",
  "publication_status": "draft",
  "disclosure_risk_evaluated": true,
  "observed_at": "2026-09-17T08:00:00+08:00",
  "validated_by": "Penanggung Jawab Surveilans",
  "caveat": "Menunggu penetapan angka sasaran kependudukan resmi dari Dinas Kesehatan."
}
```

---

## 4. Keamanan & Penilaian Risiko Pengungkapan (Disclosure Control)
- **Aturan Sel Kecil (Small Cell Suppression):** Jika suatu kondisi penyakit atau skrining di suatu desa menghasilkan temuan < 5 kasus, rincian angka desa tidak boleh ditampilkan secara publik guna mencegah re-identifikasi identitas pasien oleh tetangga atau masyarakat setempat.
- **Data Agregat Terpisah:** Data PWS desa hanya disajikan dalam bentuk agregat persentase atau interval kategori risiko (*Rendah / Sedang / Tinggi*).

---

## 5. Integrasi Firebase Web SDK & Google Analytics
Aplikasi telah terintegrasi dengan Firebase Web SDK v10 Modular (`firebase/app` dan `firebase/analytics`) via modul terisolasi:
- **Berkas Konfigurasi:** [`prototype/firebase-config.js`](file:///d:/PKM_MALIMPUNG/Malimpung_Smart_Virtual_Office/prototype/firebase-config.js)
- **Project ID:** `puskesmas-malimpung`
- **Measurement ID:** `G-BH467HR1V6`
- **Fitur Keamanan:**
  1. Pemeriksaan ketersediaan analitik secara defensif menggunakan `isSupported()` sehingga aman pada peramban headless atau lingkungan tanpa koneksi internet.
  2. Whitelist domain Firebase & Analytics pada Content Security Policy (`prototype/_headers` & `firebase.json`):
     - `https://www.googletagmanager.com`
     - `https://*.google-analytics.com`
     - `https://*.firebaseio.com`
     - `https://*.googleapis.com`
  3. Tidak ada pengiriman data sensitif pasien (NIK, nama, riwayat penyakit) ke Google Analytics; event analitik dibatasi pada navigasi rute halaman, pengiriman formulir SKM, dan interaksi publik.

