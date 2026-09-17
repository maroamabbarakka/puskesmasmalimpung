# 03 — UI/UX, MOTION, DESIGN TOKENS & RESPONSIVENESS

## Visual direction
Dua register: publik 'human editorial' dan office 'quiet productive'. Keduanya memakai sistem warna dan typographic identity yang sama, tetapi office padat data dan tidak membawa dekorasi hero yang berlebihan. Ini meniru *prinsip* pengemasan ekosistem platform modern; bukan desain turunan identitas Mekari.

## Tokens konsep
| Token | Nilai konsep | Penggunaan |
|---|---|---|
| forest-900 | `#103E38` | Hero, CTA premium, section feature |
| forest-950 | `#092824` | Footer, kontras |
| jade-600 | `#18856F` | Fokus visual, state aktif; uji kontras akhir |
| mint-100 | `#D9F4E9` | Feature, icon surface |
| warm-100 | `#FFF0D8` | Program edukasi |
| sky-100 | `#E3EAF8` | KIA / keluarga |
| surface | `#FCFDFB` | Canvas |
| ink | `#183833` | Isi teks |
| muted | `#657C74` | Teks sekunder, perlu audit kontras |
| border | `#DFEAE3` | Pemisah halus |

Font prototipe menggunakan font sistem (Inter bila tersedia, Segoe UI, Arial) dan Georgia italic. Ganti hanya melalui font yang memiliki lisensi sah; jangan memasukkan atau mendistribusikan file font tanpa izin. Logo prototipe hanyalah simbol konsep, harus diganti dengan identitas resmi yang divalidasi.

## Desktop 1440
Header 93 px, content max 1280 px, multi-column asymmetric. Hero 2 kolom: storytelling kiri 52%, ilustrasi konseptual kanan 48%. Section berikut mengganti ritme: service actions bento, split dark panel, program asymmetric cards, orbit/ecosystem, editorial masonry, CTA, footer. Informasi Publik adalah lapisan penting tetapi tidak mengambil alih hero.

## Tablet 820
Header compact + menu, hero dua kolom lebih sempit; quick cards dua kolom; internal office sidebar ringkas. Jangan meniru desktop dengan scale CSS keseluruhan. Pastikan button labels tidak terpotong dan card text wraps. Peta/grafik harus punya fallback list.

## Mobile 390 (plus 320 acceptance)
Hero teks dahulu, ilustrasi berikutnya; CTA wrap; cards prioritas 2 kolom tetapi detail layanan 1 kolom; program utama full width, dua program lainnya 2 kolom; data cards ditumpuk sesuai konteks; office sidebar disembunyikan dan **wajib diganti navigasi role-based** sebelum produksi. Sticky header tidak boleh menutupi heading saat anchor navigation. Jangan memakai hover-only interactions.

## Motion specification
- Hero ambient float: 5–8 detik ease-in-out; dekorasi boleh berulang karena tidak membawa informasi kritis. Semua disabled pada prefers-reduced-motion.
- Hover lift: 2–6px / 200–280 ms pada pointer perangkat desktop; tidak menjadi satu-satunya indikator fokus.
- Reveal scroll: maksimal 300–550 ms, offset <=20px, tidak menunda keterbacaan; konten tetap tersedia jika JS gagal.
- Pergantian filter: instant atau <=180 ms; jangan transition layout besar yang membuat lompatan.
- Angka statistik: **tidak ada fake count-up**; pembaruan data asli secara periodik dengan label timestamp, jangan flash ketika berganti.
- Map/diagram: prefer lightweight SVG/canvas dan progressive enhancement; hentikan animasi di background atau reduced motion.

## Performance budget target (untuk implementasi, bukan hasil prototipe)
LCP <= 2.5 s p75 pada pengukuran field, CLS <= 0.1, INP <=200 ms; evaluasi dengan data lapangan, bukan mengklaim mockup telah mencapai target. Hero media format WebP/AVIF srcset lazy except LCP, image aspect-ratio fixed, font-display swap bila memakai webfont. Jangan memasang video autoplay berat demi estetika. Jika jaringan lemah, render HTML layanan terlebih dahulu.

## Aksesibilitas QA
WCAG 2.2 AA sebagai target; screen reader semantics, heading order, labels, focus visible, keyboard operation, no text in screenshots as only source, contrast 4.5:1 body text, icons with accompanying labels, 200% text zoom, reflow 320 CSS pixels. User setting reduced motion honored. Jangan menyebut prototype WCAG-conformant tanpa audit manual dan automated.

## Aturan empty/loading/error
- Empty: 'Belum tersedia' dengan alasan dan rencana tindakan; bukan 0.
- Loading: skeleton yang tidak menyerupai angka nyata; spinner time limit dengan message.
- Stale: 'Pembaruan terakhir ... / sumber terlambat' tanpa memutus akses ke snapshot lama yang masih diizinkan.
- Error: teks manusiawi, nomor referensi gangguan non-sensitif, tidak membeberkan URL internal atau stack trace.
- Unsynced: 'Belum tersinkron ke sistem tujuan' bahkan jika file Excel berhasil diunduh.

## Keputusan visual aset
Ilustrasi gedung, staf, peta dalam mockup adalah bentuk generik, bukan penggambaran akurat fisik Malimpung. Sebelum implementasi pakai foto aset fasilitas/kegiatan dengan izin dan inventaris lisensi; peta resmi berasal dari boundary tervalidasi. Jangan gunakan foto pasien sebagai dekorasi tanpa dasar/persetujuan.
