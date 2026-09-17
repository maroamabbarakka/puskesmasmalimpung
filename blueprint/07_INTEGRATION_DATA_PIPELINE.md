# 07 — BLUEPRINT INTEGRASI DATA: CKG, RME, PWS, ASIK, ABSENSI, KPI
**Aturan:** gateway/server-side, sumber berizin, kontrak data, dan verifikasi. Browser publik tidak mengambil data mentah klinis atau kepegawaian.

## Status fakta saat penyusunan
- Aplikasi CKG Malimpung sudah dikembangkan terpisah. Integrasi agregasi read-only **belum dibangun** pada paket mockup; jangan ubah schema existing secara destruktif. Data pasien tetap internal.
- Akun ASIK Puskesmas masih diproses. Jangan membuat klaim 'ASIK auto sync'. API ASIK CKG bulk tidak terverifikasi sebagai jalur terbuka.
- Produk RME resmi belum diputuskan. SATUSEHAT Platform adalah jalur interoperabilitas RME HL7 FHIR dan registrasi fasyankes; **bukan jaminan** website berwenang membaca raw national records atau bahwa input SATUSEHAT langsung melengkapi laporan ASIK. Rujukan: https://satusehat.kemkes.go.id/platform dan https://satusehat.kemkes.go.id/platform/docs/id/registration-guide/regis-institution/.
- Sistem absensi dan KPI milik Pemkab/Dinkes belum diinventarisasi. Tidak boleh membuat sistem paralel yang diklaim resmi.
- Jejaring/desa/batas wilayah dan angka denominator belum tervalidasi.

## Pipeline yang disarankan
```
[CKG | RME | laporan program berizin | kepegawaian resmi]
     → connector/service identity per sumber (read limited)
     → ingest staging (private, encrypted)
     → normalisasi + quality checks + dedupe + program mapping
     → quality verdict + steward approval
     → indicator aggregates with period/geography/provenance
     → disclosure risk / publication approval
     → isolated PUBLIC SNAPSHOT API / cache [only allowed aggregates]
     → website / Health Insights
```
Data internal PWS yang lebih rinci menggunakan endpoint/collection internal tersendiri + role check + row-level filters jika DB mendukung. Public snapshot tidak berisi record pasien, ID person, hash NIK reversible/irreversible pun tidak diperlukan, geo titik rumah, diagnosis sensitif detail, identitas tenaga kesehatan, atau payload klinis.

## Urutan koneksi realistis
A. Tautan resmi berizin (contact, Mobile JKN/CKG, PPID) bila URL valid. B. Agregasi CKG internal via service account yang hanya bisa membaca dataset diperlukan. C. Data program melalui ekspor/laporan resmi yang disetujui, lengkap provenance. D. RME via konektor penyedia dan kontrak hak akses. E. API eksternal hanya setelah dokumentasi, izin, sandbox, kredensial produksi, UAT, rekonsiliasi, perjanjian pengolahan data. F. Absensi/KPI resmi dengan pemisahan privacy domain.

## Contoh kontrak output agregat (bukan real data)
```json
{
 "indicator_id":"ckg_unique_examined","geography_id":"VERIFIED_ID_REQUIRED",
 "period_start":"YYYY-MM-DD","period_end":"YYYY-MM-DD",
 "numerator":null,"denominator":null,"value":null,"unit":"person",
 "observed_at":null,"extracted_at":null,"validated_at":null,
 "published_at":null,"source_versions":[],"quality_state":"not_available",
 "publication_state":"draft","disclosure_review":"pending"
}
```
Semua `null` adalah nilai status pra-data. Angka dalam screenshot tidak boleh dipalsukan. `healthData != 0` bukan pengganti pemeriksaan existence/quality.

## Quality & reconciliation
- Identitas unik internal konsisten per individu dan periode; jangan mengekspor NIK ke agregat publik. Event time (pemeriksaan) berbeda dengan sync time.
- Catatan status `missing`, `not_examined`, `negative`, `positive_screening`, `diagnosed`, `not_applicable` dibedakan. Jangan mengubah `missing` menjadi 'Tidak'.
- Setiap run menyimpan ingestion job id, sumber, versi mapping, count input, valid, reject, duplicate, dan review tanpa PHI di log umum.
- Idempotency: kombinasi source record ID/version + target. Kegagalan timeout perlu cek target sebelum retry supaya tidak duplicate.
- Desain freshness: periode data, observed_at, source_last_success, validation_at, published_at, SLA dan staleness level. Label realtime hanya untuk jalur yang benar-benar otomatis dan diaudit.

## Absensi & KPI
KPI bukan = jumlah hadir. Gunakan attendance official system source-of-truth; KPI target dan realisasi disahkan; metrik operasional CKG hanya dapat masuk dashboard kepegawaian sesuai penugasan, izin dan definisi; jangan menjadikan tindakan pemeriksaan per pasien sebagai kompetisi tanpa pengendalian kualitas. GPS hanya pada event yang benar-benar dibutuhkan dan disetujui, bukan tracking nonstop.

## Health Insights keamanan
PWS internal berbeda dari choropleth publik; public maps butuh batas resmi GIS dengan metadata `source`, `license`, `date`, `validity`. Tidak menaruh geolocation pasien. Query multi-filter perlu mencegah re-identification melalui differencing. Public dashboard data exposed hanya sebagai rilis agregat batch disetujui.

## Checklist membuka konektor
Identifikasi pemilik & dasar akses; dokumen API/export resmi; data dictionary; klasifikasi data; perjanjian bila diperlukan; penilaian dampak privasi; lingkungan sandbox; rate limit; error code; retry/idempotency; audit; verifikasi angka; hak revoke dan prosedur incident. Tanpa ini konektor tetap disabled.
