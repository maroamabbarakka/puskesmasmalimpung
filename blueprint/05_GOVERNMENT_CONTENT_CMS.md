# 05 — INFORMASI PEMERINTAH, KONTEN RESMI & CMS
**Tujuan:** menyajikan pemenuhan kewajiban publik sebagai pengalaman yang jelas, bukan menjejalkan tabel atau link PDF ke beranda. Ini checklist rancangan; verifikasi kewenangan dan dokumen wajib tetap dilakukan bersama Dinkes/PPID/Bagian Hukum.

## Landasan yang harus dicek sebelum go-live
- UU 25/2009 tentang Pelayanan Publik, terutama komponen standar pelayanan (Pasal 21), maklumat yang dipublikasikan jelas dan luas (Pasal 22), dan kewajiban pengelolaan informasi pelayanan (Pasal 23). Naskah: https://www.peraturan.go.id/files/uu25-2009bt.pdf.
- PerKI No. 1/2021 tentang Standar Layanan Informasi Publik, termasuk berkala, serta-merta, setiap saat dan informasi yang dikecualikan. Naskah resmi dapat ditemukan melalui PPID https://ppid.ekon.go.id/id/regulasi/peraturan-lain/perki-no-1-tahun-2021; rujuk PPID induk untuk penanggung jawab yang benar.
- Permenkes 19/2024 tentang Penyelenggaraan Puskesmas, status berlaku: https://jdih.kemkes.go.id/documents/peraturan-menteri-kesehatan-nomor-19-tahun-2024. Permenkes ini menggantikan Permenkes 43/2019; hindari menggunakan 43/2019 sebagai dasar aktif tanpa konteks.
- Permenkes 24/2022 tentang Rekam Medis untuk perlindungan klinis: https://jdih.kemkes.go.id/documents/peraturan-menteri-kesehatan-nomor-24-tahun-2022.

## Registry kewajiban informasi
| Kelompok | Informasi | Pemilik/verifikator | Penempatan | Aturan konten |
|---|---|---|---|---|
| Identitas | Nama resmi, alamat, kontak, pimpinan, struktur, tugas dan fungsi | Kepala Puskesmas/sekretariat | Profil + footer | Tidak menebak nama atau nomor kontak |
| Standar pelayanan | Persyaratan, prosedur, waktu, tarif, produk, jaminan, penanganan pengaduan | Pengelola pelayanan/pimpinan | HTML detail + PDF resmi | Dokumen versi berlaku, tanggal efektif |
| Maklumat | Naskah ditetapkan | Kepala Puskesmas/unit berwenang | Informasi Publik, ringkasan beranda | Jangan membuat redaksi seolah sudah disahkan |
| Program/kinerja | Deskripsi, sasaran, kegiatan, rencana, capaian yang disahkan | Penanggung jawab program | Program + kinerja | Tandai periode dan sumber |
| Keuangan/pengadaan | Informasi sesuai ruang kewenangan | PPID/Dinkes/Pemkab | Tautan dokumen resmi | Jangan mengklaim Puskesmas pemegang dokumen jika bukan |
| Informasi berkala | Dokumen yang relevan sesuai daftar informasi publik instansi | PPID | Informasi publik | Jadwal review minimal mengikuti kebijakan yang berlaku |
| Informasi darurat | Instruksi resmi/terverifikasi yang perlu segera diketahui | Pejabat penanggung jawab | Alert/header + halaman | Masa berlaku/expired, dokumen sumber |
| Pengaduan | Kanal sah, SLA berdasarkan SOP, alur tindak lanjut | Petugas pengaduan | Layanan + Informasi Publik | Jangan menampilkan tiket personal publik |
| SKM | Periode, metode, responden dan hasil yang sah | Penyelenggara SKM | Transparansi | Jangan menciptakan skor atau menyatakan rating tanpa hasil |
| Privasi | Jenis data portal dan kontak penanggung jawab | Pengelola PSE/DPO jika ada | Footer | Selaraskan praktik nyata, bukan template generik |

## CMS product model
Collections logis (implementasi tidak harus Firestore; pilih setelah audit infrastruktur): `site_settings`, `facilities`, `service_categories`, `services`, `service_schedules`, `programs`, `activities`, `announcements`, `articles`, `documents`, `public_indicators`, `indicator_publications`, `complaint_channels`, `navigation`, `redirects`, `editorial_audit`. Klinik mentah dan SDM tidak masuk CMS.

### Data record layanan minimal
```
service_id, slug, title, short_description, category_id, audience[],
requirements_html, preparation_html, procedure_steps[], duration_text,
cost_text, cost_legal_basis, output_service, service_location,
related_program_ids[], schedule_ids[], complaint_channel_id,
standard_document_id, status: draft|review|approved|published|archived,
effective_from, effective_until, last_verified_at, verified_by,
owner_unit, published_at, updated_at, revision, audit_ref
```
Tidak boleh `cost_text='gratis'` default. Jika belum diketahui: belum dipublikasikan. Jadwal memiliki hari, jam registrasi, jam pelayanan, exception, sumber, effective range. `published` tanpa `verified_at` untuk field wajib harus ditolak.

### Model konten program & kegiatan
`program { id,slug,name,national_policy_ref,life_stage[],program_owner,description,official_active_state,related_service_ids[],indicator_ids[],source_urls[],valid_from,valid_until,approval }`.
`activity { id,title,date_start,date_end,location_official,related_program_ids[],related_service_ids[],media[],privacy_clearance,editorial_status }`.
Relasi M:N menghindari berita ganda ketika satu Posyandu terkait ILP/KIA/gizi/SPM.

### Model dokumen
`document_id, classification, issuing_unit, legal_basis, number, title, effective_date, publication_date, version, supersedes, file_url, sha256, accessibility_html, approval_ref, disclosure_level, archive_status`. Dokumen lama tidak dihapus tanpa retensi/approval; halaman menandai 'diganti oleh ...'.

## Workflow persetujuan
Draf editor → verifikasi substantif program/layanan → verifikasi informasi publik & privasi → persetujuan pejabat berwenang → jadwal terbit → publikasi → review berkala → arsip. Audit menyimpan siapa mengubah field, kapan, alasan, versi. Akses backend berbeda: admin teknis ≠ penentu kebenaran medis ≠ pejabat pemberi persetujuan.

## Aturan SEO
Metadata judul/deskripsi per halaman, canonical, Open Graph image *sesuai isi* dan lisensi, schema Organization/MedicalClinic hanya atribut yang benar-benar diverifikasi; sitemap hanya published routes; robots tidak dianggap pengamanan untuk internal; backend/PHI wajib auth di server. Tambahkan analytics privat agregat, tidak mengirim identitas pasien ke tracker.

## Acceptance
Dokumen resmi bisa dibaca ringkas di mobile tanpa membuka PDF; dokumen punya versi dan owner; link sumber hidup; tidak ada jadwal kedaluwarsa sebagai jadwal aktif; konten yang belum terverifikasi tidak diterbitkan; PPID/anggaran diarahkan sesuai struktur yang sah.
