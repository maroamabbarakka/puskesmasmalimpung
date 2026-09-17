# 11 — QA REPORT & HANDOFF CHECKLIST

## Target smoke test
- Keenam halaman dapat diaktifkan di viewport desktop 1440×900, tablet 820×1180, mobile 390×844.
- Hanya satu halaman aktif per waktu.
- Tidak terjadi horizontal overflow pada ketiga viewport.
- Screenshot menggunakan full_page=True, bukan viewport cropping.
- Katalog layanan awal menampilkan enam contoh; pencarian 'gigi' memfilter satu; reset mengembalikan enam; detail CKG dibuka/ditutup.
- Pilihan topik PTM mengubah title dan kembali CKG; indikator tetap '—' (tidak mengarang angka).
- Kantor virtual empat kartu indikator semuanya '—'.
- Menu mobile membuka dan dapat bernavigasi.
- Tidak ada JS pageerrors pada pengujian.

## Hasil aktual
Dijalankan melalui `prototype/capture_qa.py` pada Chromium headless. 18 screenshot tersimpan pada `fullpage/`, enam routes × tiga viewport, seluruh pemeriksaan di atas **lulus**. Dimensi tinggi screenshot aktual sesuai tinggi halaman masing-masing; beranda desktop 1440×5682 dan beranda mobile 390×7410. Data ditampilkan sebagai placeholder jujur.

## Catatan runner
Lingkungan QA container memblokir navigasi `file://` maupun HTTP localhost melalui browser administrator. Runner mengatasi pembatasan tersebut dengan memuat HTML dan meng-inline CSS/JS **hanya saat proses capture** melalui Playwright `set_content`. File prototipe normal tetap berupa tiga berkas `index.html`, `style.css`, `app.js` yang saling mereferensikan dan dapat dijalankan dari server lokal pada lingkungan developer. Ini bukan bukti deploy atau konektivitas publik.

## Batas pengujian
Tidak ada user research, audit animasi langsung Mekari, audit WCAG AA penuh, Lighthouse field performance, uji situs resmi, API, login, Firestore rules, penetration testing, data quality klinis, RME, ASIK, GIS resmi, PSE atau audit PPID. Uji pada 320 px, 360 px, browser Safari dan low-end Android masih masuk backlog. Penilaian handoff harus memahami status tersebut.

## UAT to-do sebelum signoff desain
[ ] CEO/pimpinan menerima hero dan bahasa layanan; [ ] Puskesmas mengonfirmasi logo dan narasi; [ ] warga/petugas uji finding layanan dengan HP; [ ] legal/PPID validasi menu transparansi; [ ] nakes konfirmasi kategori layanan dan program; [ ] pemilik indikator menyetujui semantics; [ ] security approve pemisahan kantor virtual; [ ] foto/video asli dan izin tersedia; [ ] developer membuktikan CLS/INP/LCP target; [ ] backup, rollback, dan production acceptance.
