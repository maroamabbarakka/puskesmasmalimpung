/**
 * PUSKESMAS MALIMPUNG — HEALTH HUB V2
 * Arsitektur Frontend & CMS State Engine
 * Tanggal: 17 September 2026
 */

'use strict';

// ---------------------------------------------------------------------------
// 1. DATA MASTER AWAL (DEFAULT STATE)
// ---------------------------------------------------------------------------
const DEFAULT_SERVICES = [
  {
    id: 'umum',
    group: 'umum',
    tag: 'PELAYANAN DASAR',
    name: 'Pemeriksaan Umum',
    text: 'Pelayanan pemeriksaan medis umum, diagnosis, pengobatan dasar, dan rujukan tingkat lanjut.',
    icon: 'ic-heart',
    requirements: 'KTP/KK asli/fotokopi, Kartu BPJS/JKN (jika memiliki), Buku Rekam Medis (untuk pasien ulangan).',
    preparation: 'Membawa kartu identitas resmi dan obat-obatan yang sedang dikonsumsi.',
    procedure: '1. Pendaftaran di loket → 2. Pengukuran tanda vital (tensi/nadi/suhu) → 3. Konsultasi dokter → 4. Pemeriksaan fisik → 5. Penerimaan resep/tindakan → 6. Pengambilan obat di farmasi.',
    duration: '15 – 30 Menit (sesuai antrean)',
    cost: 'Gratis bagi seluruh peserta BPJS/JKN aktif; Non-BPJS Rp 15.000 (sesuai Perda Kab. Pinrang).',
    schedule: 'Senin – Sabtu: 08.00 – 14.00 WITA (Registrasi 08.00 – 12.00 WITA)',
    location: 'Ruang Poli Umum, Lantai 1 Puskesmas Induk Malimpung',
    legalBasis: 'Permenkes No. 19 Tahun 2024 tentang Puskesmas & SK Kapus No. 04/PKM-MLP/2026',
    verifiedDate: '17 September 2026'
  },
  {
    id: 'kia',
    group: 'keluarga',
    tag: 'IBU & ANAK',
    name: 'Kesehatan Ibu dan Anak (KIA)',
    text: 'Pemeriksaan kehamilan (ANC terpadu), USG dasar oleh dokter, nifas, imunisasi balita, dan KB.',
    icon: 'ic-baby',
    requirements: 'Buku KIA (Kesehatan Ibu dan Anak), KTP ibu/suami, Kartu BPJS/JKN.',
    preparation: 'Bagi ibu hamil, sarapan ringan sebelum pemeriksaan dan membawa Buku KIA.',
    procedure: '1. Registrasi loket KIA → 2. Penimbangan & ukur LILA → 3. Pemeriksaan kehamilan standar 10T → 4. Konsultasi dokter & gizi → 5. Penyerahan vitamin penambah darah.',
    duration: '20 – 45 Menit',
    cost: 'Gratis bagi peserta BPJS/JKN aktif dan program prioritas penurunan AKI/AKB.',
    schedule: 'Senin – Sabtu: 08.00 – 14.00 WITA (Jadwal USG Terjadwal)',
    location: 'Ruang Poli KIA & KB, Lantai 1',
    legalBasis: 'Permenkes No. 21 Tahun 2021 & Permenkes No. 19 Tahun 2024',
    verifiedDate: '17 September 2026'
  },
  {
    id: 'gigi',
    group: 'umum',
    tag: 'KESEHATAN GIGI',
    name: 'Gigi dan Mulut',
    text: 'Pemeriksaan kesehatan gigi, penambalan sementara/tetap, pembersihan karang, dan pencabutan gigi.',
    icon: 'ic-shield',
    requirements: 'KTP/KK, Kartu BPJS/JKN aktif.',
    preparation: 'Menyikat gigi sebelum datang berkunjung ke poli gigi.',
    procedure: '1. Pendaftaran → 2. Pemeriksaan rongga mulut → 3. Tindakan medis gigi sesuai indikasi → 4. Edukasi perawatan gigi dan resep.',
    duration: '20 – 40 Menit per tindakan',
    cost: 'Ditanggung BPJS Kesehatan sesuai indikasi medis; Tindakan khusus sesuai Perda Kab. Pinrang.',
    schedule: 'Senin – Jumat: 08.00 – 13.30 WITA',
    location: 'Ruang Poli Gigi, Lantai 1',
    legalBasis: 'Standar Pelayanan Kedokteran Gigi Kemenkes RI',
    verifiedDate: '17 September 2026'
  },
  {
    id: 'ckg',
    group: 'preventif',
    tag: 'DETEKSI DINI',
    name: 'Cek Kesehatan Gratis (CKG)',
    text: 'Program deteksi dini faktor risiko kesehatan gratis bagi masyarakat yang berulang tahun.',
    icon: 'ic-activity',
    requirements: 'KTP/Identitas kependudukan dengan NIK yang valid.',
    preparation: 'Warga yang berulang tahun dianjurkan berpuasa 8-10 jam jika dijadwalkan skrining gula darah puasa.',
    procedure: '1. Verifikasi NIK & tanggal lahir di loket CKG → 2. Skrining kuesioner risiko → 3. Pengukuran antropometri & tensi → 4. Pemeriksaan penunjang CKG → 5. Konseling dokter.',
    duration: '30 – 45 Menit',
    cost: 'Gratis 100% (Program Prioritas Nasional Kementerian Kesehatan RI 2026).',
    schedule: 'Senin – Sabtu: 08.30 – 13.00 WITA',
    location: 'Poli Skrining CKG Terpadu',
    legalBasis: 'Kepmenkes HK.01.07/MENKES/84/2026 tentang Program Cek Kesehatan Gratis',
    verifiedDate: '17 September 2026'
  },
  {
    id: 'lab',
    group: 'penunjang',
    tag: 'PENUNJANG',
    name: 'Pemeriksaan Laboratorium',
    text: 'Layanan laboratorium darah lengkap, gula darah, asam urat, kolesterol, sputum TB, dan tes urin.',
    icon: 'ic-chart',
    requirements: 'Surat rujukan atau formulir permintaan laboratorium dari dokter pemeriksa.',
    preparation: 'Puasa sesuai jenis pemeriksaan yang diminta oleh dokter.',
    procedure: '1. Penyerahan formulir di ruang lab → 2. Pengambilan sampel darah/spesimen → 3. Proses analisis laboratorium → 4. Penyerahan hasil ke dokter pengirim.',
    duration: '20 – 60 Menit (tergantung parameter uji)',
    cost: 'Ditanggung BPJS sesuai rujukan medis dokter Puskesmas; Umum sesuai tarif Perda.',
    schedule: 'Senin – Sabtu: 08.00 – 13.00 WITA (Layanan Cito/UGD 24 Jam)',
    location: 'Laboratorium Medik Puskesmas Malimpung',
    legalBasis: 'Permenkes No. 37 Tahun 2012 tentang Laboratorium Puskesmas',
    verifiedDate: '17 September 2026'
  },
  {
    id: 'obat',
    group: 'penunjang',
    tag: 'PENUNJANG',
    name: 'Farmasi & Informasi Obat',
    text: 'Penyiapan resep obat, konseling penggunaan obat rasional, edukasi antibiotik, dan obat kronis.',
    icon: 'ic-doc',
    requirements: 'Lembar resep resmi dari dokter pemeriksa Puskesmas Malimpung.',
    preparation: 'Menyiapkan wadah obat bila diperlukan dan menyimak penjelasan apoteker.',
    procedure: '1. Penyerahan resep di loket farmasi → 2. Skrining administrasi & farmasetis resep → 3. Penyiapan dan peracikan obat → 4. Penyerahan obat disertai Informasi Obat (PIO).',
    duration: '10 – 20 Menit (resep non-racikan)',
    cost: 'Gratis bagi resep pasien BPJS dan program SPM pemerintah.',
    schedule: 'Senin – Sabtu: 08.00 – 14.00 WITA (UGD 24 Jam)',
    location: 'Instalasi Farmasi, Lantai 1',
    legalBasis: 'Permenkes No. 74 Tahun 2016 tentang Pelayanan Kefarmasian di Puskesmas',
    verifiedDate: '17 September 2026'
  }
];

// DATASET REALTIME CKG TERSANJUNG PUSKESMAS MALIMPUNG (LAMPIRAN RESMI APLIKASI CKG)
const CKG_REALTIME_DATA = {
  total_skrining: 1371,
  laki_laki: 419,
  perempuan: 951,
  demografi_usia: [
    { label: 'Balita (0-5 th)', count: 10, percent: '1%' },
    { label: 'Anak (6-11 th)', count: 520, percent: '38%' },
    { label: 'Remaja (12-18 th)', count: 68, percent: '5%' },
    { label: 'Dewasa (19-59 th)', count: 661, percent: '48%' },
    { label: 'Lansia (60+ th)', count: 111, percent: '8%' }
  ],
  ptm: {
    hipertensi: 321,
    diabetes: 62,
    obesitas: 464,
    risiko_paru: 119,
    gangguan_mata: 1037,
    gangguan_telinga: 1037,
    mental: 17
  },
  capaian_dusun: [
    { dusun: 'Dusun Malimpung', wilayah: 'MALIMPUNG', kunjungan: 503, hipertensi: 101, diabetes: 14, risiko_lain: 631, target: '100%', status: 'OPTIMAL', coords: [-3.7315, 119.7360] },
    { dusun: 'Lingkungan Dioang', wilayah: 'MACCIRINNA', kunjungan: 367, hipertensi: 75, diabetes: 15, risiko_lain: 359, target: '100%', status: 'OPTIMAL', coords: [-3.7390, 119.7420] },
    { dusun: 'Dusun Pajalele', wilayah: 'MALIMPUNG', kunjungan: 159, hipertensi: 38, diabetes: 1, risiko_lain: 214, target: '100%', status: 'OPTIMAL', coords: [-3.7250, 119.7280] },
    { dusun: 'Dusun Palita', wilayah: 'MALIMPUNG', kunjungan: 110, hipertensi: 33, diabetes: 3, risiko_lain: 139, target: '100%', status: 'OPTIMAL', coords: [-3.7380, 119.7250] },
    { dusun: 'Dusun Padang', wilayah: 'PADANG LOANG', kunjungan: 84, hipertensi: 38, diabetes: 12, risiko_lain: 108, target: '100%', status: 'OPTIMAL', coords: [-3.7150, 119.7450] },
    { dusun: 'Lainnya', wilayah: 'LUAR WILAYAH', kunjungan: 52, hipertensi: 8, diabetes: 7, risiko_lain: 72, target: '100%', status: 'OPTIMAL', coords: [-3.7080, 119.7500] },
    { dusun: 'Dusun Banga', wilayah: 'PADANG LOANG', kunjungan: 42, hipertensi: 15, diabetes: 6, risiko_lain: 64, target: '100%', status: 'OPTIMAL', coords: [-3.7190, 119.7580] },
    { dusun: 'Lingkungan Paraungan', wilayah: 'MACCIRINNA', kunjungan: 38, hipertensi: 9, diabetes: 3, risiko_lain: 39, target: '100%', status: 'OPTIMAL', coords: [-3.7450, 119.7350] },
    { dusun: 'Lingkungan Bulu Dua', wilayah: 'MACCIRINNA', kunjungan: 16, hipertensi: 4, diabetes: 1, risiko_lain: 11, target: '80%', status: 'MENENGAH', coords: [-3.7510, 119.7480] }
  ]
};

const TOPIC_METRICS = {
  ckg: {
    title: 'Analitik Demografi & Skrining CKG Realtime',
    status: 'Data Realtime CKG TERSANJUNG',
    statusClass: 'verified',
    desc: 'Pemantauan sebaran indikator kesehatan warga dan deteksi dini Penyakit Tidak Menular (PTM) dari 1.371 total kunjungan di wilayah kerja Puskesmas Malimpung.',
    kpi1_label: 'Total Warga Diskrining',
    kpi1_val: '1.371',
    kpi1_sub: '419 Laki-laki • 951 Perempuan',
    kpi2_label: 'Kelompok Usia Dewasa & Anak',
    kpi2_val: '1.181',
    kpi2_sub: 'Dewasa 661 (48%) • Anak 520 (38%)',
    kpi3_label: 'Capaian 8 Dusun / Lingkungan',
    kpi3_val: '100%',
    kpi3_sub: '7 Wilayah Optimal (100%), 1 Menengah (80%)',
    updated: '17 September 2026'
  },
  kia: {
    title: 'Kesehatan Ibu, Bayi & Gizi Balita (KIA)',
    status: 'Data Terverifikasi PWS 2026',
    statusClass: 'verified',
    desc: 'Cakupan pelayanan antenatal (K4/K6) dan penimbangan balita di posyandu wilayah kerja binaan. Data dihimpun melalui kohort KIA dan sistem e-PPGBM.',
    kpi1_label: 'Cakupan K6 Ibu Hamil',
    kpi1_val: '94.1%',
    kpi1_sub: 'Kohort KIA terverifikasi',
    kpi2_label: 'Balita Datang Ditimbang (D/S)',
    kpi2_val: '96.4%',
    kpi2_sub: 'Rekapitulasi kader Posyandu',
    kpi3_label: 'Intervensi Balita Stunting',
    kpi3_val: '6.8%',
    kpi3_sub: 'Tren penurunan berkelanjutan',
    updated: '17 September 2026'
  },
  ptm: {
    title: 'Deteksi Dini Penyakit Tidak Menular (PTM)',
    status: 'Data Terverifikasi CKG TERSANJUNG',
    statusClass: 'verified',
    desc: 'Hasil skrining terpadu 1.371 pengunjung: Hipertensi 321 warga, Diabetes Melitus 62 warga, Obesitas 464 warga, Risiko Paru 119 warga, Gangguan Penglihatan 1.037 warga, Pendengaran 1.037 warga, dan Gangguan Jiwa 17 warga.',
    kpi1_label: 'Hipertensi Terdeteksi',
    kpi1_val: '321',
    kpi1_sub: 'Faktor risiko tekanan darah tinggi',
    kpi2_label: 'Diabetes Melitus Terdeteksi',
    kpi2_val: '62',
    kpi2_sub: 'Pemeriksaan kadar glukosa',
    kpi3_label: 'Obesitas Terdeteksi',
    kpi3_val: '464',
    kpi3_sub: 'Skrining IMT & lingkar perut',
    updated: '17 September 2026'
  },
  pws: {
    title: 'Pemantauan Wilayah Setempat (PWS) 6 Desa',
    status: 'Fasilitas & Wilayah Siaga',
    statusClass: 'verified',
    desc: 'Integrasi pemantauan status kesehatan dan kesiapan sarana fasyankes jejaring di 6 desa binaan wilayah kerja Kecamatan Patampanua.',
    kpi1_label: 'Desa Wilayah Binaan',
    kpi1_val: '6',
    kpi1_sub: 'Malimpung, Masolo, Benteng, dll.',
    kpi2_label: 'Jejaring Pustu & Poskesdes',
    kpi2_val: '6',
    kpi2_sub: 'Unit pelayanan pembantu aktif',
    kpi3_label: 'Kesiapan Respons KLB',
    kpi3_val: 'Siaga',
    kpi3_sub: 'Surveilans epidemiologi 24 jam',
    updated: '17 September 2026'
  }
};

const INITIAL_AUDIT_LOGS = [
  { time: '08.15', user: 'Admin Sistem', action: 'Inisialisasi Platform Hub V2', result: 'Baseline 6 Halaman & CMS Aktif' },
  { time: '08.30', user: 'dr. Hj. Kapus', action: 'Persetujuan Standar Pelayanan SP-01', result: 'Diterbitkan ke Publik' },
  { time: '08.45', user: 'Editor CMS', action: 'Verifikasi Jadwal Layanan CKG', result: 'Sinkronisasi Konten Selesai' }
];

// ---------------------------------------------------------------------------
// 2. STATE MANAGER & PERSISTENCE
// ---------------------------------------------------------------------------
let servicesState = [];
let auditLogsState = [];
let activeCategory = 'all';
let currentSearch = '';
let activeTopic = 'ckg';

function initStore() {
  const savedServices = localStorage.getItem('malimpung_services_v2');
  if (savedServices) {
    try {
      servicesState = JSON.parse(savedServices);
    } catch (e) {
      servicesState = [...DEFAULT_SERVICES];
    }
  } else {
    servicesState = [...DEFAULT_SERVICES];
  }

  const savedLogs = localStorage.getItem('malimpung_audit_v2');
  if (savedLogs) {
    try {
      auditLogsState = JSON.parse(savedLogs);
    } catch (e) {
      auditLogsState = [...INITIAL_AUDIT_LOGS];
    }
  } else {
    auditLogsState = [...INITIAL_AUDIT_LOGS];
  }
}

function saveServicesToStorage() {
  localStorage.setItem('malimpung_services_v2', JSON.stringify(servicesState));
}

function saveLogsToStorage() {
  localStorage.setItem('malimpung_audit_v2', JSON.stringify(auditLogsState));
}

// ---------------------------------------------------------------------------
// 3. UI RENDERING ENGINES
// ---------------------------------------------------------------------------
const icon = (name) => `<svg class="icon" style="width: 20px; height: 20px;" aria-hidden="true"><use href="#${name}"/></svg>`;

function escapeHTML(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderServices() {
  const grid = document.getElementById('service-grid');
  if (!grid) return;

  const q = currentSearch.trim().toLowerCase();
  const filtered = servicesState.filter(s => {
    const matchCategory = (activeCategory === 'all' || s.group === activeCategory);
    const matchQuery = !q || (
      s.name.toLowerCase().includes(q) ||
      s.text.toLowerCase().includes(q) ||
      s.tag.toLowerCase().includes(q) ||
      s.id.toLowerCase().includes(q)
    );
    return matchCategory && matchQuery;
  });

  const countEl = document.getElementById('service-count');
  const emptyEl = document.getElementById('service-empty');
  
  if (countEl) countEl.textContent = `Menampilkan ${filtered.length} layanan resmi`;
  if (emptyEl) emptyEl.style.display = filtered.length === 0 ? 'block' : 'none';

  grid.innerHTML = filtered.map(s => `
    <article class="service-card">
      <div class="service-card-top">
        <span class="service-tag">${escapeHTML(s.tag)}</span>
        <h3 class="service-title">${escapeHTML(s.name)}</h3>
        <p class="service-summary">${escapeHTML(s.text)}</p>
        <div class="service-meta-list">
          <div class="service-meta-item">
            <svg style="width: 14px; height: 14px; color: var(--jade-600);" aria-hidden="true"><use href="#ic-clock"/></svg>
            <span>${escapeHTML(s.schedule)}</span>
          </div>
          <div class="service-meta-item">
            <svg style="width: 14px; height: 14px; color: var(--jade-600);" aria-hidden="true"><use href="#ic-shield"/></svg>
            <span>${escapeHTML(s.cost)}</span>
          </div>
        </div>
      </div>
      <button class="btn-detail" data-service="${escapeHTML(s.id)}" aria-label="Lihat Rincian ${escapeHTML(s.name)}">
        <span>Lihat Detail Standar Pelayanan</span>
        <svg style="width: 16px; height: 16px;" aria-hidden="true"><use href="#ic-arrow"/></svg>
      </button>
    </article>
  `).join('');

  // Bind klik modal detail
  grid.querySelectorAll('[data-service]').forEach(btn => {
    btn.addEventListener('click', () => openServiceDetail(btn.dataset.service));
  });
}

function openServiceDetail(id, updateHash = true) {
  const service = servicesState.find(s => s.id === id);
  if (!service) return;

  const modal = document.getElementById('service-detail-modal');
  document.getElementById('modal-svc-title').textContent = service.name;
  document.getElementById('modal-svc-desc').textContent = service.text;
  document.getElementById('modal-svc-req').textContent = service.requirements;
  document.getElementById('modal-svc-prep').textContent = service.preparation;
  document.getElementById('modal-svc-proc').textContent = service.procedure;
  document.getElementById('modal-svc-duration').textContent = service.duration;
  document.getElementById('modal-svc-cost').textContent = service.cost;
  document.getElementById('modal-svc-loc').textContent = `${service.location} (${service.schedule})`;
  document.getElementById('modal-svc-legal').textContent = service.legalBasis;
  document.getElementById('modal-svc-verified').textContent = `${service.verifiedDate} oleh Penanggung Jawab Pelayanan`;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  if (updateHash) {
    history.replaceState(null, '', `#services/${id}`);
  }
}

function closeServiceDetail(updateHash = true) {
  const modal = document.getElementById('service-detail-modal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (updateHash && location.hash.startsWith('#services/')) {
    history.replaceState(null, '', '#services');
  }
}

function renderOfficeTables() {
  const serviceTable = document.getElementById('office-service-table');
  if (serviceTable) {
    serviceTable.innerHTML = servicesState.map(s => `
      <tr style="border-bottom: 1px solid var(--border-light);">
        <td style="padding: 0.625rem 0.5rem; font-family: monospace; font-weight: 700;">${escapeHTML(s.id)}</td>
        <td style="padding: 0.625rem 0.5rem; font-weight: 700; color: var(--forest-950);">${escapeHTML(s.name)}</td>
        <td style="padding: 0.625rem 0.5rem;"><span class="service-tag">${escapeHTML(s.group)}</span></td>
        <td style="padding: 0.625rem 0.5rem;"><span class="integrity-badge verified" style="font-size: 0.6875rem;">Terbit (Publik)</span></td>
        <td style="padding: 0.625rem 0.5rem;">
          <button class="btn-secondary" style="padding: 0.25rem 0.625rem; font-size: 0.75rem;" onclick="loadServiceToCms('${escapeHTML(s.id)}')">Edit CMS</button>
        </td>
      </tr>
    `).join('');
  }

  const auditTable = document.getElementById('office-audit-table');
  if (auditTable) {
    auditTable.innerHTML = auditLogsState.slice(0, 8).map(log => `
      <tr style="border-bottom: 1px solid var(--border-light);">
        <td style="padding: 0.625rem 0.5rem; color: var(--ink-secondary); font-size: 0.8125rem;">${escapeHTML(log.time)}</td>
        <td style="padding: 0.625rem 0.5rem; font-weight: 700; color: var(--forest-950); font-size: 0.8125rem;">${escapeHTML(log.user)}</td>
        <td style="padding: 0.625rem 0.5rem; font-size: 0.8125rem;">${escapeHTML(log.action)}</td>
        <td style="padding: 0.625rem 0.5rem; color: var(--emerald-600); font-weight: 600; font-size: 0.8125rem;">${escapeHTML(log.result)}</td>
      </tr>
    `).join('');
  }
}

function updateTopicView(topicKey) {
  const data = TOPIC_METRICS[topicKey];
  if (!data) return;

  activeTopic = topicKey;
  document.getElementById('topic-title').textContent = data.title;
  document.getElementById('topic-desc').textContent = data.desc;
  document.getElementById('topic-status-text').textContent = `Status: ${data.status}`;
  
  const badgeEl = document.getElementById('topic-badge');
  if (data.statusClass === 'verified') {
    badgeEl.className = 'integrity-badge verified';
  } else {
    badgeEl.className = 'integrity-badge';
  }

  document.getElementById('kpi-label-1').textContent = data.kpi1_label;
  document.getElementById('kpi-val-1').textContent = data.kpi1_val;
  document.getElementById('kpi-sub-1').textContent = data.kpi1_sub;

  document.getElementById('kpi-label-2').textContent = data.kpi2_label;
  document.getElementById('kpi-val-2').textContent = data.kpi2_val;
  document.getElementById('kpi-sub-2').textContent = data.kpi2_sub;

  document.getElementById('kpi-label-3').textContent = data.kpi3_label;
  document.getElementById('kpi-val-3').textContent = data.kpi3_val;
  document.getElementById('kpi-sub-3').textContent = data.kpi3_sub;

  document.getElementById('topic-last-updated').textContent = data.updated;

  document.querySelectorAll('[data-topic]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.topic === topicKey);
  });
}

// ---------------------------------------------------------------------------
// 4. DATABASE BERITA RESMI & ARTIKEL SINGLE POST
// ---------------------------------------------------------------------------
const NEWS_DATABASE = {
  'posyandu-terpadu-pajalele': {
    slug: 'posyandu-terpadu-pajalele',
    title: 'Puskesmas Malimpung Gelar Posyandu Terpadu di Dusun Pajalele',
    category: 'Kegiatan Fasyankes',
    date: '02 September 2026',
    readTime: '4 Menit Baca',
    author: 'Tim Promkes & KIA Puskesmas Malimpung',
    cover: 'assets/berita_posyandu.webp',
    caption: 'Pelayanan penimbangan balita presisi dan skrining kesehatan ibu hamil di Posyandu Melati Dusun Pajalele, Desa Malimpung.',
    excerpt: 'Pelayanan penimbangan balita, imunisasi dasar lengkap, pemeriksaan antenatal ibu hamil, serta penyuluhan gizi seimbang dilaksanakan bersama kader kesehatan di Posyandu Melati Dusun Pajalele.',
    contentHtml: `
      <p class="single-post-lead">
        Upaya percepatan penurunan angka stunting dan penguatan ketahanan kesehatan keluarga terus diakselerasi oleh UPT Puskesmas Malimpung. Bertempat di Posyandu Melati Dusun Pajalele, Desa Malimpung, tim pelayanan gabungan menggelar kegiatan Posyandu Terpadu berbasis Siklus Hidup yang menyasar balita, ibu hamil, serta kelompok usia rentan pada Rabu pagi (02/09/2026).
      </p>

      <h2>Pelayanan Antropometri Presisi & Imunisasi Lengkap</h2>
      <p>
        Sebanyak 48 balita dan 12 ibu hamil hadir memanfaatkan rangkaian pemeriksaan kesehatan tanpa dipungut biaya. Pelayanan yang diberikan mengacu pada standardisasi Kementerian Kesehatan RI terkini, meliputi:
      </p>
      <ul>
        <li><strong>Pengukuran Antropometri Terstandar:</strong> Penimbangan bobot badan dengan timbangan digital bayi berpresisi tinggi, pengukuran panjang badan/tinggi badan menggunakan infantometer dan stadiometer resmi Kemenkes.</li>
        <li><strong>Pencatatan Kohort Real-Time:</strong> Integrasi pencatatan buku KIA fisik ke dalam sistem elektronik e-PPGBM dan SATUSEHAT guna mendeteksi deviasi kurva pertumbuhan secara instan.</li>
        <li><strong>Imunisasi Dasar & Lanjutan:</strong> Pemberian vaksin BCG, DPT-HB-Hib, Polio tetes/suntik (IPV), serta Campak-Rubella (MR) bagi bayi yang telah memasuki jadwal imunisasi.</li>
        <li><strong>Edukasi Gizi & Distribusi PMT Pangan Lokal:</strong> Pembagian Pemberian Makanan Tambahan (PMT) berbasis pangan lokal kaya protein hewani (telur, ikan, dan kacang-kacangan) serta konseling menyusui eksklusif bagi ibu menyusui.</li>
      </ul>

      <blockquote class="single-post-quote">
        "Posyandu bukan lagi sekadar rutinitas timbang badan bulanan, melainkan garda terdepan sistem surveilans kesehatan masyarakat di tingkat dusun. Dengan Integrasi Layanan Primer (ILP), setiap kali ditemukan balita yang kurvanya mendatar atau beratnya tidak naik (T), tim medis puskesmas langsung mengambil langkah rujukan dan tata laksana gizi spesifik hari itu juga."
        <cite>— Bidan Koordinator Puskesmas Malimpung</cite>
      </blockquote>

      <h2>Sinergi Bersama Kader & Pemantauan Door-to-Door</h2>
      <p>
        Kelancaran kegiatan Posyandu Terpadu ini tidak lepas dari dedikasi 5 kader kesehatan Dusun Pajalele yang proaktif mendampingi warga sejak pagi hari. Kader juga melakukan aksi sweeping atau kunjungan rumah <em>(door-to-door)</em> bagi keluarga yang berhalangan hadir karena kendala pekerjaan bertani atau jarak pemukiman.
      </p>
      <p>
        Melalui kolaborasi erat antara tenaga kesehatan profesional, kader posyandu, dan pemerintah desa, Puskesmas Malimpung berkomitmen menjaga cakupan pemantauan tumbuh kembang balita dan kesehatan ibu hamil di atas 95% demi mewujudkan generasi emas Pinrang yang sehat, cerdas, dan bebas stunting.
      </p>
    `
  },
  'edukasi-phbs-sekolah-dasar': {
    slug: 'edukasi-phbs-sekolah-dasar',
    title: 'Edukasi PHBS dan Cuci Tangan Pakai Sabun di SD Binaan',
    category: 'Promosi Kesehatan',
    date: '28 Agustus 2026',
    readTime: '3 Menit Baca',
    author: 'Unit Promosi Kesehatan & UKS Puskesmas Malimpung',
    cover: 'assets/berita_phbs.webp',
    caption: 'Petugas Promosi Kesehatan memandu praktik 6 langkah cuci tangan pakai sabun bersama murid sekolah dasar binaan di Patampanua.',
    excerpt: 'Petugas Promosi Kesehatan Puskesmas Malimpung memberikan penyuluhan cuci tangan pakai sabun, konsumsi jajanan sehat di kantin sekolah, dan sikat gigi massal bersama siswa sekolah dasar binaan.',
    contentHtml: `
      <p class="single-post-lead">
        Membangun fondasi perilaku hidup bersih dan sehat (PHBS) sejak usia dini merupakan investasi strategis kesehatan jangka panjang. Tim Promosi Kesehatan (Promkes) dan Pembina Usaha Kesehatan Sekolah (UKS) Puskesmas Malimpung melaksanakan kampanye edukasi interaktif dan aksi cuci tangan bersama di halaman sekolah dasar binaan di wilayah Kecamatan Patampanua (28/08/2026).
      </p>

      <h2>Praktik 6 Langkah Cuci Tangan Pakai Sabun (CTPS)</h2>
      <p>
        Lebih dari 120 siswa kelas 1 hingga kelas 6 mengikuti kegiatan ini dengan penuh antusiasme. Menggunakan sarana wastafel air mengalir dan sabun busa higienis, para siswa diajarkan secara langsung metode 6 langkah CTPS standar WHO:
      </p>
      <ol>
        <li>Menggosok kedua telapak tangan dengan sabun hingga merata.</li>
        <li>Menggosok punggung tangan kiri dengan telapak tangan kanan dan sebaliknya.</li>
        <li>Menggosok sela-sela jari tangan secara menyeluruh.</li>
        <li>Membersihkan ujung jari dengan posisi tangan saling mengunci.</li>
        <li>Menggosok dan memutar ibu jari secara bergantian.</li>
        <li>Memutar ujung jari dan kuku di atas telapak tangan untuk mengangkat kotoran tersembunyi.</li>
      </ol>

      <blockquote class="single-post-quote">
        "Mencuci tangan pakai sabun di air mengalir terbukti secara ilmiah mampu menurunkan risiko penyakit diare hingga 40% dan infeksi saluran pernapasan akut (ISPA) hingga 25% pada anak usia sekolah. Kami mengemas edukasi ini dengan nyanyian dan simulasi langsung agar anak-anak terbiasa menjadikannya budaya harian."
        <cite>— Petugas Penyuluh Promosi Kesehatan Puskesmas Malimpung</cite>
      </blockquote>

      <h2>Pemeriksaan Kantin Sehat & Kesehatan Gigi</h2>
      <p>
        Selain praktik cuci tangan, petugas sanitarian puskesmas juga melakukan inspeksi keamanan pangan pada kantin sekolah, mengedukasi pedagang untuk menghindari bahan pengawet berbahaya, serta membagikan sikat gigi dan pasta gigi berfluoride kepada seluruh siswa yang hadir.
      </p>
      <p>
        Pihak sekolah mengapresiasi kehadiran rutin tim medis puskesmas. Program pembinaan berkelanjutan ini diharapkan mampu menurunkan angka absensi sakit siswa dan membentuk lingkungan belajar yang higienis serta berdaya sehat.
      </p>
    `
  },
  'kunjungan-rumah-perkesmas': {
    slug: 'kunjungan-rumah-perkesmas',
    title: 'Kunjungan Rumah Program Perawatan Kesehatan Masyarakat',
    category: 'Layanan Lapangan',
    date: '20 Agustus 2026',
    readTime: '4 Menit Baca',
    author: 'Tim Perkesmas UPT Puskesmas Malimpung',
    cover: 'assets/berita_bumil.webp',
    caption: 'Perawat Perkesmas Puskesmas Malimpung melakukan pemeriksaan tanda vital dan konsultasi kesehatan berkala di kediaman lansia binaan.',
    excerpt: 'Bidan desa bersama perawat perkesmas melakukan kunjungan langsung (home visit) untuk memantau kesehatan lansia dan keluarga berisiko tinggi di wilayah kerja pedesaan Malimpung.',
    contentHtml: `
      <p class="single-post-lead">
        Mendekatkan layanan kesehatan langsung ke pangkuan warga yang memiliki keterbatasan mobilitas fisik merupakan mandat utama Program Perawatan Kesehatan Masyarakat (Perkesmas). Tim perawat dan bidan desa UPT Puskesmas Malimpung mengintensifkan kunjungan rumah <em>(home visit)</em> ke pemukiman warga di Desa Padang Loang dan Kelurahan Maccirinna (20/08/2026).
      </p>

      <h2>Fokus Pelayanan Pasien Kronis & Lansia Resti</h2>
      <p>
        Dalam agenda kunjungan lapangan ini, tim tenaga kesehatan menyambangi rumah-rumah keluarga berisiko tinggi (resti), penderita hipertensi menahun, diabetes melitus, pasien pasca-stroke, serta warga lansia yang hidup sebatang kara. Pelayanan yang diberikan di tempat meliputi:
      </p>
      <ul>
        <li><strong>Pemeriksaan Tanda Vital & Antropometri:</strong> Pengukuran tekanan darah, saturasi oksigen darah (SpO2), frekuensi pernapasan, serta pemantauan indeks massa tubuh.</li>
        <li><strong>Pemeriksaan Laboratorium Sederhana (Point-of-Care):</strong> Uji glukosa darah sewaktu, asam urat, dan kolesterol bagi pasien diabetes dan penyakit kardiovaskular.</li>
        <li><strong>Edukasi Kepatuhan Minum Obat:</strong> Rekonsiliasi obat hipertensi dan antidiabetes agar dikonsumsi sesuai dosis instruksi dokter tanpa jeda putus obat.</li>
        <li><strong>Asesmen Sanitasi Tempat Tinggal:</strong> Memberikan masukan terkait ventilasi kamar tidur lansia, pencahayaan, dan pencegahan risiko lantai licin guna menghindari cedera patah tulang panggul.</li>
      </ul>

      <blockquote class="single-post-quote">
        "Bagi kami di Puskesmas Malimpung, jarak pemukiman yang jauh dan medan pedesaan bukanlah hambatan. Melalui Perkesmas, kami hadir memastikan tidak ada warga kami yang tertinggal dalam mendapatkan hak pelayanan medis dasar. Kehangatan sapaan dan sentuhan medis yang tulus menjadi obat penyemangat bagi para lansia kita."
        <cite>— Penanggung Jawab Program Perkesmas Puskesmas Malimpung</cite>
      </blockquote>

      <h2>Rencana Perawatan Berkelanjutan</h2>
      <p>
        Setiap hasil pemeriksaan rumah dicatat ke dalam rekam medis keluarga terpadu (Family Folder) dan dipantau bersama bidan desa. Keluarga pasien diberikan nomor kontak darurat UGD 24 Jam Puskesmas Malimpung jika sewaktu-waktu membutuhkan ambulans siaga atau rujukan gawat darurat.
      </p>
    `
  },
  'lokakarya-lintas-sektor-stunting': {
    slug: 'lokakarya-lintas-sektor-stunting',
    title: 'Lokakarya Mini Lintas Sektor untuk Pencegahan Stunting Terpadu',
    category: 'Manajemen Mutu',
    date: '15 Agustus 2026',
    readTime: '5 Menit Baca',
    author: 'Bagian Tata Usaha & Manajemen Mutu Puskesmas Malimpung',
    cover: 'assets/berita_stunting.webp',
    caption: 'Suasana Rapat Koordinasi Lokakarya Mini Lintas Sektor Stunting dipimpin unsur Camat, Kepala Puskesmas, dan tokoh penggerak di aula pertemuan.',
    excerpt: 'Rapat koordinasi lintas sektor bersama pihak Kecamatan Patampanua, aparat desa, Babinsa, Bhabinkamtibmas, serta PKK guna memperkuat pendampingan keluarga berisiko stunting di seluruh desa binaan.',
    contentHtml: `
      <p class="single-post-lead">
        Penuntasan masalah stunting membutuhkan komitmen konvergensi terpadu yang melibatkan seluruh elemen pemangku kepentingan lintas sektoral. UPT Puskesmas Malimpung menggelar Lokakarya Mini (Lokmin) Triwulanan Lintas Sektor bertajuk "Aksi Kolaboratif Terpadu Mewujudkan Zero New Stunting di Wilayah Malimpung" yang diselenggarakan di Aula Pertemuan Fasyankes (15/08/2026).
      </p>

      <h2>Forum Musyawarah & Analisis Data Berbasis Geospasial</h2>
      <p>
        Pertemuan strategis ini dihadiri oleh Camat Patampanua, jajaran Kepala Desa Malimpung, Desa Padang Loang, Lurah Maccirinna, Danramil/Babinsa, Kapolsek/Bhabinkamtibmas, Tim Penggerak PKK Kecamatan dan Desa, penyuluh KB, serta tokoh agama dan tokoh masyarakat setempat.
      </p>
      <p>
        Dalam sesi pemaparan, Kepala Puskesmas Malimpung menyajikan evaluasi indikator Standar Pelayanan Minimal (SPM) dan mendemonstrasikan integrasi peta geospasial <em>Health Atlas</em> yang memetakan titik sebaran keluarga sasaran, sumber air bersih, serta posyandu aktif. Berdasarkan data evaluasi triwulan II 2026, angka intervensi gizi terpadu berhasil menekan tren prevalensi balita stunting di wilayah kerja hingga menyentuh angka 6.8%.
      </p>

      <blockquote class="single-post-quote">
        "Penanganan stunting bukan hanya tugas sektor kesehatan, melainkan 70% ditentukan oleh intervensi sensitif seperti sanitasi layak, ketersediaan air bersih, dan ketahanan pangan keluarga. Sinergi anggaran dana desa dan program kesehatan puskesmas adalah kunci keberhasilan nyata kita di lapangan."
        <cite>— Camat Patampanua Kabupaten Pinrang</cite>
      </blockquote>

      <h2>Rencana Tindak Lanjut (RTL) Semester II 2026</h2>
      <p>
        Lokakarya mini menghasilkan beberapa kesepakatan rencana aksi konkret, antara lain:
      </p>
      <ul>
        <li>Pengalokasian dana desa untuk program jambanisasi sehat bagi 18 keluarga pra-sejahtera di wilayah pedesaan.</li>
        <li>Penyelenggaraan Dapur Sehat Atasi Stunting (DASHAT) secara bergilir di balai posyandu dusun.</li>
        <li>Pemeriksaan kesehatan gratis bagi calon pengantin (catin) minimal 3 bulan sebelum pernikahan untuk skrining anemia dan status gizi.</li>
        <li>Optimalisasi peran Babinsa dan Bhabinkamtibmas dalam pendampingan distribusi bantuan pangan bergizi.</li>
      </ul>
      <p>
        Acara ditutup dengan penandatanganan Berita Acara Komitmen Bersama Rencana Tindak Lanjut Triwulan III oleh seluruh unsur pimpinan lintas sektor, menandai kesiapsiagaan bersama dalam mengawal generasi masa depan yang sehat dan unggul.
      </p>
    `
  }
};

// ---------------------------------------------------------------------------
// 5. ROUTING & NAVIGATION (DENGAN DUKUNGAN SINGLE POST BERITA & DEEP-LINKING)
// ---------------------------------------------------------------------------
const VALID_ROUTES = ['home', 'services', 'programs', 'insights', 'public', 'office', 'news', 'news-detail'];

let previousPageBeforeNews = 'news';

function openNewsDetail(slug, pushHistory = true) {
  const article = NEWS_DATABASE[slug] || NEWS_DATABASE['posyandu-terpadu-pajalele'];
  if (!article) return;

  // Catat halaman asal untuk tombol kembali
  const currentActivePage = document.querySelector('.page.active');
  if (currentActivePage && currentActivePage.id !== 'page-news-detail') {
    previousPageBeforeNews = currentActivePage.id.replace('page-', '');
  }

  // Isi data single post
  const titleEl = document.getElementById('single-news-title');
  const crumbEl = document.getElementById('single-news-crumb-title');
  const badgeEl = document.getElementById('single-news-badge');
  const readTimeEl = document.getElementById('single-news-read-time');
  const authorEl = document.getElementById('single-news-author');
  const dateEl = document.getElementById('single-news-date');
  const coverEl = document.getElementById('single-news-cover');
  const captionEl = document.getElementById('single-news-caption');
  const bodyEl = document.getElementById('single-news-body');
  const btnBackText = document.getElementById('btn-back-text');

  if (titleEl) titleEl.textContent = article.title;
  if (crumbEl) crumbEl.textContent = article.title;
  if (badgeEl) badgeEl.textContent = article.category;
  if (readTimeEl) readTimeEl.textContent = article.readTime;
  if (authorEl) authorEl.textContent = article.author;
  if (dateEl) dateEl.textContent = `${article.date} • Publikasi Resmi Fasyankes`;
  if (coverEl) {
    coverEl.src = article.cover;
    coverEl.alt = article.title;
  }
  if (captionEl) captionEl.textContent = article.caption;
  if (bodyEl) bodyEl.innerHTML = article.contentHtml;
  if (btnBackText) {
    btnBackText.textContent = (previousPageBeforeNews === 'home') ? 'Kembali ke Beranda' : 'Kembali ke Berita';
  }

  // Render Berita Terkait Lainnya (Bisa Diklik Universal dengan data-news-slug dan cursor pointer)
  const relatedGrid = document.getElementById('single-news-related-grid');
  if (relatedGrid) {
    const otherArticles = Object.values(NEWS_DATABASE).filter(a => a.slug !== article.slug);
    relatedGrid.innerHTML = otherArticles.slice(0, 3).map(rel => `
      <article class="related-card-item clickable-news-card" data-news-slug="${escapeHTML(rel.slug)}" role="button" tabindex="0" onclick="openNewsDetail('${escapeHTML(rel.slug)}', true)" style="cursor: pointer;">
        <div class="related-card-thumb">
          <img src="${escapeHTML(rel.cover)}" alt="${escapeHTML(rel.title)}" loading="lazy">
        </div>
        <div class="related-card-body">
          <span class="related-badge">${escapeHTML(rel.category)}</span>
          <span class="related-date">${escapeHTML(rel.date)}</span>
          <h4 class="related-title">${escapeHTML(rel.title)}</h4>
        </div>
      </article>
    `).join('');
  }

  // Perbarui Navigasi Pagination Single Post (Artikel Sebelumnya / Selanjutnya)
  updateAdjacentArticlesNav(article.slug);

  // Buka halaman Single Post
  document.querySelectorAll('.page').forEach(p => {
    const isTarget = (p.id === 'page-news-detail');
    p.classList.toggle('active', isTarget);
    if (isTarget) p.classList.add('fade-in');
  });

  // Perbarui Title Peramban
  document.title = `${article.title} — Puskesmas Malimpung`;

  // Tutup drawer jika ada
  closeMobileNav();

  // Sinkronisasi riwayat hash
  if (pushHistory) {
    history.pushState(null, '', `#news/${article.slug}`);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goBackFromNewsDetail() {
  if (previousPageBeforeNews && previousPageBeforeNews !== 'news-detail') {
    navigate(previousPageBeforeNews);
  } else {
    navigate('news');
  }
}

// ---------------------------------------------------------------------------
// NAVIGASI PAGINATION SINGLE POST (ARTIKEL SEBELUMNYA & ARTIKEL SELANJUTNYA)
// ---------------------------------------------------------------------------
function updateAdjacentArticlesNav(currentSlug) {
  const slugs = Object.keys(NEWS_DATABASE);
  const currentIndex = slugs.indexOf(currentSlug);
  if (currentIndex === -1) return;

  const prevIndex = (currentIndex - 1 + slugs.length) % slugs.length;
  const nextIndex = (currentIndex + 1) % slugs.length;

  const prevArticle = NEWS_DATABASE[slugs[prevIndex]];
  const nextArticle = NEWS_DATABASE[slugs[nextIndex]];

  const prevTitleEl = document.getElementById('prev-article-title');
  const nextTitleEl = document.getElementById('next-article-title');
  const prevBtn = document.getElementById('btn-prev-article');
  const nextBtn = document.getElementById('btn-next-article');

  if (prevTitleEl && prevArticle) prevTitleEl.textContent = prevArticle.title;
  if (nextTitleEl && nextArticle) nextTitleEl.textContent = nextArticle.title;

  if (prevBtn) {
    prevBtn.setAttribute('data-target-slug', slugs[prevIndex]);
    prevBtn.setAttribute('title', `Sebelumnya: ${prevArticle ? prevArticle.title : ''}`);
  }
  if (nextBtn) {
    nextBtn.setAttribute('data-target-slug', slugs[nextIndex]);
    nextBtn.setAttribute('title', `Selanjutnya: ${nextArticle ? nextArticle.title : ''}`);
  }
}

function navigateAdjacentArticle(direction) {
  const btnId = (direction === 'prev') ? 'btn-prev-article' : 'btn-next-article';
  const btn = document.getElementById(btnId);
  if (btn) {
    const targetSlug = btn.getAttribute('data-target-slug');
    if (targetSlug && NEWS_DATABASE[targetSlug]) {
      openNewsDetail(targetSlug, true);
    }
  }
}
window.updateAdjacentArticlesNav = updateAdjacentArticlesNav;
window.navigateAdjacentArticle = navigateAdjacentArticle;

function shareNewsWhatsApp() {
  const title = document.getElementById('single-news-title')?.textContent || 'Berita Puskesmas Malimpung';
  const url = window.location.href;
  const text = encodeURIComponent(`*${title}*\nBaca selengkapnya di portal resmi Puskesmas Malimpung:\n${url}`);
  window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
}

function copyNewsUrl() {
  const url = window.location.href;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(() => {
      appToast('Tautan berita berhasil disalin ke papan klip.');
    }).catch(() => {
      appToast('Tautan: ' + url);
    });
  } else {
    appToast('Tautan: ' + url);
  }
}

function navigate(fullRoute, scroll = true) {
  let [baseRoute, subSlug] = (fullRoute || 'home').split('/');

  // Jika rute news dan ada subSlug, buka detail berita
  if (baseRoute === 'news' && subSlug && NEWS_DATABASE[subSlug]) {
    openNewsDetail(subSlug, false);
    return;
  }
  if (baseRoute === 'news-detail') {
    openNewsDetail(subSlug || 'posyandu-terpadu-pajalele', false);
    return;
  }

  if (!VALID_ROUTES.includes(baseRoute)) baseRoute = 'home';

  // Toggle kelas halaman aktif
  document.querySelectorAll('.page').forEach(p => {
    const isTarget = (p.id === `page-${baseRoute}`);
    p.classList.toggle('active', isTarget);
    if (isTarget) p.classList.add('fade-in');
  });

  // Toggle navigasi desktop & drawer
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.go === baseRoute);
  });
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.go === baseRoute);
  });

  // Update Judul Halaman
  const titles = {
    home: 'Beranda — Puskesmas Malimpung Kabupaten Pinrang',
    services: 'Katalog Layanan Publik — Puskesmas Malimpung',
    programs: 'Program Kesehatan Siklus Hidup — Puskesmas Malimpung',
    insights: 'Health Intelligence Wilayah — Puskesmas Malimpung',
    public: 'Keterbukaan Informasi Publik — Puskesmas Malimpung',
    office: 'Smart Virtual Office — Puskesmas Malimpung',
    news: 'Berita & Informasi Terkini — Puskesmas Malimpung',
    'news-detail': 'Detail Berita — Puskesmas Malimpung'
  };
  document.title = titles[baseRoute] || 'Puskesmas Malimpung';

  // Tutup mobile drawer jika terbuka
  closeMobileNav();

  // Sinkronisasi Deep-Linking Detail Layanan
  if (baseRoute === 'services' && subSlug) {
    openServiceDetail(subSlug, false);
    if (location.hash !== `#services/${subSlug}`) {
      history.replaceState(null, '', `#services/${subSlug}`);
    }
  } else {
    closeServiceDetail(false);
    if (location.hash !== `#${baseRoute}`) {
      history.replaceState(null, '', `#${baseRoute}`);
    }
  }

  // Inisialisasi & refresh Leaflet Map pada beranda
  if (baseRoute === 'home') {
    setTimeout(() => {
      initHealthAtlasHomeMap();
      if (healthAtlasHomeMap) {
        healthAtlasHomeMap.invalidateSize();
      }
    }, 150);
  }

  // Inisialisasi & refresh Leaflet Map pada rute insights
  if (baseRoute === 'insights') {
    setTimeout(() => {
      initHealthAtlasLeafletMap();
      if (healthAtlasMap) {
        healthAtlasMap.invalidateSize();
      }
    }, 150);
  }

  if (scroll) {
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }
}

function openMobileNav() {
  const overlay = document.getElementById('mobile-nav');
  const toggle = document.getElementById('menu-toggle');
  if (overlay) {
    overlay.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
}

function closeMobileNav() {
  const overlay = document.getElementById('mobile-nav');
  const toggle = document.getElementById('menu-toggle');
  if (overlay) {
    overlay.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
}

window.navigate = navigate;
window.openMobileNav = openMobileNav;
window.closeMobileNav = closeMobileNav;
window.openServiceDetail = openServiceDetail;
window.closeServiceDetail = closeServiceDetail;
window.openNewsDetail = openNewsDetail;
window.goBackFromNewsDetail = goBackFromNewsDetail;
window.shareNewsWhatsApp = shareNewsWhatsApp;
window.copyNewsUrl = copyNewsUrl;

// ---------------------------------------------------------------------------
// 5. CMS STUDIO LOGIC
// ---------------------------------------------------------------------------
window.loadServiceToCms = function(id) {
  const s = servicesState.find(x => x.id === id);
  if (!s) return;

  // Buka tab CMS di office
  document.querySelectorAll('.office-tab-item').forEach(t => t.classList.toggle('active', t.dataset.otab === 'cms'));
  document.querySelectorAll('.otab-pane').forEach(p => p.style.display = (p.id === 'otab-cms' ? 'block' : 'none'));

  document.getElementById('cms-svc-id').value = s.id;
  document.getElementById('cms-svc-name').value = s.name;
  document.getElementById('cms-svc-desc').value = s.text;
  document.getElementById('cms-svc-cost').value = s.cost;
  document.getElementById('cms-svc-schedule').value = s.schedule;

  navigate('office', true);
  appToast(`Memuat data ${s.name} ke editor CMS.`);
};

function handleCmsSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('cms-svc-id').value;
  const name = document.getElementById('cms-svc-name').value.trim();
  const desc = document.getElementById('cms-svc-desc').value.trim();
  const cost = document.getElementById('cms-svc-cost').value.trim();
  const schedule = document.getElementById('cms-svc-schedule').value.trim();

  const idx = servicesState.findIndex(s => s.id === id);
  if (idx !== -1) {
    servicesState[idx].name = name;
    servicesState[idx].text = desc;
    servicesState[idx].cost = cost;
    servicesState[idx].schedule = schedule;
    servicesState[idx].verifiedDate = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

    saveServicesToStorage();
    renderServices();
    renderOfficeTables();

    // Catat ke audit log
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}.${String(now.getMinutes()).padStart(2, '0')}`;
    auditLogsState.unshift({
      time: timeStr,
      user: document.getElementById('office-username').textContent,
      action: `Update CMS: ${name}`,
      result: 'Berhasil Dipublikasikan ke Portal'
    });
    saveLogsToStorage();
    renderOfficeTables();

    appToast(`Layanan ${name} berhasil disimpan dan diperbarui di portal!`);
  }
}

// ---------------------------------------------------------------------------
// 6. HEALTH ATLAS LEAFLET MAP ENGINE (BIG TASWIL10000 2023)
// ---------------------------------------------------------------------------
let healthAtlasMap = null;
let healthAtlasGeoJsonLayer = null;

function initHealthAtlasLeafletMap() {
  const mapContainer = document.getElementById('health-atlas-leaflet-map');
  if (!mapContainer || healthAtlasMap || typeof L === 'undefined') return;

  // Inisialisasi peta berpusat pada koordinat wilayah kerja Malimpung
  healthAtlasMap = L.map('health-atlas-leaflet-map', {
    center: [-3.729869, 119.73413],
    zoom: 12,
    scrollWheelZoom: false
  });

  // Base Layer OpenStreetMap Standar Kemenkes RI
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | Batas Wilayah &copy; Badan Informasi Geospasial (BIG)'
  }).addTo(healthAtlasMap);

  // Palet Warna Poligon Wilayah Kerja Resmi
  const villageStyles = {
    'malimpung': { color: '#087d79', fillColor: '#2ea89a', fillOpacity: 0.35, weight: 2.5 },
    'padang loang': { color: '#059669', fillColor: '#10b981', fillOpacity: 0.35, weight: 2.5 },
    'maccirinna': { color: '#0284c7', fillColor: '#38bdf8', fillOpacity: 0.35, weight: 2.5 }
  };

  // Marker Puskesmas Induk Malimpung
  const pkmIcon = L.divIcon({
    className: 'pkm-custom-marker',
    html: `<div style="background-color: #e11d48; width: 26px; height: 26px; border-radius: 50%; border: 3px solid #ffffff; box-shadow: 0 2px 8px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; color: white; font-weight: 800; font-size: 14px; line-height: 1;">+</div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 13]
  });

  const pkmMarker = L.marker([-3.729869, 119.73413], { icon: pkmIcon, title: 'Puskesmas Malimpung Induk' }).addTo(healthAtlasMap);
  pkmMarker.bindPopup(`
    <div style="font-family: 'Plus Jakarta Sans', sans-serif; min-width: 220px; padding: 4px;">
      <span style="font-size: 10px; font-weight: 800; color: #087d79; text-transform: uppercase; letter-spacing: 0.05em;">Fasyankes Induk Terakreditasi Paripurna</span>
      <h4 style="font-size: 14px; font-weight: 800; color: #18383A; margin: 4px 0 2px;">Puskesmas Malimpung</h4>
      <p style="font-size: 11px; color: #4b5563; margin: 0 0 8px; line-height: 1.4;">Benteng Malimpung, Kec. Patampanua, Kab. Pinrang</p>
      <div style="font-size: 11px; color: #15803d; font-weight: 700; margin-bottom: 8px;">✓ Layanan UGD & Persalinan 24 Jam</div>
      <a href="https://maps.app.goo.gl/YYYWShsgAxZoG2vW8" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 4px; background-color: #087d79; color: white; padding: 5px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; text-decoration: none;">
        <span>Petunjuk Arah Google Maps ↗</span>
      </a>
    </div>
  `);

  // Muat berkas GeoJSON resmi hasil ekstraksi BIG
  fetch('assets/batas_wilayah_malimpung.geojson')
    .then(res => res.json())
    .then(geoData => {
      healthAtlasGeoJsonLayer = L.geoJSON(geoData, {
        style: function(feature) {
          const name = (feature.properties.NAMOBJ || '').toLowerCase();
          for (const key in villageStyles) {
            if (name.includes(key)) return villageStyles[key];
          }
          return { color: '#64748b', fillColor: '#94a3b8', fillOpacity: 0.3, weight: 2 };
        },
        onEachFeature: function(feature, layer) {
          const p = feature.properties;
          layer.bindTooltip(`<strong>${p.TIPE} ${p.NAMOBJ}</strong><br><span style="font-size:10px;">Kode: ${p.KODE_KEMENDAGRI}</span>`, {
            sticky: true,
            direction: 'top'
          });
          layer.bindPopup(`
            <div style="font-family: 'Plus Jakarta Sans', sans-serif; min-width: 230px; padding: 4px;">
              <span style="font-size: 10px; font-weight: 800; color: #087d79; text-transform: uppercase;">${p.TIPE} BINAAN RESMI</span>
              <h4 style="font-size: 15px; font-weight: 800; color: #18383A; margin: 4px 0 4px;">${p.TIPE} ${p.NAMOBJ}</h4>
              <table style="width: 100%; font-size: 11px; border-collapse: collapse; margin-top: 6px; border-top: 1px solid #e5e7eb;">
                <tr><td style="color:#6b7280; padding: 3px 0;">Kode Kemendagri</td><td style="font-weight:700; text-align:right;">${p.KODE_KEMENDAGRI}</td></tr>
                <tr><td style="color:#6b7280; padding: 3px 0;">Kecamatan</td><td style="font-weight:700; text-align:right;">${p.KECAMATAN}</td></tr>
                <tr><td style="color:#6b7280; padding: 3px 0;">Kabupaten</td><td style="font-weight:700; text-align:right;">${p.KABUPATEN}</td></tr>
                <tr><td style="color:#6b7280; padding: 3px 0;">Sumber Geometri</td><td style="font-weight:700; color:#15803d; text-align:right;">BIG TASWIL10000</td></tr>
              </table>
            </div>
          `);
          layer.on({
            mouseover: function(e) {
              const l = e.target;
              l.setStyle({ fillOpacity: 0.6, weight: 3.5 });
            },
            mouseout: function(e) {
              healthAtlasGeoJsonLayer.resetStyle(e.target);
            }
          });
        }
      }).addTo(healthAtlasMap);

      // Fit bounds agar mencakup keseluruhan batas poligon
      healthAtlasMap.fitBounds(healthAtlasGeoJsonLayer.getBounds(), { padding: [30, 30] });
    })
    .catch(err => {
      console.warn('Gagal memuat GeoJSON batas wilayah BIG:', err);
    });
}
window.initHealthAtlasLeafletMap = initHealthAtlasLeafletMap;

// ---------------------------------------------------------------------------
// 6B. PETA SEHAT GEOSPASIAL ENGINE (MULTI-LAYER SWITCHER)
// ---------------------------------------------------------------------------
let healthAtlasHomeMap = null;
let homeAdminLayer = null;
let homeFaskesLayer = null;
let homeHealthLayer = null;
let currentHomeMapLayer = 'admin';

// Data Lokasi Fasyankes & 8 Posyandu Binaan
const POSYANDU_DATA = [
  { name: 'Puskesmas Malimpung (Induk)', type: 'pkm', coords: [-3.729869, 119.73413], info: 'IGD & Persalinan Siaga 24 Jam • Rawat Jalan 08.00-14.00 WITA' },
  { name: 'Pustu Padang Loang', type: 'pustu', coords: [-3.7385, 119.7435], info: 'Pelayanan Dasar & Rujukan Desa Padang Loang' },
  { name: 'Pustu Maccirinna', type: 'pustu', coords: [-3.7210, 119.7170], info: 'Pelayanan Bidan & Perawat Kelurahan Maccirinna' },
  { name: 'Posyandu Melati (Dusun Pajalele)', type: 'posyandu', coords: [-3.7320, 119.7390], info: 'Penimbangan Balita, CKG, Imunisasi Rutin Hari Selasa I' },
  { name: 'Posyandu Mawar (Dusun Benteng)', type: 'posyandu', coords: [-3.7270, 119.7310], info: 'Pelayanan Ibu Hamil & Balita Hari Rabu I' },
  { name: 'Posyandu Kenanga (Dusun Kariango)', type: 'posyandu', coords: [-3.7225, 119.7385], info: 'Skrining CKG, Lansia, Balita Hari Kamis I' },
  { name: 'Posyandu Dahlia (Padang Loang I)', type: 'posyandu', coords: [-3.7395, 119.7460], info: 'Layanan Posyandu Integrasi Hari Senin II' },
  { name: 'Posyandu Cempaka (Padang Loang II)', type: 'posyandu', coords: [-3.7440, 119.7415], info: 'Pemantauan Tumbuh Kembang Hari Rabu II' },
  { name: 'Posyandu Anggrek (Maccirinna Barat)', type: 'posyandu', coords: [-3.7195, 119.7145], info: 'Penyuluhan PHBS, Imunisasi Hari Kamis II' },
  { name: 'Posyandu Flamboyan (Maccirinna Timur)', type: 'posyandu', coords: [-3.7245, 119.7215], info: 'Skrining PTM Hipertensi & Balita Hari Jumat II' },
  { name: 'Posyandu Teratai (Dusun Alitta)', type: 'posyandu', coords: [-3.7345, 119.7275], info: 'Pelayanan Antenatal & Lansia Hari Sabtu II' }
];

function initHealthAtlasHomeMap() {
  const mapContainer = document.getElementById('health-atlas-home-map');
  if (!mapContainer || healthAtlasHomeMap || typeof L === 'undefined') return;

  healthAtlasHomeMap = L.map('health-atlas-home-map', {
    center: [-3.729869, 119.73413],
    zoom: 13,
    scrollWheelZoom: false
  });

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | BIG Batas Wilayah'
  }).addTo(healthAtlasHomeMap);

  homeAdminLayer = L.featureGroup().addTo(healthAtlasHomeMap);
  homeFaskesLayer = L.featureGroup();
  homeHealthLayer = L.featureGroup();

  const villageStyles = {
    'malimpung': { color: '#059669', fillColor: '#10b981', fillOpacity: 0.32, weight: 2.5 },
    'padang loang': { color: '#2563eb', fillColor: '#3b82f6', fillOpacity: 0.32, weight: 2.5 },
    'maccirinna': { color: '#d97706', fillColor: '#f59e0b', fillOpacity: 0.32, weight: 2.5 }
  };

  const healthStyles = {
    'malimpung': { color: '#047857', fillColor: '#10b981', fillOpacity: 0.52, weight: 3 },
    'padang loang': { color: '#0284c7', fillColor: '#38bdf8', fillOpacity: 0.48, weight: 3 },
    'maccirinna': { color: '#7c3aed', fillColor: '#a855f7', fillOpacity: 0.45, weight: 3 }
  };

  // Muat GeoJSON Resmi BIG untuk Layer Admin & Health
  fetch('assets/batas_wilayah_malimpung.geojson')
    .then(res => res.json())
    .then(geoData => {
      // 1. Layer Batas Administrasi BIG
      const adminGeo = L.geoJSON(geoData, {
        style: function(f) {
          const name = (f.properties.NAMOBJ || '').toLowerCase();
          for (const key in villageStyles) {
            if (name.includes(key)) return villageStyles[key];
          }
          return { color: '#64748b', fillColor: '#94a3b8', fillOpacity: 0.3, weight: 2 };
        },
        onEachFeature: function(f, layer) {
          const p = f.properties;
          layer.bindTooltip(`<strong>${p.TIPE} ${p.NAMOBJ}</strong>`, { sticky: true, direction: 'top' });
          layer.bindPopup(`
            <div style="font-family:'Plus Jakarta Sans',sans-serif; min-width:210px; padding:4px;">
              <span style="font-size:10px; font-weight:800; color:#008775; text-transform:uppercase;">Wilayah Kerja Binaan</span>
              <h4 style="font-size:14px; font-weight:800; color:#0c2923; margin:3px 0;">${p.TIPE} ${p.NAMOBJ}</h4>
              <p style="font-size:11px; color:#526b64; margin:0;">Kode Kemendagri: <strong>${p.KODE_KEMENDAGRI}</strong></p>
              <p style="font-size:11px; color:#059669; font-weight:700; margin-top:4px;">Skala Peta 1:10.000 BIG 2023</p>
            </div>
          `);
        }
      });
      homeAdminLayer.addLayer(adminGeo);

      // 2. Layer Gambaran Kesehatan Warga (Choropleth Tematik)
      const healthGeo = L.geoJSON(geoData, {
        style: function(f) {
          const name = (f.properties.NAMOBJ || '').toLowerCase();
          for (const key in healthStyles) {
            if (name.includes(key)) return healthStyles[key];
          }
          return { color: '#059669', fillColor: '#10b981', fillOpacity: 0.45, weight: 2.5 };
        },
        onEachFeature: function(f, layer) {
          const p = f.properties;
          const name = (p.NAMOBJ || '').toLowerCase();
          let statsHtml = '';
          if (name.includes('malimpung')) {
            statsHtml = `
              <div style="font-size:11px; line-height:1.5; margin-top:6px; border-top:1px solid #e5e7eb; padding-top:4px;">
                <div>🟢 Total Kunjungan CKG: <strong>772 Warga</strong> (Optimal 100%)</div>
                <div>🩺 Hipertensi Terpantau: <strong>172 Warga</strong></div>
                <div>📊 Dusun Malimpung 503 • Pajalele 159 • Palita 110</div>
              </div>`;
          } else if (name.includes('padang')) {
            statsHtml = `
              <div style="font-size:11px; line-height:1.5; margin-top:6px; border-top:1px solid #e5e7eb; padding-top:4px;">
                <div>🟢 Total Kunjungan CKG: <strong>126 Warga</strong> (Optimal 100%)</div>
                <div>🩺 Hipertensi Terpantau: <strong>53 Warga</strong></div>
                <div>📊 Dusun Padang 84 • Dusun Banga 42</div>
              </div>`;
          } else {
            statsHtml = `
              <div style="font-size:11px; line-height:1.5; margin-top:6px; border-top:1px solid #e5e7eb; padding-top:4px;">
                <div>🟢 Total Kunjungan CKG: <strong>421 Warga</strong> (Optimal)</div>
                <div>🩺 Hipertensi Terpantau: <strong>88 Warga</strong></div>
                <div>📊 Lingk. Dioang 367 • Paraungan 38 • Bulu Dua 16</div>
              </div>`;
          }
          layer.bindTooltip(`<strong>Status CKG: ${p.NAMOBJ}</strong>`, { sticky: true, direction: 'top' });
          layer.bindPopup(`
            <div style="font-family:'Plus Jakarta Sans',sans-serif; min-width:240px; padding:4px;">
              <span style="font-size:10px; font-weight:800; color:#059669; text-transform:uppercase;">Data Realtime CKG TERSANJUNG</span>
              <h4 style="font-size:14px; font-weight:800; color:#0c2923; margin:3px 0;">${p.TIPE} ${p.NAMOBJ}</h4>
              ${statsHtml}
            </div>
          `);
        }
      });
      homeHealthLayer.addLayer(healthGeo);

      // Pasang Marker Realtime CKG untuk 8 Dusun / Lingkungan Binaan
      CKG_REALTIME_DATA.capaian_dusun.forEach(ds => {
        if (!ds.coords) return;
        const ckgIcon = L.divIcon({
          className: 'ckg-dusun-marker',
          html: `<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); width: 24px; height: 24px; border-radius: 50%; border: 2.5px solid #ffffff; box-shadow: 0 3px 8px rgba(5,150,105,0.4); display: flex; align-items: center; justify-content: center; color: white; font-weight: 800; font-size: 11px;">✓</div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });

        const dm = L.marker(ds.coords, { icon: ckgIcon, title: `${ds.dusun} - CKG` });
        dm.bindTooltip(`<strong>${ds.dusun}</strong>: ${ds.kunjungan} Skrining (${ds.status})`, { sticky: true, direction: 'top' });
        dm.bindPopup(`
          <div style="font-family:'Plus Jakarta Sans',sans-serif; min-width:220px; padding:4px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
              <span style="font-size:10px; font-weight:800; color:#059669; text-transform:uppercase;">Data CKG TERSANJUNG</span>
              <span style="font-size:10px; font-weight:800; background:#ecfdf5; color:#059669; padding:2px 6px; border-radius:4px;">${ds.target} ${ds.status}</span>
            </div>
            <h4 style="font-size:13px; font-weight:800; color:#0c2923; margin:0 0 2px;">${ds.dusun}</h4>
            <div style="font-size:11px; color:#526b64; margin-bottom:6px;">Wilayah Kerja: <strong>${ds.wilayah}</strong></div>
            <div style="background:#f8fafc; border:1px solid #e2ece8; border-radius:8px; padding:6px 8px; font-size:11px; line-height:1.5;">
              <div>👥 Total Kunjungan: <strong style="color:#0c2923;">${ds.kunjungan} Warga</strong></div>
              <div>🩸 Hipertensi: <strong style="color:#dc2626;">${ds.hipertensi}</strong> | Diabetes: <strong style="color:#d97706;">${ds.diabetes}</strong></div>
              <div>🩺 Risiko Lainnya: <strong style="color:#2563eb;">${ds.risiko_lain}</strong></div>
            </div>
          </div>
        `);
        homeHealthLayer.addLayer(dm);
      });

      // Pasang Marker Fasyankes & Posyandu ke Layer Faskes
      POSYANDU_DATA.forEach(pos => {
        let markerColor = '#8b5cf6';
        let markerSymbol = '●';
        let iconRadius = '50%';
        if (pos.type === 'pkm') {
          markerColor = '#e11d48';
          markerSymbol = '+';
        } else if (pos.type === 'pustu') {
          markerColor = '#2563eb';
          markerSymbol = 'H';
          iconRadius = '8px';
        }

        const customIcon = L.divIcon({
          className: 'posyandu-map-marker',
          html: `<div style="background-color: ${markerColor}; width: 26px; height: 26px; border-radius: ${iconRadius}; border: 3px solid #ffffff; box-shadow: 0 2px 8px rgba(0,0,0,0.35); display: flex; align-items: center; justify-content: center; color: white; font-weight: 800; font-size: 13px; line-height: 1;">${markerSymbol}</div>`,
          iconSize: [26, 26],
          iconAnchor: [13, 13]
        });

        const m = L.marker(pos.coords, { icon: customIcon, title: pos.name });
        m.bindPopup(`
          <div style="font-family:'Plus Jakarta Sans',sans-serif; min-width:210px; padding:4px;">
            <span style="font-size:10px; font-weight:800; color:${markerColor}; text-transform:uppercase;">${pos.type === 'pkm' ? 'Fasyankes Induk' : (pos.type === 'pustu' ? 'Puskesmas Pembantu' : 'Pos Pelayanan Terpadu')}</span>
            <h4 style="font-size:13px; font-weight:800; color:#0c2923; margin:3px 0;">${pos.name}</h4>
            <p style="font-size:11px; color:#526b64; margin:0 0 6px; line-height:1.4;">${pos.info}</p>
            <span style="font-size:10px; color:#059669; font-weight:700;">✓ Wilayah Binaan Puskesmas Malimpung</span>
          </div>
        `);
        homeFaskesLayer.addLayer(m);
      });

      // Tambahkan juga marker PKM ke layer admin
      const pkmMain = POSYANDU_DATA[0];
      const pkmIcon = L.divIcon({
        className: 'pkm-custom-marker',
        html: `<div style="background-color: #e11d48; width: 28px; height: 28px; border-radius: 50%; border: 3px solid #ffffff; box-shadow: 0 2px 8px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; color: white; font-weight: 800; font-size: 15px; line-height: 1;">+</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });
      const pkmMarker = L.marker(pkmMain.coords, { icon: pkmIcon, title: pkmMain.name });
      pkmMarker.bindPopup(`
        <div style="font-family:'Plus Jakarta Sans',sans-serif; min-width:210px; padding:4px;">
          <span style="font-size:10px; font-weight:800; color:#008775; text-transform:uppercase;">Puskesmas Induk</span>
          <h4 style="font-size:14px; font-weight:800; color:#0c2923; margin:3px 0;">Puskesmas Malimpung</h4>
          <p style="font-size:11px; color:#526b64; margin-bottom:6px;">Benteng Malimpung, Kec. Patampanua</p>
          <a href="https://maps.app.goo.gl/YYYWShsgAxZoG2vW8" target="_blank" rel="noopener noreferrer" style="font-size:11px; font-weight:700; color:#008775; text-decoration:none;">Buka Petunjuk Arah ↗</a>
        </div>
      `);
      homeAdminLayer.addLayer(pkmMarker);

      // Initial Fit Bounds
      healthAtlasHomeMap.fitBounds(adminGeo.getBounds(), { padding: [20, 20] });
    })
    .catch(err => {
      console.warn('Gagal memuat GeoJSON Peta Sehat Beranda:', err);
    });
}

function switchMapLayer(layerName) {
  if (!healthAtlasHomeMap) return;
  currentHomeMapLayer = layerName;

  // Hapus semua layer feature group
  if (healthAtlasHomeMap.hasLayer(homeAdminLayer)) healthAtlasHomeMap.removeLayer(homeAdminLayer);
  if (healthAtlasHomeMap.hasLayer(homeFaskesLayer)) healthAtlasHomeMap.removeLayer(homeFaskesLayer);
  if (healthAtlasHomeMap.hasLayer(homeHealthLayer)) healthAtlasHomeMap.removeLayer(homeHealthLayer);

  // Update indikator UI tab
  document.querySelectorAll('.layer-tab').forEach(tab => {
    const isTarget = (tab.getAttribute('data-map-layer') === layerName);
    tab.classList.toggle('active', isTarget);
    tab.setAttribute('aria-selected', isTarget ? 'true' : 'false');
  });

  const labelEl = document.getElementById('layer-status-text');

  if (layerName === 'admin') {
    homeAdminLayer.addTo(healthAtlasHomeMap);
    if (labelEl) labelEl.innerHTML = 'Menampilkan: <strong>Batas Administrasi BIG 1:10.000</strong>';
    appToast('Peta beralih: Batas Administrasi BIG');
  } else if (layerName === 'faskes') {
    homeAdminLayer.addTo(healthAtlasHomeMap);
    homeFaskesLayer.addTo(healthAtlasHomeMap);
    if (labelEl) labelEl.innerHTML = 'Menampilkan: <strong>Fasyankes Induk, 2 Pustu & 8 Posyandu Dusun</strong>';
    appToast('Peta beralih: Fasyankes & 8 Posyandu Dusun');
  } else if (layerName === 'health') {
    homeHealthLayer.addTo(healthAtlasHomeMap);
    if (labelEl) labelEl.innerHTML = 'Menampilkan: <strong>Gambaran Kesehatan Warga & Capaian Skrining CKG</strong>';
    appToast('Peta beralih: Gambaran Kesehatan Warga');
  }
}
window.initHealthAtlasHomeMap = initHealthAtlasHomeMap;
window.switchMapLayer = switchMapLayer;

// Auto Re-fit Peta Leaflet Saat Window Resize / Rotasi Layar Ponsel
let mapResizeTimer = null;
window.addEventListener('resize', () => {
  clearTimeout(mapResizeTimer);
  mapResizeTimer = setTimeout(() => {
    if (healthAtlasHomeMap) {
      healthAtlasHomeMap.invalidateSize();
    }
    if (healthAtlasMap) {
      healthAtlasMap.invalidateSize();
    }
  }, 250);
});

// ---------------------------------------------------------------------------
// 7. EVENT DELEGATION GLOBAL: SINGLE POST BERITA BERFUNGSI UNIVERSAL
// ---------------------------------------------------------------------------
document.addEventListener('click', function(e) {
  const card = e.target.closest('[data-news-slug]');
  if (card) {
    const slug = card.getAttribute('data-news-slug');
    if (slug && typeof window.openNewsDetail === 'function') {
      e.preventDefault();
      window.openNewsDetail(slug);
    }
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    const card = e.target.closest('[data-news-slug]');
    if (card) {
      const slug = card.getAttribute('data-news-slug');
      if (slug && typeof window.openNewsDetail === 'function') {
        e.preventDefault();
        window.openNewsDetail(slug);
      }
    }
  }
});

// ---------------------------------------------------------------------------
// 7. TOAST HELPER
// ---------------------------------------------------------------------------
function appToast(msg) {
  const toast = document.getElementById('toast');
  const text = document.getElementById('toast-text');
  if (!toast || !text) return;

  text.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
window.appToast = appToast;

// ---------------------------------------------------------------------------
// 7. EVENT LISTENERS INITIALIZATION
// ---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initStore();
  renderServices();
  renderOfficeTables();
  updateTopicView('ckg');

  // Navigasi Router Link Click
  document.querySelectorAll('[data-go]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const route = btn.dataset.go || btn.getAttribute('href').replace('#', '');
      navigate(route);
    });
  });

  // Hamburger Menu
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNavClose = document.getElementById('mobile-nav-close');
  if (menuToggle) menuToggle.addEventListener('click', openMobileNav);
  if (mobileNavClose) mobileNavClose.addEventListener('click', closeMobileNav);

  // Search & Filters Layanan
  const searchInput = document.getElementById('service-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      renderServices();
    });
  }

  const resetBtn = document.getElementById('service-reset');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      currentSearch = '';
      activeCategory = 'all';
      if (searchInput) searchInput.value = '';
      document.querySelectorAll('.chip[data-category]').forEach(c => c.classList.toggle('active', c.dataset.category === 'all'));
      renderServices();
    });
  }

  document.querySelectorAll('.chip[data-category]').forEach(chip => {
    chip.addEventListener('click', () => {
      activeCategory = chip.dataset.category;
      document.querySelectorAll('.chip[data-category]').forEach(c => c.classList.toggle('active', c === chip));
      renderServices();
    });
  });

  // Filters Program Siklus Hidup
  document.querySelectorAll('.program-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const selectedPcat = chip.dataset.pcat;
      document.querySelectorAll('.program-chip').forEach(c => c.classList.toggle('active', c === chip));
      document.querySelectorAll('.program-item').forEach(item => {
        const match = (selectedPcat === 'all' || item.dataset.pcat === selectedPcat);
        item.style.display = match ? 'block' : 'none';
        if (match) item.classList.add('fade-in');
      });
    });
  });

  // Modal Close
  const modalClose = document.getElementById('modal-svc-close');
  const modalBackdrop = document.getElementById('service-detail-modal');
  if (modalClose) modalClose.addEventListener('click', closeServiceDetail);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeServiceDetail();
    });
  }

  // Health Intelligence Topic Buttons
  document.querySelectorAll('[data-topic]').forEach(btn => {
    btn.addEventListener('click', () => {
      updateTopicView(btn.dataset.topic);
    });
  });

  // Informasi Publik Tabs
  document.querySelectorAll('[data-ptab]').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabKey = btn.dataset.ptab;
      document.querySelectorAll('[data-ptab]').forEach(b => b.classList.toggle('active', b === btn));
      document.querySelectorAll('.public-tab-content').forEach(p => {
        p.style.display = (p.id === `ptab-${tabKey}` ? 'block' : 'none');
      });
    });
  });

  // SKM Quick Poll Handler
  const savedSkmVote = localStorage.getItem('malimpung_skm_vote');
  const skmThankyou = document.getElementById('skm-vote-thankyou');
  if (savedSkmVote && skmThankyou) {
    skmThankyou.style.display = 'block';
    skmThankyou.textContent = `✓ Anda telah menyampaikan penilaian: "${savedSkmVote}". Terima kasih atas partisipasi Anda!`;
  }

  document.querySelectorAll('.skm-vote-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const voteVal = btn.dataset.vote;
      localStorage.setItem('malimpung_skm_vote', voteVal);
      if (skmThankyou) {
        skmThankyou.style.display = 'block';
        skmThankyou.textContent = `✓ Terima kasih! Penilaian Anda (${voteVal}) telah berhasil dicatat.`;
      }
      appToast(`Terima kasih atas partisipasi survei Anda (${voteVal})!`);
    });
  });

  // Virtual Office Tabs
  document.querySelectorAll('[data-otab]').forEach(btn => {
    btn.addEventListener('click', () => {
      const otabKey = btn.dataset.otab;
      document.querySelectorAll('[data-otab]').forEach(b => b.classList.toggle('active', b === btn));
      document.querySelectorAll('.otab-pane').forEach(p => {
        p.style.display = (p.id === `otab-${otabKey}` ? 'block' : 'none');
      });
    });
  });

  // Role Switcher Simulation
  const roleSwitcher = document.getElementById('role-switcher');
  if (roleSwitcher) {
    roleSwitcher.addEventListener('change', (e) => {
      const role = e.target.value;
      const avatar = document.getElementById('office-avatar');
      const user = document.getElementById('office-username');
      if (role === 'kapus') {
        avatar.textContent = 'KP';
        user.textContent = 'dr. Hj. Pimpinan Puskesmas';
      } else if (role === 'dokter') {
        avatar.textContent = 'DR';
        user.textContent = 'dr. Ahmad Pratama (Dokter Fungsional)';
      } else if (role === 'editor') {
        avatar.textContent = 'ED';
        user.textContent = 'Siti Rahmah, S.Kep (Pengelola Portal/CMS)';
      } else if (role === 'program') {
        avatar.textContent = 'PG';
        user.textContent = 'Nurul Hidayah, SKM (Koordinator PWS/SPM)';
      } else if (role === 'admin') {
        avatar.textContent = 'IT';
        user.textContent = 'Fikri Rahman, S.Kom (Administrator Sistem)';
      }
      appToast(`Beralih peran: ${user.textContent}`);
    });
  }

  // Public Complaint Form Submit
  const complaintForm = document.getElementById('public-complaint-form');
  if (complaintForm) {
    complaintForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('complaint-name').value.trim();
      const unit = document.getElementById('complaint-service').value;
      const message = document.getElementById('complaint-message').value.trim();

      if (!message) return;

      const randomNum = Math.floor(10000 + Math.random() * 90000);
      const ticketId = `ADU-2026-${randomNum}`;

      // Catat ke audit log Smart Virtual Office secara persisten
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}.${String(now.getMinutes()).padStart(2, '0')}`;
      auditLogsState.unshift({
        time: timeStr,
        user: `Warga (${escapeHTML(name)})`,
        action: `Aduan Online [${ticketId}]: ${escapeHTML(unit)}`,
        result: 'Tercatat (Perlu Tindak Lanjut)'
      });
      saveLogsToStorage();
      renderOfficeTables();

      const receipt = document.getElementById('complaint-receipt');
      const ticketEl = document.getElementById('receipt-ticket-id');
      if (receipt && ticketEl) {
        ticketEl.textContent = ticketId;
        receipt.style.display = 'block';
      }

      complaintForm.reset();
      appToast(`Pengaduan berhasil terkirim. Nomor Tiket: ${ticketId}`);
    });
  }

  // CMS Form Submit
  const cmsForm = document.getElementById('cms-form-service');
  if (cmsForm) {
    cmsForm.addEventListener('submit', handleCmsSubmit);
  }

  // CMS Reset Default
  const cmsReset = document.getElementById('cms-btn-reset');
  if (cmsReset) {
    cmsReset.addEventListener('click', () => {
      if (confirm('Kembalikan seluruh data katalog layanan ke data master standar?')) {
        servicesState = [...DEFAULT_SERVICES];
        saveServicesToStorage();
        renderServices();
        renderOfficeTables();
        appToast('Data master berhasil dikembalikan ke standar awal.');
      }
    });
  }

  // CMS Export JSON
  const cmsExport = document.getElementById('cms-btn-export');
  if (cmsExport) {
    cmsExport.addEventListener('click', () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(servicesState, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", "master_layanan_malimpung_v2.json");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      appToast('Ekspor data master JSON berhasil diunduh.');
    });
  }

  // Quick Service Finder di Hero Beranda V3.1
  const heroFinderInput = document.getElementById('hero-service-finder');
  const heroFinderBtn = document.getElementById('btn-hero-finder');

  function executeHeroFinder() {
    if (!heroFinderInput) return;
    const query = heroFinderInput.value.trim();
    navigate('services');
    const serviceSearchInput = document.getElementById('service-search');
    if (serviceSearchInput) {
      serviceSearchInput.value = query;
      serviceSearchInput.dispatchEvent(new Event('input'));
    }
  }

  if (heroFinderBtn) {
    heroFinderBtn.addEventListener('click', executeHeroFinder);
  }
  if (heroFinderInput) {
    heroFinderInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        executeHeroFinder();
      }
    });
  }

  // Header Search Trigger
  const headerSearchBtn = document.getElementById('header-search-btn');
  if (headerSearchBtn) {
    headerSearchBtn.addEventListener('click', () => {
      navigate('services');
      setTimeout(() => {
        const svcSearch = document.getElementById('service-search');
        if (svcSearch) svcSearch.focus();
      }, 100);
    });
  }

  // Filter Kategori Berita & Informasi
  const newsPills = document.querySelectorAll('.news-pill[data-news-cat]');
  const newsSearchInput = document.getElementById('news-search-input');
  let activeNewsCat = 'all';

  function filterNewsArticles() {
    const q = (newsSearchInput ? newsSearchInput.value.toLowerCase().trim() : '');
    const articles = document.querySelectorAll('#news-articles-container .news-item-card');
    articles.forEach(card => {
      const cat = card.dataset.category || '';
      const text = card.textContent.toLowerCase();
      const matchCat = (activeNewsCat === 'all' || cat === activeNewsCat);
      const matchSearch = (!q || text.includes(q));
      card.style.display = (matchCat && matchSearch) ? 'grid' : 'none';
    });
  }

  if (newsPills.length > 0) {
    newsPills.forEach(pill => {
      pill.addEventListener('click', () => {
        activeNewsCat = pill.dataset.newsCat;
        newsPills.forEach(p => p.classList.toggle('active', p === pill));
        filterNewsArticles();
      });
    });
  }

  if (newsSearchInput) {
    newsSearchInput.addEventListener('input', () => {
      filterNewsArticles();
    });
  }

  // Interaktivitas Pagination Berita (Nomor Halaman & Panah)
  document.querySelectorAll('.news-pagination .page-num').forEach((btn, idx, allBtns) => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      allBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const pageText = this.textContent.trim();
      appToast(`Menampilkan arsip berita halaman ${pageText}`);
      const newsFeed = document.querySelector('.news-feed-main') || document.querySelector('.news-content-grid');
      if (newsFeed) {
        newsFeed.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Keyboard accessibility untuk Single Post Nav Pagination
  ['btn-prev-article', 'btn-next-article'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigateAdjacentArticle(id === 'btn-prev-article' ? 'prev' : 'next');
        }
      });
    }
  });

  // Keyboard Escape Handler
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeServiceDetail();
      closeMobileNav();
    }
  });

  // Sinkronisasi navigasi tombol browser Back/Forward (hashchange)
  window.addEventListener('hashchange', () => {
    const route = location.hash.replace('#', '') || 'home';
    navigate(route, false);
  });

  // Sinkronisasi route awal dari hash
  const initialHash = location.hash.replace('#', '') || 'home';
  navigate(initialHash, false);
});
