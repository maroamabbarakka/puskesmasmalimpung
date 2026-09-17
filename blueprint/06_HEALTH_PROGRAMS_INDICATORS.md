# 06 — KATALOG PROGRAM KESEHATAN & KERANGKA INDIKATOR
Tujuan: banyak program disatukan sebagai perjalanan masyarakat; aturan pelaporan dan definisi indikator tetap sesuai sumber resmi. Berikut **cakupan desain**, tidak menyatakan layanan atau target Malimpung sudah aktif.

## Acuan
Permenkes 19/2024 mengarahkan Puskesmas pada layanan primer menurut siklus hidup: https://jdih.kemkes.go.id/documents/peraturan-menteri-kesehatan-nomor-19-tahun-2024.
Permenkes 6/2024 tentang standar teknis SPM kesehatan: https://jdih.kemkes.go.id/documents/peraturan-menteri-kesehatan-nomor-6-tahun-2024. Dokumen ini menyebut 12 jenis layanan dasar SPM kabupaten/kota.
Juknis ILP dan PWS tersedia melalui https://kesprimkom.kemkes.go.id/modul/unduhan/40; penjelasan PWS desa terdapat pada laporan https://itjen.kemkes.go.id/storage/laporan/laporan_kinerja_inspektorat_2_tahun_2025.pdf.
CKG 2026: Kepmenkes HK.01.07/MENKES/84/2026; periksa status terkini pada JDIH Kemenkes sebelum finalisasi aturan sasaran dan pemeriksaan.

## Katalog user-facing
- Kehamilan & kesehatan ibu; bayi baru lahir dan tumbuh kembang balita; gizi & Posyandu.
- Anak sekolah dan remaja, termasuk UKS, CKG sekolah, imunisasi kegiatan sekolah bila dikerjakan.
- Dewasa: CKG umum, PTM, berhenti merokok, kesehatan lingkungan, kesehatan reproduksi.
- Lansia: pemeriksaan, risiko PTM, kesehatan fungsional, dan tindak lanjut.
- Tema lintas usia: TB, penyakit menular, imunisasi, kesehatan jiwa, GERMAS, PHBS, surveilans kewaspadaan; sesuaikan risiko privasi.

## Matriks 12 SPM kabupaten/kota — hanya sebagai domain pengukuran
| ID | Pelayanan dasar | Contoh dimensi display | Tidak boleh disalahartikan |
|---|---|---|---|
| SPM01 | Ibu hamil | sasaran, pelayanan sesuai standar, periode | kunjungan bukan ibu unik otomatis |
| SPM02 | Ibu bersalin | sasaran, pelayanan sesuai standar | jangan menyimpulkan komplikasi tanpa diagnosis |
| SPM03 | Bayi baru lahir | sasaran, layanan sesuai standar | periksa definisi newborn dan sumber |
| SPM04 | Balita | sasaran, layanan sesuai standar | status gizi memerlukan metode baku |
| SPM05 | Usia pendidikan dasar | sasaran, layanan sesuai standar | jumlah sekolah bukan jumlah anak |
| SPM06 | Usia produktif | sasaran, layanan sesuai standar | peserta CKG bukan seluruh usia produktif |
| SPM07 | Usia lanjut | sasaran, layanan sesuai standar | definisi umur konsisten |
| SPM08 | Hipertensi | pasien sasaran, pelayanan sesuai standar | temuan tekanan darah tinggi ≠ diagnosis |
| SPM09 | Diabetes melitus | pasien sasaran, pelayanan sesuai standar | hasil skrining gula darah ≠ DM definitif |
| SPM10 | Gangguan jiwa berat | akses/pelayanan sesuai standar | risiko pengungkapan identitas tinggi |
| SPM11 | Orang terduga TB | layanan sesuai standar | terduga ≠ kasus TB terkonfirmasi |
| SPM12 | Risiko infeksi HIV | layanan sesuai standar | risiko pengungkapan tinggi, publikasi desa mungkin dilarang |

SPM menjadi indikator kebijakan *pemerintah kabupaten/kota*, bukan klaim otomatis bahwa Puskesmas bertanggung jawab atas total sasaran atau angka kabupaten. Pemilik indikator, definisi per tahun, periode dan agregasi harus dikukuhkan Dinkes.

## Metric contract wajib (untuk setiap indikator)
```
indicator_id; name_public; owner_program; policy_reference;
unit; valid_population; case_definition; numerator_rule; denominator_rule;
unique_person_rule; dedupe_period; event_time_field; geography_level;
source_systems; refresh_target; acceptable_delay; data_quality_rules;
privacy_class; min_cell_policy; publish_permission; publication_status;
source_observed_at; extracted_at; validated_at; approved_at; published_at;
revision; caveat_public; threshold_owner
```
Tidak ada denominator ⇒ jangan hitung persentase. Tidak ada data ⇒ NULL/unknown, bukan 0. Jangan hitung prevalensi dari sampel yang mengikuti CKG tanpa desain epidemiologis memadai. Indikator hasil skrining tidak boleh berubah menjadi label diagnosis.

## Chart design governance
Rendahnya cakupan bisa terkait layanan/pendataan, bukan kondisi warga lebih buruk. Tingginya jumlah hasil skrining berisiko bisa disebabkan besarnya volume yang diperiksa. Pada perbandingan desa selalu tampilkan N, periode, coverage, quality dan denominator. Jika sel kecil, sembunyikan/gabung sesuai hasil penilaian risiko pengungkapan; tidak ada ambang angka universal yang boleh diasumsikan tanpa kebijakan sah. Untuk penyakit sensitif mungkin cukup kabupaten/kecamatan internal, bukan publik tingkat desa.

## Content lifecycle
Program draft → verifikasi ada/tidak di Malimpung → tetapkan pemilik dan dokumen → tampilkan di katalog. Indikator diregistrasi terpisah dan tidak otomatis publish hanya karena program aktif. News/event editorial tidak mengubah hitungan program sampai input operasional diverifikasi.
