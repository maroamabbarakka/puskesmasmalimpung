# 02 — INFORMATION ARCHITECTURE & USER JOURNEYS

## Prinsip
Navigasi berangkat dari *job-to-be-done*, bukan aplikasi. Publik dan internal satu identitas, tetapi ruang akses terpisah. Jangan memaksa warga mengenali RME/ASIK/KPI. Tidak lebih dari enam kategori primer; halaman-halaman turunan dikelola CMS.

## Navigasi utama
1. `Beranda /` — manfaat, akses cepat, informasi operasional, health insight, program, kegiatan, keterbukaan, kontak.
2. `Layanan /layanan` — pencarian, kategori, detail layanan, jadwal, syarat, prosedur, tarif, produk pelayanan, pengaduan, last verified.
3. `Program Kesehatan /program` — katalog menurut siklus hidup dan tema; detail program, subprogram, kegiatan, sasaran, indikator yang telah disahkan.
4. `Kesehatan Wilayah /kesehatan-wilayah` — pertanyaan data, ringkasan, tren, peta/list desa terverifikasi, definisi/sumber/periode.
5. `Informasi Publik /informasi-publik` — standar, maklumat, profil organisasi, kinerja, PPID resmi, pengaduan, laporan yang memang berwenang dipublikasikan.
6. Tombol utilitas `Kantor Virtual /office` — wajib autentikasi/role guard produksi; pada prototipe hanya demo, belum ada login.

Footer melengkapi identitas kelembagaan, jalur pengaduan dan dokumen, kontak dan lokasi terverifikasi, kebijakan privasi, aksesibilitas, sumber & tanggal pembaruan.

## Sitemap detail
```
/
├─ /layanan
│  ├─ /layanan/:slug (syarat, jadwal, tarif, prosedur, dokumen, update)
│  └─ /jadwal (filter unit/hari, sumber resmi)
├─ /program
│  └─ /program/:slug
│     ├─ kegiatan/agendas (calendar)
│     ├─ layanan-terkait
│     └─ indikator-terkait
├─ /kesehatan-wilayah
│  ├─ /indikator/:slug (overview, tren, wilayah, metode, metadata)
│  └─ /metodologi
├─ /informasi-publik
│  ├─ /standar-pelayanan; /maklumat
│  ├─ /profil; /kinerja; /dokumen
│  ├─ /ppid (tautan unit resmi); /pengaduan
│  └─ /informasi-darurat
├─ /berita/:slug; /agenda/:slug; /edukasi/:slug
└─ /office [AUTH]
   ├─ /overview; /pelayanan; /program-pws
   ├─ /kepegawaian; /kpi (sesuai role)
   ├─ /cms; /kualitas-data; /integrasi
   └─ /audit [admin/security]
```

## User journeys
**Warga mencari layanan:** Search/quick card → detail HTML → persyaratan, jadwal, tarif resmi → kontak/pendaftaran terverifikasi → navigasi alamat. Jika booking belum diizinkan, hanya tampil kontak resmi dan tidak ada tombol booking palsu.

**Pimpinan ditanya kondisi kesehatan:** Health Insights → pilih pertanyaan (CKG/KIA/PTM/PWS) → KPI agregat → periode/denominator → tren dan wilayah → keterangan data + unduh laporan yang telah disetujui. Jika dataset belum siap, 'belum tersedia' + alasan + pemilik tindak lanjut; jangan munculkan chart rekaan.

**Petugas melakukan kerja:** Sign-in via identity provider yang disetujui → beranda berbasis peran → penugasan → tautan/adapter ke aplikasi sumber → ringkasan operasional. Jangan menambah second login palsu dalam portal publik.

**Warga mencari dokumen pemerintah:** Informasi Publik → kategori → ringkasan HTML → PDF resmi yang berlaku → tautan PPID induk jika bukan kewenangan Puskesmas.

## Search content model
Satu indeks pencarian publik mengindeks judul, sinonim, keyword, dan deskripsi dari layanan, program, pengumuman, edukasi, dan dokumen **yang sudah terbit**. Jangan indeks nama/NIK pasien, data pegawai, path dokumen draft, dan detail internal. Sediakan pencarian salah eja ringan hanya jika teruji, bukan query lintas koleksi mentah.

## Mobile navigation
Logo lembaga + CTA kantor virtual berupa ikon berlabel aksesibel + tombol menu. Menu fullscreen/stacked dengan close, fokus terkelola, Escape, trap fokus jika berbentuk dialog; teks min 14–16 px untuk isi nyata, tombol min ~44 px. Pintu masuk hotline dan jadwal harus berada dalam halaman, tidak disembunyikan di footer.
