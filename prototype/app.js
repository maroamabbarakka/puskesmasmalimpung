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

const TOPIC_METRICS = {
  ckg: {
    title: 'Cakupan Skrining CKG 2026',
    status: 'Menunggu Verifikasi Data Triwulan',
    statusClass: '',
    desc: 'Indikator Cek Kesehatan Gratis tingkat kecamatan Malimpung. Angka resmi akan dirilis setelah proses rekonsiliasi data antara sistem puskesmas dan Dinas Kesehatan selesai.',
    kpi1_label: 'Skrining Tervalidasi',
    kpi1_val: '—',
    kpi1_sub: 'Pembilang belum disahkan',
    kpi2_label: 'Target Sasaran Ulang Tahun',
    kpi2_val: '—',
    kpi2_sub: 'Penyebut data kependudukan',
    kpi3_label: 'Persentase Capaian',
    kpi3_val: '—%',
    kpi3_sub: 'Tidak dihitung tanpa penyebut',
    updated: '17 September 2026'
  },
  kia: {
    title: 'Kesehatan Ibu, Bayi & Gizi Balita (KIA)',
    status: 'Data Terverifikasi PWS 2026',
    statusClass: 'verified',
    desc: 'Cakupan pelayanan antenatal (K4/K6) dan penimbangan balita di posyandu 6 desa binaan. Data dihimpun melalui kohort KIA dan sistem e-PPGBM.',
    kpi1_label: 'Cakupan K6 Ibu Hamil',
    kpi1_val: '—',
    kpi1_sub: 'Kohort KIA terverifikasi',
    kpi2_label: 'Balita Datang Ditimbang (D/S)',
    kpi2_val: '—',
    kpi2_sub: 'Rekapitulasi kader Posyandu',
    kpi3_label: 'Intervensi Stunting',
    kpi3_val: '100%',
    kpi3_sub: 'Bagi balita dengan status gizi kurang',
    updated: '17 September 2026'
  },
  ptm: {
    title: 'Deteksi Dini Penyakit Tidak Menular (PTM)',
    status: 'Menunggu Sinkronisasi Resmi',
    statusClass: '',
    desc: 'Skrining tekanan darah dan gula darah sewaktu bagi penduduk usia produktif (15-59 tahun) dan lansia. Hasil skrining bukan diagnosis definitif.',
    kpi1_label: 'Skrining Hipertensi',
    kpi1_val: '—',
    kpi1_sub: 'Faktor risiko terdeteksi',
    kpi2_label: 'Skrining Diabetes Melitus',
    kpi2_val: '—',
    kpi2_sub: 'Pemeriksaan gula darah puasa',
    kpi3_label: 'Rujukan Poli Penyakit Kronis',
    kpi3_val: '—',
    kpi3_sub: 'Tindak lanjut tata laksana medis',
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
// 4. ROUTING & NAVIGATION (DENGAN DUKUNGAN DEEP-LINKING SLUG)
// ---------------------------------------------------------------------------
const VALID_ROUTES = ['home', 'services', 'programs', 'insights', 'public', 'office', 'news'];

function navigate(fullRoute, scroll = true) {
  let [baseRoute, subSlug] = (fullRoute || 'home').split('/');
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
    news: 'Berita & Informasi Terkini — Puskesmas Malimpung'
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
// 6B. HEALTH ATLAS MAP ENGINE UNTUK BERANDA (#health-atlas-home-map)
// ---------------------------------------------------------------------------
let healthAtlasHomeMap = null;
let healthAtlasHomeGeoJsonLayer = null;

function initHealthAtlasHomeMap() {
  const mapContainer = document.getElementById('health-atlas-home-map');
  if (!mapContainer || healthAtlasHomeMap || typeof L === 'undefined') return;

  healthAtlasHomeMap = L.map('health-atlas-home-map', {
    center: [-3.729869, 119.73413],
    zoom: 12,
    scrollWheelZoom: false
  });

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | BIG Batas Wilayah'
  }).addTo(healthAtlasHomeMap);

  const villageStyles = {
    'malimpung': { color: '#059669', fillColor: '#10b981', fillOpacity: 0.35, weight: 2.5 },
    'padang loang': { color: '#2563eb', fillColor: '#3b82f6', fillOpacity: 0.35, weight: 2.5 },
    'maccirinna': { color: '#d97706', fillColor: '#f59e0b', fillOpacity: 0.35, weight: 2.5 }
  };

  const pkmIcon = L.divIcon({
    className: 'pkm-custom-marker',
    html: `<div style="background-color: #e11d48; width: 26px; height: 26px; border-radius: 50%; border: 3px solid #ffffff; box-shadow: 0 2px 8px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; color: white; font-weight: 800; font-size: 14px; line-height: 1;">+</div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 13]
  });

  const pkmMarker = L.marker([-3.729869, 119.73413], { icon: pkmIcon, title: 'Puskesmas Malimpung Induk' }).addTo(healthAtlasHomeMap);
  pkmMarker.bindPopup(`
    <div style="font-family: 'Plus Jakarta Sans', sans-serif; min-width: 210px; padding: 4px;">
      <span style="font-size: 10px; font-weight: 800; color: #087d79; text-transform: uppercase;">Puskesmas Induk</span>
      <h4 style="font-size: 14px; font-weight: 800; color: #18383A; margin: 3px 0;">Puskesmas Malimpung</h4>
      <p style="font-size: 11px; color: #4b5563; margin-bottom: 6px;">Benteng Malimpung, Patampanua, Pinrang</p>
      <a href="https://maps.app.goo.gl/YYYWShsgAxZoG2vW8" target="_blank" rel="noopener noreferrer" style="font-size: 11px; font-weight: 700; color: #087d79; text-decoration: none;">Buka Google Maps ↗</a>
    </div>
  `);

  fetch('assets/batas_wilayah_malimpung.geojson')
    .then(res => res.json())
    .then(geoData => {
      healthAtlasHomeGeoJsonLayer = L.geoJSON(geoData, {
        style: function(feature) {
          const name = (feature.properties.NAMOBJ || '').toLowerCase();
          for (const key in villageStyles) {
            if (name.includes(key)) return villageStyles[key];
          }
          return { color: '#64748b', fillColor: '#94a3b8', fillOpacity: 0.3, weight: 2 };
        },
        onEachFeature: function(feature, layer) {
          const p = feature.properties;
          layer.bindTooltip(`<strong>${p.TIPE} ${p.NAMOBJ}</strong>`, { sticky: true, direction: 'top' });
          layer.bindPopup(`
            <div style="font-family: 'Plus Jakarta Sans', sans-serif; min-width: 200px; padding: 4px;">
              <span style="font-size: 10px; font-weight: 800; color: #087d79; text-transform: uppercase;">${p.TIPE} BINAAN</span>
              <h4 style="font-size: 14px; font-weight: 800; color: #18383A; margin: 3px 0;">${p.TIPE} ${p.NAMOBJ}</h4>
              <p style="font-size: 11px; color: #6b7280; margin: 0;">Kode Kemendagri: <strong>${p.KODE_KEMENDAGRI}</strong></p>
              <p style="font-size: 11px; color: #15803d; font-weight: 600; margin-top: 4px;">Batas Resmi BIG 2023</p>
            </div>
          `);
          layer.on({
            mouseover: function(e) {
              e.target.setStyle({ fillOpacity: 0.6, weight: 3.5 });
            },
            mouseout: function(e) {
              healthAtlasHomeGeoJsonLayer.resetStyle(e.target);
            }
          });
        }
      }).addTo(healthAtlasHomeMap);

      healthAtlasHomeMap.fitBounds(healthAtlasHomeGeoJsonLayer.getBounds(), { padding: [20, 20] });
    })
    .catch(err => {
      console.warn('Gagal memuat GeoJSON batas wilayah BIG untuk Beranda:', err);
    });
}
window.initHealthAtlasHomeMap = initHealthAtlasHomeMap;

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
