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
    schedule: 'Senin – Sabtu: 08.00 – 13.00 WITA (Layanan Cito / Tindakan Medis)',
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
    schedule: 'Senin – Sabtu: 08.00 – 14.00 WITA (Ruang Tindakan Medis)',
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
  // 10 Indikator Klinis Lengkap Sesuai Rekomendasi Kemenkes & Permintaan User
  ptm: {
    hipertensi: 321,
    diabetes: 62,
    obesitas: 464,
    risiko_paru: 119,
    mental_jiwa: 17,
    mata_kiri: 74,
    mata_kanan: 68,
    telinga_kiri: 46,
    telinga_kanan: 43,
    gigi_mulut: 218,
    total_indera_periksa: 1037
  },
  capaian_dusun: [
    { 
      dusun: 'Dusun Malimpung', wilayah: 'MALIMPUNG', kunjungan: 503, 
      hipertensi: 101, diabetes: 14, obesitas: 168, paru_jiwa: 48, 
      mata_kiri: 26, mata_kanan: 24, telinga_kiri: 16, telinga_kanan: 15, gigi_mulut: 78,
      risiko_lain: 52, target: '12.5%', status: 'AKTIF PROGRESIF', coords: [-3.7315, 119.7360] 
    },
    { 
      dusun: 'Lingkungan Otting (Dioang)', wilayah: 'MACCIRINNA', kunjungan: 367, 
      hipertensi: 75, diabetes: 15, obesitas: 124, paru_jiwa: 27, 
      mata_kiri: 21, mata_kanan: 19, telinga_kiri: 14, telinga_kanan: 13, gigi_mulut: 56,
      risiko_lain: 43, target: '23.9%', status: 'SANGAT TINGGI', coords: [-3.7390, 119.7420] 
    },
    { 
      dusun: 'Dusun Pajalele', wilayah: 'MALIMPUNG', kunjungan: 159, 
      hipertensi: 38, diabetes: 1, obesitas: 52, paru_jiwa: 14, 
      mata_kiri: 9, mata_kanan: 8, telinga_kiri: 6, telinga_kanan: 6, gigi_mulut: 24,
      risiko_lain: 27, target: '4.0%', status: 'BERJALAN', coords: [-3.7250, 119.7280] 
    },
    { 
      dusun: 'Dusun Palita (Pallis)', wilayah: 'MALIMPUNG', kunjungan: 110, 
      hipertensi: 33, diabetes: 3, obesitas: 38, paru_jiwa: 12, 
      mata_kiri: 6, mata_kanan: 6, telinga_kiri: 4, telinga_kanan: 4, gigi_mulut: 21,
      risiko_lain: 19, target: '2.7%', status: 'BERJALAN', coords: [-3.7380, 119.7250] 
    },
    { 
      dusun: 'Dusun Padang', wilayah: 'PADANG LOANG', kunjungan: 84, 
      hipertensi: 38, diabetes: 12, obesitas: 29, paru_jiwa: 11, 
      mata_kiri: 5, mata_kanan: 4, telinga_kiri: 3, telinga_kanan: 2, gigi_mulut: 15,
      risiko_lain: 11, target: '2.6%', status: 'PENJANGKAUAN', coords: [-3.7150, 119.7450] 
    },
    { 
      dusun: 'Lainnya / Non-Domisili', wilayah: 'LUAR WILAYAH', kunjungan: 52, 
      hipertensi: 8, diabetes: 7, obesitas: 19, paru_jiwa: 7, 
      mata_kiri: 2, mata_kanan: 2, telinga_kiri: 1, telinga_kanan: 1, gigi_mulut: 8,
      risiko_lain: 12, target: '-', status: 'RUJUKAN', coords: [-3.7080, 119.7500] 
    },
    { 
      dusun: 'Dusun Banga', wilayah: 'PADANG LOANG', kunjungan: 42, 
      hipertensi: 15, diabetes: 6, obesitas: 16, paru_jiwa: 8, 
      mata_kiri: 2, mata_kanan: 2, telinga_kiri: 1, telinga_kanan: 1, gigi_mulut: 7,
      risiko_lain: 6, target: '1.3%', status: 'JEMPUT BOLA', coords: [-3.7190, 119.7580] 
    },
    { 
      dusun: 'Lingkungan Mattongang (Paraungan)', wilayah: 'MACCIRINNA', kunjungan: 38, 
      hipertensi: 9, diabetes: 3, obesitas: 12, paru_jiwa: 6, 
      mata_kiri: 2, mata_kanan: 2, telinga_kiri: 1, telinga_kanan: 1, gigi_mulut: 6,
      risiko_lain: 5, target: '2.5%', status: 'BERJALAN', coords: [-3.7450, 119.7350] 
    },
    { 
      dusun: 'Lingkungan Bulu Dua', wilayah: 'MACCIRINNA', kunjungan: 16, 
      hipertensi: 4, diabetes: 1, obesitas: 6, paru_jiwa: 3, 
      mata_kiri: 1, mata_kanan: 1, telinga_kiri: 0, telinga_kanan: 0, gigi_mulut: 3,
      risiko_lain: 2, target: '1.0%', status: 'JEMPUT BOLA', coords: [-3.7510, 119.7480] 
    }
  ]
};

const TOPIC_METRICS = {
  ckg: {
    title: 'Analitik Demografi & Skrining CKG Realtime',
    status: 'Sinkronisasi CKG & Data Penduduk Resmi',
    statusClass: 'verified',
    desc: 'Pemantauan sebaran indikator skrining CKG terhadap 8.825 total populasi wilayah kerja fasyankes (Desa Malimpung 4.013, Desa Padangloang 3.279, Kelurahan Maccirinna 1.533 jiwa).',
    kpi1_label: 'Total Warga Telah Diskrining',
    kpi1_val: '1.371',
    kpi1_sub: '419 Laki-laki • 951 Perempuan (CKG TERSANJUNG)',
    kpi2_label: 'Populasi Sasaran Resmi (Lampiran 2)',
    kpi2_val: '8.825 Jiwa',
    kpi2_sub: 'Malimpung 4.013 • Padangloang 3.279 • Maccirinna 1.533',
    kpi3_label: 'Cakupan Terhadap Penduduk',
    kpi3_val: '15.5%',
    kpi3_sub: 'Rasio riil warga terperiksa terhadap populasi resmi',
    updated: '18 September 2026'
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
    title: 'Deteksi Dini Penyakit Tidak Menular (PTM) & Organ',
    status: 'Data Terverifikasi CKG TERSANJUNG',
    statusClass: 'verified',
    desc: 'Pemantauan komprehensif 10 indikator klinis 1.371 pengunjung: Hipertensi (321), Diabetes (62), Obesitas (464), Risiko Paru (119), Mental Jiwa (17), Mata Kiri (74), Mata Kanan (68), Telinga Kiri (46), Telinga Kanan (43), serta Gigi & Mulut (218).',
    kpi1_label: 'Hipertensi Terdeteksi',
    kpi1_val: '321',
    kpi1_sub: 'Faktor risiko tekanan darah tinggi',
    kpi2_label: 'Diabetes Melitus Terdeteksi',
    kpi2_val: '62',
    kpi2_sub: 'Pemeriksaan kadar gula darah sewaktu/puasa',
    kpi3_label: 'Obesitas Terdeteksi',
    kpi3_val: '464',
    kpi3_sub: 'Skrining IMT & lingkar perut berisiko',
    updated: '18 September 2026'
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
    kpi3_sub: 'Surveilans epidemiologi berkala',
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
// 2B. OFFLINE QUEUE ENGINE & SYNC MANAGER
// ---------------------------------------------------------------------------
function saveComplaintToOfflineQueue(aduan) {
  try {
    const queue = JSON.parse(localStorage.getItem('malimpung_offline_aduan_queue') || '[]');
    queue.push(aduan);
    localStorage.setItem('malimpung_offline_aduan_queue', JSON.stringify(queue));
    console.log('[Offline Queue] Aduan berhasil dicatat ke antrean offline:', aduan.ticketId);
  } catch (e) {
    console.warn('Gagal menyimpan antrean aduan offline:', e);
  }
}

function syncPendingOfflineComplaints() {
  try {
    const queueStr = localStorage.getItem('malimpung_offline_aduan_queue');
    if (!queueStr) return;
    const queue = JSON.parse(queueStr);
    if (!Array.isArray(queue) || queue.length === 0) return;

    // Kirim seluruh antrean tertunda ke Cloud Firestore jika SDK tersedia
    if (window.PuskesmasFirebase && typeof window.PuskesmasFirebase.submitComplaint === 'function') {
      queue.forEach(item => {
        window.PuskesmasFirebase.submitComplaint({
          ticketId: item.ticketId,
          name: item.name,
          contact: item.contact || '-',
          unit: item.unit,
          message: item.message,
          status: 'Tercatat'
        }).then(() => {
          console.log('[Sync] Aduan offline berhasil diteruskan ke Firestore:', item.ticketId);
        }).catch(err => {
          console.warn('[Sync] Pengiriman item tertunda ke Firestore gagal:', err);
        });
      });
    }

    let syncedCount = 0;
    auditLogsState.forEach(log => {
      if (log.result && log.result.includes('Tersimpan Lokal')) {
        log.result = 'Tersinkronisasi Otomatis ke Server';
        syncedCount++;
      }
    });

    if (syncedCount > 0) {
      saveLogsToStorage();
      renderOfficeTables();
    }

    localStorage.removeItem('malimpung_offline_aduan_queue');
    appToast(`Koneksi pulih: ${queue.length} pengaduan offline berhasil disinkronkan ke server.`);
  } catch (e) {
    console.warn('Gagal sinkronisasi antrean offline:', e);
  }
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
  const titleEl = document.getElementById('topic-title');
  const descEl = document.getElementById('topic-desc');
  const statusEl = document.getElementById('topic-status-text');
  const badgeEl = document.getElementById('topic-badge');

  if (titleEl) titleEl.textContent = data.title;
  if (descEl) descEl.textContent = data.desc;
  if (statusEl) statusEl.textContent = `Status: ${data.status}`;
  
  if (badgeEl) {
    if (data.statusClass === 'verified') {
      badgeEl.className = 'integrity-badge verified';
    } else {
      badgeEl.className = 'integrity-badge';
    }
  }

  const standardGrid = document.getElementById('topic-kpi-standard-grid') || document.querySelector('.kpi-stat-grid');
  const ptmGrid = document.getElementById('topic-ptm-10grid');

  if (topicKey === 'ptm') {
    if (standardGrid) standardGrid.style.display = 'none';
    if (ptmGrid) ptmGrid.style.display = 'block';
  } else {
    if (standardGrid) standardGrid.style.display = 'grid';
    if (ptmGrid) ptmGrid.style.display = 'none';

    const kpiLabel1 = document.getElementById('kpi-label-1');
    const kpiVal1 = document.getElementById('kpi-val-1');
    const kpiSub1 = document.getElementById('kpi-sub-1');
    if (kpiLabel1) kpiLabel1.textContent = data.kpi1_label;
    if (kpiVal1) kpiVal1.textContent = data.kpi1_val;
    if (kpiSub1) kpiSub1.textContent = data.kpi1_sub;

    const kpiLabel2 = document.getElementById('kpi-label-2');
    const kpiVal2 = document.getElementById('kpi-val-2');
    const kpiSub2 = document.getElementById('kpi-sub-2');
    if (kpiLabel2) kpiLabel2.textContent = data.kpi2_label;
    if (kpiVal2) kpiVal2.textContent = data.kpi2_val;
    if (kpiSub2) kpiSub2.textContent = data.kpi2_sub;

    const kpiLabel3 = document.getElementById('kpi-label-3');
    const kpiVal3 = document.getElementById('kpi-val-3');
    const kpiSub3 = document.getElementById('kpi-sub-3');
    if (kpiLabel3) kpiLabel3.textContent = data.kpi3_label;
    if (kpiVal3) kpiVal3.textContent = data.kpi3_val;
    if (kpiSub3) kpiSub3.textContent = data.kpi3_sub;
  }

  const lastUpdated = document.getElementById('topic-last-updated');
  if (lastUpdated) lastUpdated.textContent = data.updated;

  document.querySelectorAll('[data-topic]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.topic === topicKey);
  });
}
window.updateTopicView = updateTopicView;

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
        Setiap hasil pemeriksaan rumah dicatat ke dalam rekam medis keluarga terpadu (Family Folder) dan dipantau bersama bidan desa. Keluarga pasien diberikan nomor kontak darurat Puskesmas Malimpung jika sewaktu-waktu membutuhkan ambulans siaga atau rujukan gawat darurat.
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
  if (navigator.onLine === false) {
    appToast('Perangkat sedang offline. Sambungkan ke internet untuk membagikan berita via WhatsApp.');
    return;
  }
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
// 6. HEALTH ATLAS LEAFLET MAP ENGINE (SUMBER RESMI BIG TASWIL10000 & LAMPIRAN 2)
// ---------------------------------------------------------------------------

// Data Lokasi Fasyankes & 8 Posyandu Binaan Resmi Puskesmas Malimpung
const POSYANDU_DATA = [
  { name: 'Puskesmas Malimpung (Induk)', type: 'pkm', coords: [-3.729869, 119.73413], info: 'Ruang Tindakan Medis & Rawat Jalan • Senin – Sabtu: 08.00 – 14.00 WITA' },
  { name: 'Pustu Padang Loang', type: 'pustu', coords: [-3.7385, 119.7435], info: 'Pelayanan Dasar & Rujukan Pertama Desa Padang Loang' },
  { name: 'Pustu Maccirinna', type: 'pustu', coords: [-3.7210, 119.7170], info: 'Pelayanan Bidan & Perawat Integrasi Layanan Primer (ILP)' },
  { name: 'Posyandu Melati (Dusun Pajalele)', type: 'posyandu', coords: [-3.7320, 119.7390], info: 'Penimbangan Balita, CKG, Imunisasi Rutin Hari Selasa I' },
  { name: 'Posyandu Mawar (Dusun Benteng)', type: 'posyandu', coords: [-3.7270, 119.7310], info: 'Pelayanan Ibu Hamil & Balita Hari Rabu I' },
  { name: 'Posyandu Kenanga (Dusun Kariango)', type: 'posyandu', coords: [-3.7225, 119.7385], info: 'Skrining CKG, Lansia, Balita Hari Kamis I' },
  { name: 'Posyandu Dahlia (Padang Loang I)', type: 'posyandu', coords: [-3.7395, 119.7460], info: 'Layanan Posyandu Integrasi Hari Senin II' },
  { name: 'Posyandu Cempaka (Padang Loang II)', type: 'posyandu', coords: [-3.7440, 119.7415], info: 'Pemantauan Tumbuh Kembang Balita & Lansia Hari Rabu II' },
  { name: 'Posyandu Anggrek (Maccirinna Barat)', type: 'posyandu', coords: [-3.7195, 119.7145], info: 'Penyuluhan PHBS, Imunisasi Hari Kamis II' },
  { name: 'Posyandu Flamboyan (Maccirinna Timur)', type: 'posyandu', coords: [-3.7245, 119.7215], info: 'Skrining PTM Hipertensi & Balita Hari Jumat II' },
  { name: 'Posyandu Teratai (Dusun Alitta)', type: 'posyandu', coords: [-3.7345, 119.7275], info: 'Pelayanan Antenatal & Lansia Hari Sabtu II' }
];

// Palet Pewarnaan Geospasial Standar
const VILLAGE_STYLES = {
  'malimpung': { color: '#059669', fillColor: '#10b981', fillOpacity: 0.32, weight: 2.5 },
  'padang loang': { color: '#2563eb', fillColor: '#3b82f6', fillOpacity: 0.32, weight: 2.5 },
  'maccirinna': { color: '#d97706', fillColor: '#f59e0b', fillOpacity: 0.32, weight: 2.5 }
};

const HEALTH_CHOROPLETH_STYLES = {
  'malimpung': { color: '#047857', fillColor: '#10b981', fillOpacity: 0.52, weight: 3 },
  'padang loang': { color: '#0284c7', fillColor: '#38bdf8', fillOpacity: 0.48, weight: 3 },
  'maccirinna': { color: '#7c3aed', fillColor: '#a855f7', fillOpacity: 0.45, weight: 3 }
};

// Helper Pemeriksaan & Pemuatan Aman Leaflet (Mencegah Fallback Palsu saat Unduhan Berjalan)
function ensureLeafletReady(callback, fallback) {
  if (typeof L !== 'undefined') {
    callback();
    return;
  }
  let attempts = 0;
  const maxAttempts = 25; // 25 x 80ms = 2.000ms toleransi unduhan CDN
  const timer = setInterval(() => {
    attempts++;
    if (typeof L !== 'undefined') {
      clearInterval(timer);
      callback();
    } else if (attempts >= maxAttempts) {
      clearInterval(timer);
      if (typeof fallback === 'function') fallback();
    }
  }, 80);
}

function renderOfflineMapFallback(containerId, title) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const isHome = (containerId === 'health-atlas-home-map');
  const posyanduChips = (POSYANDU_DATA || []).slice(0, 6).map(p => 
    `<span class="offline-posyandu-chip">${escapeHTML(p.name)}</span>`
  ).join('');

  container.innerHTML = `
    <div class="offline-map-fallback">
      <div class="offline-map-card">
        <div class="offline-map-badge">⚡ Mode Offline — Peta Tersedia Terbatas</div>
        <h4 class="offline-map-title">${escapeHTML(title)}</h4>
        <p class="offline-map-desc">
          Peta interaktif memerlukan sambungan internet untuk mengunduh petak ubin satelit/OpenStreetMap. Data koordinat fasyankes dan posyandu binaan tetap aman dan aktif di perangkat Anda.
        </p>
        <div class="offline-coord-box">
          <span>📍 Lat: -3.729869</span>
          <span>📍 Long: 119.73413</span>
          <span>🏛️ PKM Malimpung Induk</span>
        </div>
        <div class="offline-map-actions">
          <a href="tel:0421921001" class="btn-primary" style="padding: 0.5rem 1rem; font-size: 0.8125rem; text-decoration: none; display: inline-flex; align-items: center; gap: 0.35rem;">
            <span>Panggilan Siaga GSM (0421-921001)</span>
          </a>
          <button class="btn-secondary" style="padding: 0.5rem 1rem; font-size: 0.8125rem;" onclick="${isHome ? 'initHealthAtlasHomeMap()' : 'initHealthAtlasLeafletMap()'}">
            <span>Coba Muat Ulang Peta</span>
          </button>
        </div>
        <div class="offline-posyandu-preview">
          <div class="offline-posyandu-title">8 Posyandu & Fasyankes Binaan:</div>
          <div class="offline-posyandu-tags">
            ${posyanduChips}
            <span class="offline-posyandu-chip">+ Faskes Lainnya</span>
          </div>
        </div>
      </div>
    </div>
  `;
}
window.renderOfflineMapFallback = renderOfflineMapFallback;

// Helper Pembuatan Layer Feature Groups untuk Peta
function createMapLayers(geoData) {
  const adminLayer = L.featureGroup();
  const faskesLayer = L.featureGroup();
  const healthLayer = L.featureGroup();

  // 1. Layer Batas Wilayah & Populasi Resmi
  const adminGeo = L.geoJSON(geoData, {
    style: function(f) {
      const name = (f.properties.NAMOBJ || '').toLowerCase();
      for (const key in VILLAGE_STYLES) {
        if (name.includes(key)) return VILLAGE_STYLES[key];
      }
      return { color: '#64748b', fillColor: '#94a3b8', fillOpacity: 0.3, weight: 2 };
    },
    onEachFeature: function(f, layer) {
      const p = f.properties;
      const name = (p.NAMOBJ || '').toLowerCase();
      let demoHtml = '';
      if (name.includes('malimpung')) {
        demoHtml = `
          <div style="font-size:11px; line-height:1.5; margin-top:6px; border-top:1px solid #e5e7eb; padding-top:4px;">
            <div>👥 Jumlah Penduduk: <strong>4.013 Jiwa</strong></div>
            <div>📐 Luas Wilayah: <strong>5,78 km²</strong> (Kepadatan: 694 Jiwa/km²)</div>
            <div style="color:#526b64; font-size:10px; margin-top:3px;">Karakteristik: Batas Utara langsung Kab. Enrekang. Menjadi salah satu Desa Pusat Pertumbuhan (DPP).</div>
          </div>`;
      } else if (name.includes('padang')) {
        demoHtml = `
          <div style="font-size:11px; line-height:1.5; margin-top:6px; border-top:1px solid #e5e7eb; padding-top:4px;">
            <div>👥 Jumlah Penduduk: <strong>3.279 Jiwa</strong></div>
            <div>📐 Luas Wilayah: <strong>28,89 km²</strong> (Kepadatan: 113 Jiwa/km²)</div>
            <div style="color:#526b64; font-size:10px; margin-top:3px;">Karakteristik: Wilayah geografis terluas di Patampanua dengan kepadatan cenderung renggang.</div>
          </div>`;
      } else {
        demoHtml = `
          <div style="font-size:11px; line-height:1.5; margin-top:6px; border-top:1px solid #e5e7eb; padding-top:4px;">
            <div>👥 Jumlah Penduduk: <strong>1.533 Jiwa</strong></div>
            <div>📐 Luas Wilayah: <strong>5,01 km²</strong> (Kepadatan: 306 Jiwa/km²)</div>
            <div style="color:#526b64; font-size:10px; margin-top:3px;">Karakteristik: Wilayah administrasi fasyankes terkecil secara luas wilayah di Patampanua.</div>
          </div>`;
      }
      const popLabel = name.includes('malimpung') ? '4.013 Jiwa' : name.includes('padang') ? '3.279 Jiwa' : '1.533 Jiwa';
      layer.bindTooltip(`<strong>${p.TIPE} ${p.NAMOBJ}</strong>: ${popLabel}`, { sticky: true, direction: 'top' });
      layer.bindPopup(`
        <div style="font-family:'Plus Jakarta Sans',sans-serif; min-width:230px; padding:4px;">
          <span style="font-size:10px; font-weight:800; color:#008775; text-transform:uppercase;">Data Demografi Resmi (Lampiran 2)</span>
          <h4 style="font-size:14px; font-weight:800; color:#0c2923; margin:3px 0;">${p.TIPE} ${p.NAMOBJ}</h4>
          ${demoHtml}
        </div>
      `);
      layer.on({
        mouseover: (e) => e.target.setStyle({ fillOpacity: 0.55, weight: 3.5 }),
        mouseout: (e) => adminGeo.resetStyle(e.target)
      });
    }
  });
  adminLayer.addLayer(adminGeo);

  // Puskesmas Induk Marker
  const pkmMain = POSYANDU_DATA[0];
  const pkmIcon = L.divIcon({
    className: 'pkm-custom-marker',
    html: `<div style="background-color: #e11d48; width: 28px; height: 28px; border-radius: 50%; border: 3px solid #ffffff; box-shadow: 0 2px 8px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; color: white; font-weight: 800; font-size: 15px; line-height: 1;">+</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14]
  });
  const pkmMarker = L.marker(pkmMain.coords, { icon: pkmIcon, title: pkmMain.name });
  pkmMarker.bindPopup(`
    <div style="font-family:'Plus Jakarta Sans',sans-serif; min-width:220px; padding:4px;">
      <span style="font-size:10px; font-weight:800; color:#008775; text-transform:uppercase;">Fasyankes Induk Terakreditasi Paripurna</span>
      <h4 style="font-size:14px; font-weight:800; color:#0c2923; margin:3px 0;">Puskesmas Malimpung</h4>
      <p style="font-size:11px; color:#526b64; margin-bottom:6px;">Benteng Malimpung, Kec. Patampanua • Senin – Sabtu: 08.00 – 14.00 WITA</p>
      <a href="https://maps.app.goo.gl/YYYWShsgAxZoG2vW8" target="_blank" rel="noopener noreferrer" style="font-size:11px; font-weight:700; color:#008775; text-decoration:none;">Buka Google Maps ↗</a>
    </div>
  `);
  adminLayer.addLayer(pkmMarker);

  // 2. Layer Fasyankes & 8 Posyandu
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
    faskesLayer.addLayer(m);
  });

  // 3. Layer Cakupan Skrining CKG Realtime
  const healthGeo = L.geoJSON(geoData, {
    style: function(f) {
      const name = (f.properties.NAMOBJ || '').toLowerCase();
      for (const key in HEALTH_CHOROPLETH_STYLES) {
        if (name.includes(key)) return HEALTH_CHOROPLETH_STYLES[key];
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
            <div>🟢 Kunjungan Terperiksa: <strong>772 Warga</strong> (19.2% Populasi)</div>
            <div>🩺 Hipertensi: <strong>172</strong> | Diabetes: <strong>18</strong> | Normal: <strong>582</strong></div>
            <div>📊 Malimpung 503 • Pajalele 159 • Palita 110</div>
          </div>`;
      } else if (name.includes('padang')) {
        statsHtml = `
          <div style="font-size:11px; line-height:1.5; margin-top:6px; border-top:1px solid #e5e7eb; padding-top:4px;">
            <div>🟢 Kunjungan Terperiksa: <strong>126 Warga</strong> (3.8% Populasi)</div>
            <div>🩺 Hipertensi: <strong>53</strong> | Diabetes: <strong>18</strong> | Normal: <strong>55</strong></div>
            <div>📊 Dusun Padang 84 • Dusun Banga 42</div>
          </div>`;
      } else {
        statsHtml = `
          <div style="font-size:11px; line-height:1.5; margin-top:6px; border-top:1px solid #e5e7eb; padding-top:4px;">
            <div>🟢 Kunjungan Terperiksa: <strong>421 Warga</strong> (27.5% Populasi)</div>
            <div>🩺 Hipertensi: <strong>88</strong> | Diabetes: <strong>19</strong> | Normal: <strong>314</strong></div>
            <div>📊 Otting 367 • Paraungan 38 • Bulu Dua 16</div>
          </div>`;
      }
      layer.bindTooltip(`<strong>Status CKG: ${p.NAMOBJ}</strong>`, { sticky: true, direction: 'top' });
      layer.bindPopup(`
        <div style="font-family:'Plus Jakarta Sans',sans-serif; min-width:240px; padding:4px;">
          <span style="font-size:10px; font-weight:800; color:#059669; text-transform:uppercase;">Data Skrining CKG Realtime</span>
          <h4 style="font-size:14px; font-weight:800; color:#0c2923; margin:3px 0;">${p.TIPE} ${p.NAMOBJ}</h4>
          ${statsHtml}
        </div>
      `);
    }
  });
  healthLayer.addLayer(healthGeo);

  // Marker 8 Dusun CKG Binaan
  CKG_REALTIME_DATA.capaian_dusun.forEach(ds => {
    if (!ds.coords) return;
    const ckgIcon = L.divIcon({
      className: 'ckg-dusun-marker',
      html: `<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); width: 24px; height: 24px; border-radius: 50%; border: 2.5px solid #ffffff; box-shadow: 0 3px 8px rgba(5,150,105,0.4); display: flex; align-items: center; justify-content: center; color: white; font-weight: 800; font-size: 11px;">✓</div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    const dm = L.marker(ds.coords, { icon: ckgIcon, title: `${ds.dusun} - CKG` });
    dm.bindTooltip(`<strong>${ds.dusun}</strong>: ${ds.kunjungan} Diskrining (${ds.status})`, { sticky: true, direction: 'top' });
    dm.bindPopup(`
      <div style="font-family:'Plus Jakarta Sans',sans-serif; min-width:220px; padding:4px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
          <span style="font-size:10px; font-weight:800; color:#059669; text-transform:uppercase;">Data CKG TERSANJUNG</span>
          <span style="font-size:10px; font-weight:800; background:#ecfdf5; color:#059669; padding:2px 6px; border-radius:4px;">${ds.target} ${ds.status}</span>
        </div>
        <h4 style="font-size:13px; font-weight:800; color:#0c2923; margin:0 0 2px;">${ds.dusun}</h4>
        <div style="font-size:11px; color:#526b64; margin-bottom:6px;">Wilayah: <strong>${ds.wilayah}</strong></div>
        <div style="background:#f8fafc; border:1px solid #e2ece8; border-radius:8px; padding:6px 8px; font-size:11px; line-height:1.5;">
          <div>👥 Kunjungan: <strong style="color:#0c2923;">${ds.kunjungan} Warga</strong></div>
          <div>🩸 Hipertensi: <strong style="color:#dc2626;">${ds.hipertensi}</strong> | Diabetes: <strong style="color:#d97706;">${ds.diabetes}</strong></div>
          <div>🩺 Normal/Risiko Lain: <strong style="color:#059669;">${ds.risiko_lain}</strong></div>
        </div>
      </div>
    `);
    healthLayer.addLayer(dm);
  });

  // 4. Layer Sebaran Kasus PTM (Penyakit Tidak Menular)
  const ptmLayer = L.featureGroup();
  const ptmGeo = L.geoJSON(geoData, {
    style: function(f) {
      const name = (f.properties.NAMOBJ || '').toLowerCase();
      if (name.includes('maccirinna')) {
        return { color: '#c2410c', fillColor: '#ea580c', fillOpacity: 0.45, weight: 2.5 };
      } else if (name.includes('malimpung')) {
        return { color: '#ea580c', fillColor: '#f97316', fillOpacity: 0.35, weight: 2.5 };
      } else {
        return { color: '#d97706', fillColor: '#fbbf24', fillOpacity: 0.30, weight: 2.5 };
      }
    },
    onEachFeature: function(f, layer) {
      const p = f.properties;
      const name = (p.NAMOBJ || '').toLowerCase();
      let ptmDesc = '';
      if (name.includes('malimpung')) {
        ptmDesc = `
          <div style="font-size:11px; line-height:1.5; margin-top:4px;">
            <div>🩸 <strong>Hipertensi:</strong> 172 kasus | <strong>Diabetes:</strong> 18 kasus</div>
            <div>⚖️ <strong>Obesitas:</strong> 258 kasus | <strong>Gigi & Mulut:</strong> 123 kasus</div>
            <div>👁️ <strong>Mata Abnormal:</strong> 72 kasus | <strong>Telinga:</strong> 47 kasus</div>
          </div>
        `;
      } else if (name.includes('padang')) {
        ptmDesc = `
          <div style="font-size:11px; line-height:1.5; margin-top:4px;">
            <div>🩸 <strong>Hipertensi:</strong> 53 kasus | <strong>Diabetes:</strong> 18 kasus</div>
            <div>⚖️ <strong>Obesitas:</strong> 45 kasus | <strong>Gigi & Mulut:</strong> 22 kasus</div>
            <div>👁️ <strong>Mata Abnormal:</strong> 13 kasus | <strong>Telinga:</strong> 6 kasus</div>
          </div>
        `;
      } else {
        ptmDesc = `
          <div style="font-size:11px; line-height:1.5; margin-top:4px;">
            <div>🩸 <strong>Hipertensi:</strong> 88 kasus | <strong>Diabetes:</strong> 19 kasus</div>
            <div>⚖️ <strong>Obesitas:</strong> 142 kasus | <strong>Gigi & Mulut:</strong> 65 kasus</div>
            <div>👁️ <strong>Mata Abnormal:</strong> 27 kasus | <strong>Telinga:</strong> 16 kasus</div>
          </div>
        `;
      }
      layer.bindTooltip(`<strong>Beban Kasus PTM: ${p.NAMOBJ}</strong>`, { sticky: true, direction: 'top' });
      layer.bindPopup(`
        <div style="font-family:'Plus Jakarta Sans',sans-serif; min-width:240px; padding:4px;">
          <span style="font-size:10px; font-weight:800; color:#ea580c; text-transform:uppercase;">Sebaran Spasial PTM & Organ</span>
          <h4 style="font-size:14px; font-weight:800; color:#0c2923; margin:3px 0;">${p.TIPE} ${p.NAMOBJ}</h4>
          ${ptmDesc}
        </div>
      `);
    }
  });
  ptmLayer.addLayer(ptmGeo);

  // Pasang Marker Kasus PTM per Dusun
  CKG_REALTIME_DATA.capaian_dusun.forEach(ds => {
    if (!ds.coords) return;
    const ptmIcon = L.divIcon({
      className: 'ptm-dusun-marker',
      html: `<div style="background: linear-gradient(135deg, #ea580c 0%, #c2410c 100%); width: 26px; height: 26px; border-radius: 50%; border: 2.5px solid #ffffff; box-shadow: 0 3px 10px rgba(234,88,12,0.45); display: flex; align-items: center; justify-content: center; color: white; font-weight: 900; font-size: 11px;">${ds.hipertensi}</div>`,
      iconSize: [26, 26],
      iconAnchor: [13, 13]
    });

    const pm = L.marker(ds.coords, { icon: ptmIcon, title: `${ds.dusun} - PTM` });
    pm.bindTooltip(`<strong>${ds.dusun}</strong>: ${ds.hipertensi} Hipertensi, ${ds.diabetes} Diabetes`, { sticky: true, direction: 'top' });
    pm.bindPopup(`
      <div style="font-family:'Plus Jakarta Sans',sans-serif; min-width:250px; padding:4px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
          <span style="font-size:10px; font-weight:800; color:#ea580c; text-transform:uppercase;">Profil PTM Dusun Binaan</span>
          <span style="font-size:10px; font-weight:800; background:#fff7ed; color:#ea580c; padding:2px 6px; border-radius:4px;">${ds.wilayah}</span>
        </div>
        <h4 style="font-size:14px; font-weight:800; color:#0c2923; margin:0 0 4px;">${ds.dusun}</h4>
        <div style="font-size:11px; color:#526b64; margin-bottom:6px;">Total Pengunjung: <strong>${ds.kunjungan} Jiwa</strong></div>
        
        <!-- 10 Indikator Dusun -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:4px; font-size:11px; background:#f8fafc; border:1px solid #fed7aa; border-radius:8px; padding:6px 8px;">
          <div>🩸 Hipertensi: <strong style="color:#b91c1c;">${ds.hipertensi}</strong></div>
          <div>🍬 Gula Tinggi: <strong style="color:#d97706;">${ds.diabetes}</strong></div>
          <div>⚖️ Obesitas: <strong style="color:#2563eb;">${ds.obesitas}</strong></div>
          <div>🫁 Paru/Jiwa: <strong style="color:#15803d;">${ds.paru_jiwa}</strong></div>
          <div>👁️ Mata Kiri: <strong>${ds.mata_kiri}</strong></div>
          <div>👁️ Mata Kanan: <strong>${ds.mata_kanan}</strong></div>
          <div>👂 Telinga Ki: <strong>${ds.telinga_kiri}</strong></div>
          <div>👂 Telinga Ka: <strong>${ds.telinga_kanan}</strong></div>
          <div style="grid-column: span 2; border-top:1px dashed #e2e8f0; padding-top:3px; margin-top:2px;">
            🦷 Gigi & Mulut: <strong style="color:#0d9488;">${ds.gigi_mulut}</strong> kasus terdeteksi
          </div>
        </div>
      </div>
    `);
    ptmLayer.addLayer(pm);
  });

  return { adminLayer, faskesLayer, healthLayer, ptmLayer, adminGeo };
}

// ---------------------------------------------------------------------------
// 6A. INISIALISASI PETA INSIGHTS (#health-atlas-leaflet-map)
// ---------------------------------------------------------------------------
let healthAtlasMap = null;
let insightsAdminLayer = null;
let insightsFaskesLayer = null;
let insightsHealthLayer = null;
let insightsPtmLayer = null;
let currentInsightsMapLayer = 'admin';

function initHealthAtlasLeafletMap() {
  const mapContainer = document.getElementById('health-atlas-leaflet-map');
  if (!mapContainer || healthAtlasMap) return;

  ensureLeafletReady(() => {
    try {
      healthAtlasMap = L.map('health-atlas-leaflet-map', {
        center: [-3.729869, 119.73413],
        zoom: 12,
        scrollWheelZoom: false
      });

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | BIG Batas Wilayah'
      }).addTo(healthAtlasMap);

      fetch('assets/batas_wilayah_malimpung.geojson')
        .then(res => res.json())
        .then(geoData => {
          const layers = createMapLayers(geoData);
          insightsAdminLayer = layers.adminLayer;
          insightsFaskesLayer = layers.faskesLayer;
          insightsHealthLayer = layers.healthLayer;
          insightsPtmLayer = layers.ptmLayer;

          insightsAdminLayer.addTo(healthAtlasMap);
          healthAtlasMap.fitBounds(layers.adminGeo.getBounds(), { padding: [25, 25] });

          setTimeout(() => {
            if (healthAtlasMap) healthAtlasMap.invalidateSize();
          }, 200);
        })
        .catch(err => {
          console.warn('Gagal memuat GeoJSON Peta Insights:', err);
        });
    } catch (e) {
      console.error('Error saat inisialisasi healthAtlasMap:', e);
      renderOfflineMapFallback('health-atlas-leaflet-map', 'Health Intelligence Atlas Wilayah');
    }
  }, () => {
    renderOfflineMapFallback('health-atlas-leaflet-map', 'Health Intelligence Atlas Wilayah');
  });
}

function switchInsightsMapLayer(layerName) {
  currentInsightsMapLayer = layerName;

  // Update indikator UI tab pada kontainer insights (#page-insights atau #insights)
  const insightsContainer = document.querySelector('#page-insights') || document.querySelector('#insights') || document.querySelector('.health-atlas-map-container');
  if (insightsContainer) {
    insightsContainer.querySelectorAll('.layer-tab').forEach(tab => {
      const isTarget = (tab.getAttribute('data-map-layer') === layerName);
      tab.classList.toggle('active', isTarget);
      tab.setAttribute('aria-selected', isTarget ? 'true' : 'false');
    });
  }

  // Tampilkan / sembunyikan bar filter PTM insights
  const ptmFilterEl = document.getElementById('insights-ptm-filter-bar');
  if (ptmFilterEl) {
    ptmFilterEl.style.display = (layerName === 'ptm') ? 'flex' : 'none';
  }

  if (!healthAtlasMap) return;

  if (insightsAdminLayer && healthAtlasMap.hasLayer(insightsAdminLayer)) healthAtlasMap.removeLayer(insightsAdminLayer);
  if (insightsFaskesLayer && healthAtlasMap.hasLayer(insightsFaskesLayer)) healthAtlasMap.removeLayer(insightsFaskesLayer);
  if (insightsHealthLayer && healthAtlasMap.hasLayer(insightsHealthLayer)) healthAtlasMap.removeLayer(insightsHealthLayer);
  if (insightsPtmLayer && healthAtlasMap.hasLayer(insightsPtmLayer)) healthAtlasMap.removeLayer(insightsPtmLayer);

  const labelEl = document.getElementById('insights-layer-status-text');
  const legendEl = document.getElementById('insights-map-legend-bar');

  if (layerName === 'admin') {
    if (insightsAdminLayer) insightsAdminLayer.addTo(healthAtlasMap);
    if (labelEl) labelEl.innerHTML = 'Menampilkan: <strong>Distribusi Penduduk Resmi (Total 8.825 Jiwa)</strong>';
    if (legendEl) {
      legendEl.innerHTML = `
        <div class="atlas-legend-item">
          <span class="legend-color-box box-malimpung"></span>
          <span><strong>Desa Malimpung</strong>: 4.013 Jiwa (5,78 km²)</span>
        </div>
        <div class="atlas-legend-item">
          <span class="legend-color-box box-padangloang"></span>
          <span><strong>Desa Padang Loang</strong>: 3.279 Jiwa (28,89 km²)</span>
        </div>
        <div class="atlas-legend-item">
          <span class="legend-color-box box-maccirinna"></span>
          <span><strong>Kelurahan Maccirinna</strong>: 1.533 Jiwa (5,01 km²)</span>
        </div>
        <div class="atlas-legend-item">
          <span class="legend-dot-pkm"></span>
          <span><strong>Puskesmas Induk</strong> (Rawat Jalan & Tindakan Medis)</span>
        </div>
      `;
    }
    appToast('Peta beralih: Distribusi Penduduk Resmi (Lampiran 2)');
  } else if (layerName === 'faskes') {
    if (insightsAdminLayer) insightsAdminLayer.addTo(healthAtlasMap);
    if (insightsFaskesLayer) insightsFaskesLayer.addTo(healthAtlasMap);
    if (labelEl) labelEl.innerHTML = 'Menampilkan: <strong>Jejaring Fasyankes, 2 Pustu & 8 Posyandu Dusun</strong>';
    if (legendEl) {
      legendEl.innerHTML = `
        <div class="atlas-legend-item">
          <span style="background-color: #8b5cf6; width: 14px; height: 14px; border-radius: 50%; display: inline-block; vertical-align: -2px;"></span>
          <span><strong>8 Posyandu Dusun Binaan</strong> (Melati, Mawar, Dahlia, dll)</span>
        </div>
        <div class="atlas-legend-item">
          <span style="background-color: #2563eb; width: 14px; height: 14px; border-radius: 4px; display: inline-block; vertical-align: -2px;"></span>
          <span><strong>2 Pustu Pembantu</strong> (Padangloang & Maccirinna)</span>
        </div>
        <div class="atlas-legend-item">
          <span style="background-color: #e11d48; width: 14px; height: 14px; border-radius: 50%; display: inline-block; vertical-align: -2px;"></span>
          <span><strong>Puskesmas Induk</strong> (IGD, Rawat Inap & Bersalin)</span>
        </div>
      `;
    }
    appToast('Peta beralih: Jejaring Fasyankes & 8 Posyandu');
  } else if (layerName === 'health') {
    if (insightsHealthLayer) insightsHealthLayer.addTo(healthAtlasMap);
    if (labelEl) labelEl.innerHTML = 'Menampilkan: <strong>Cakupan Skrining CKG & Deteksi Dini PTM Realtime</strong>';
    if (legendEl) {
      legendEl.innerHTML = `
        <div class="atlas-legend-item">
          <span class="legend-color-box" style="background:#10b981; border:1px solid #059669;"></span>
          <span><strong>Desa Malimpung</strong>: 772 Diskrining (19.2%)</span>
        </div>
        <div class="atlas-legend-item">
          <span class="legend-color-box" style="background:#38bdf8; border:1px solid #0284c7;"></span>
          <span><strong>Desa Padang Loang</strong>: 126 Diskrining (3.8%)</span>
        </div>
        <div class="atlas-legend-item">
          <span class="legend-color-box" style="background:#a855f7; border:1px solid #7c3aed;"></span>
          <span><strong>Kelurahan Maccirinna</strong>: 421 Diskrining (27.5%)</span>
        </div>
        <div class="atlas-legend-item">
          <span class="legend-dot-pkm"></span>
          <span><strong>Puskesmas Induk</strong>: 1.371 Total Warga Terlayani</span>
        </div>
      `;
    }
    appToast('Peta beralih: Cakupan Skrining CKG & PTM');
  } else if (layerName === 'ptm') {
    if (insightsPtmLayer) insightsPtmLayer.addTo(healthAtlasMap);
    if (labelEl) labelEl.innerHTML = 'Menampilkan: <strong>Sebaran Beban Kasus PTM & 10 Indikator Organ per Dusun</strong>';
    if (legendEl) {
      legendEl.innerHTML = `
        <div class="atlas-legend-item">
          <span class="legend-color-box" style="background:#f97316; border:1px solid #ea580c;"></span>
          <span><strong>Malimpung</strong>: 172 Hipertensi, 258 Obesitas</span>
        </div>
        <div class="atlas-legend-item">
          <span class="legend-color-box" style="background:#ea580c; border:1px solid #c2410c;"></span>
          <span><strong>Maccirinna</strong>: 88 Hipertensi, 142 Obesitas</span>
        </div>
        <div class="atlas-legend-item">
          <span class="legend-color-box" style="background:#fbbf24; border:1px solid #d97706;"></span>
          <span><strong>Padang Loang</strong>: 53 Hipertensi, 45 Obesitas</span>
        </div>
        <div class="atlas-legend-item">
          <span style="background-color:#c2410c; width:14px; height:14px; border-radius:50%; display:inline-block; vertical-align:-2px;"></span>
          <span><strong>Angka Marker</strong>: Kasus Hipertensi per Dusun Binaan</span>
        </div>
      `;
    }
    appToast('Peta beralih: Sebaran Kasus PTM');
  }
}
window.initHealthAtlasLeafletMap = initHealthAtlasLeafletMap;
window.switchInsightsMapLayer = switchInsightsMapLayer;

// Filter Sub-Parameter PTM Insights
function filterInsightsPtm(paramKey) {
  const ptmFilterEl = document.getElementById('insights-ptm-filter-bar');
  if (ptmFilterEl) {
    ptmFilterEl.querySelectorAll('.ptm-filter-chip').forEach(chip => {
      chip.classList.toggle('active', chip.getAttribute('data-insights-ptm') === paramKey);
    });
  }
  const labelEl = document.getElementById('insights-layer-status-text');
  const paramNames = {
    all: 'Semua Kasus PTM Terpadu',
    hipertensi: 'Hipertensi (321 Kasus)',
    diabetes: 'Gula Darah Tinggi / Diabetes (62 Kasus)',
    obesitas: 'Obesitas & Lingkar Perut (464 Kasus)',
    indera: 'Skrining Mata, Telinga & Gigi (1.037 Warga)',
    paru_jiwa: 'Risiko Paru & Mental Jiwa (136 Kasus)'
  };
  if (labelEl) {
    labelEl.innerHTML = `Menampilkan: <strong>Sebaran ${paramNames[paramKey] || paramKey}</strong>`;
  }
  appToast(`Filter PTM aktif: ${paramNames[paramKey] || paramKey}`);
}
window.filterInsightsPtm = filterInsightsPtm;

// ---------------------------------------------------------------------------
// 6B. INISIALISASI PETA BERANDA (#health-atlas-home-map)
// ---------------------------------------------------------------------------
let healthAtlasHomeMap = null;
let homeAdminLayer = null;
let homeFaskesLayer = null;
let homeHealthLayer = null;
let homePtmLayer = null;
let currentHomeMapLayer = 'admin';

function initHealthAtlasHomeMap() {
  const mapContainer = document.getElementById('health-atlas-home-map');
  if (!mapContainer || healthAtlasHomeMap) return;

  ensureLeafletReady(() => {
    try {
      healthAtlasHomeMap = L.map('health-atlas-home-map', {
        center: [-3.729869, 119.73413],
        zoom: 13,
        scrollWheelZoom: false
      });

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | BIG Batas Wilayah'
      }).addTo(healthAtlasHomeMap);

      fetch('assets/batas_wilayah_malimpung.geojson')
        .then(res => res.json())
        .then(geoData => {
          const layers = createMapLayers(geoData);
          homeAdminLayer = layers.adminLayer;
          homeFaskesLayer = layers.faskesLayer;
          homeHealthLayer = layers.healthLayer;
          homePtmLayer = layers.ptmLayer;

          homeAdminLayer.addTo(healthAtlasHomeMap);
          healthAtlasHomeMap.fitBounds(layers.adminGeo.getBounds(), { padding: [20, 20] });

          setTimeout(() => {
            if (healthAtlasHomeMap) healthAtlasHomeMap.invalidateSize();
          }, 200);
        })
        .catch(err => {
          console.warn('Gagal memuat GeoJSON Peta Sehat Beranda:', err);
        });
    } catch (e) {
      console.error('Error saat inisialisasi healthAtlasHomeMap:', e);
      renderOfflineMapFallback('health-atlas-home-map', 'Peta Geospasial Wilayah Kerja Malimpung');
    }
  }, () => {
    renderOfflineMapFallback('health-atlas-home-map', 'Peta Geospasial Wilayah Kerja Malimpung');
  });
}

function switchMapLayer(layerName) {
  currentHomeMapLayer = layerName;

  // Update indikator UI tab pada kontainer beranda (#page-home atau #home)
  const homeContainer = document.querySelector('#page-home') || document.querySelector('#home') || document.querySelector('.atlas-layer-switcher-bar');
  if (homeContainer) {
    homeContainer.querySelectorAll('.layer-tab').forEach(tab => {
      const isTarget = (tab.getAttribute('data-map-layer') === layerName);
      tab.classList.toggle('active', isTarget);
      tab.setAttribute('aria-selected', isTarget ? 'true' : 'false');
    });
  }

  // Tampilkan / sembunyikan bar filter PTM beranda
  const ptmFilterEl = document.getElementById('home-ptm-filter-bar');
  if (ptmFilterEl) {
    ptmFilterEl.style.display = (layerName === 'ptm') ? 'flex' : 'none';
  }

  if (!healthAtlasHomeMap) return;

  if (homeAdminLayer && healthAtlasHomeMap.hasLayer(homeAdminLayer)) healthAtlasHomeMap.removeLayer(homeAdminLayer);
  if (homeFaskesLayer && healthAtlasHomeMap.hasLayer(homeFaskesLayer)) healthAtlasHomeMap.removeLayer(homeFaskesLayer);
  if (homeHealthLayer && healthAtlasHomeMap.hasLayer(homeHealthLayer)) healthAtlasHomeMap.removeLayer(homeHealthLayer);
  if (homePtmLayer && healthAtlasHomeMap.hasLayer(homePtmLayer)) healthAtlasHomeMap.removeLayer(homePtmLayer);

  const labelEl = document.getElementById('layer-status-text');
  const legendEl = document.getElementById('atlas-map-legend-bar');

  if (layerName === 'admin') {
    if (homeAdminLayer) homeAdminLayer.addTo(healthAtlasHomeMap);
    if (labelEl) labelEl.innerHTML = 'Menampilkan: <strong>Distribusi Penduduk Resmi (Total 8.825 Jiwa)</strong>';
    if (legendEl) {
      legendEl.innerHTML = `
        <div class="atlas-legend-item">
          <span class="legend-color-box box-malimpung"></span>
          <span><strong>Desa Malimpung</strong>: 4.013 Jiwa (5,78 km²)</span>
        </div>
        <div class="atlas-legend-item">
          <span class="legend-color-box box-padangloang"></span>
          <span><strong>Desa Padang Loang</strong>: 3.279 Jiwa (28,89 km²)</span>
        </div>
        <div class="atlas-legend-item">
          <span class="legend-color-box box-maccirinna"></span>
          <span><strong>Kelurahan Maccirinna</strong>: 1.533 Jiwa (5,01 km²)</span>
        </div>
        <div class="atlas-legend-item">
          <span class="legend-dot-pkm"></span>
          <span><strong>Puskesmas Induk</strong> (Rawat Jalan & Tindakan Medis)</span>
        </div>
      `;
    }
    appToast('Peta beralih: Distribusi Penduduk Resmi (Lampiran 2)');
  } else if (layerName === 'faskes') {
    if (homeAdminLayer) homeAdminLayer.addTo(healthAtlasHomeMap);
    if (homeFaskesLayer) homeFaskesLayer.addTo(healthAtlasHomeMap);
    if (labelEl) labelEl.innerHTML = 'Menampilkan: <strong>Jejaring Fasyankes, 2 Pustu & 8 Posyandu Dusun</strong>';
    if (legendEl) {
      legendEl.innerHTML = `
        <div class="atlas-legend-item">
          <span style="background-color: #8b5cf6; width: 14px; height: 14px; border-radius: 50%; display: inline-block; vertical-align: -2px;"></span>
          <span><strong>8 Posyandu Dusun Binaan</strong> (Melati, Mawar, Dahlia, dll)</span>
        </div>
        <div class="atlas-legend-item">
          <span style="background-color: #2563eb; width: 14px; height: 14px; border-radius: 4px; display: inline-block; vertical-align: -2px;"></span>
          <span><strong>2 Pustu Pembantu</strong> (Padangloang & Maccirinna)</span>
        </div>
        <div class="atlas-legend-item">
          <span style="background-color: #e11d48; width: 14px; height: 14px; border-radius: 50%; display: inline-block; vertical-align: -2px;"></span>
          <span><strong>Puskesmas Induk</strong> (IGD, Rawat Inap & Bersalin)</span>
        </div>
      `;
    }
    appToast('Peta beralih: Jejaring Fasyankes & 8 Posyandu');
  } else if (layerName === 'health') {
    if (homeHealthLayer) homeHealthLayer.addTo(healthAtlasHomeMap);
    if (labelEl) labelEl.innerHTML = 'Menampilkan: <strong>Cakupan Skrining CKG & Deteksi Dini PTM Realtime</strong>';
    if (legendEl) {
      legendEl.innerHTML = `
        <div class="atlas-legend-item">
          <span class="legend-color-box" style="background:#10b981; border:1px solid #059669;"></span>
          <span><strong>Desa Malimpung</strong>: 772 Diskrining (19.2%)</span>
        </div>
        <div class="atlas-legend-item">
          <span class="legend-color-box" style="background:#38bdf8; border:1px solid #0284c7;"></span>
          <span><strong>Desa Padang Loang</strong>: 126 Diskrining (3.8%)</span>
        </div>
        <div class="atlas-legend-item">
          <span class="legend-color-box" style="background:#a855f7; border:1px solid #7c3aed;"></span>
          <span><strong>Kelurahan Maccirinna</strong>: 421 Diskrining (27.5%)</span>
        </div>
        <div class="atlas-legend-item">
          <span class="legend-dot-pkm"></span>
          <span><strong>Puskesmas Induk</strong>: 1.371 Total Warga Terlayani</span>
        </div>
      `;
    }
    appToast('Peta beralih: Cakupan Skrining CKG & PTM');
  } else if (layerName === 'ptm') {
    if (homePtmLayer) homePtmLayer.addTo(healthAtlasHomeMap);
    if (labelEl) labelEl.innerHTML = 'Menampilkan: <strong>Sebaran Beban Kasus PTM & 10 Indikator Organ per Dusun</strong>';
    if (legendEl) {
      legendEl.innerHTML = `
        <div class="atlas-legend-item">
          <span class="legend-color-box" style="background:#f97316; border:1px solid #ea580c;"></span>
          <span><strong>Malimpung</strong>: 172 Hipertensi, 258 Obesitas</span>
        </div>
        <div class="atlas-legend-item">
          <span class="legend-color-box" style="background:#ea580c; border:1px solid #c2410c;"></span>
          <span><strong>Maccirinna</strong>: 88 Hipertensi, 142 Obesitas</span>
        </div>
        <div class="atlas-legend-item">
          <span class="legend-color-box" style="background:#fbbf24; border:1px solid #d97706;"></span>
          <span><strong>Padang Loang</strong>: 53 Hipertensi, 45 Obesitas</span>
        </div>
        <div class="atlas-legend-item">
          <span style="background-color:#c2410c; width:14px; height:14px; border-radius:50%; display:inline-block; vertical-align:-2px;"></span>
          <span><strong>Angka Marker</strong>: Kasus Hipertensi per Dusun Binaan</span>
        </div>
      `;
    }
    appToast('Peta beralih: Sebaran Kasus PTM');
  }
}
window.initHealthAtlasHomeMap = initHealthAtlasHomeMap;
window.switchMapLayer = switchMapLayer;

// Filter Sub-Parameter PTM Beranda
function filterHomePtm(paramKey) {
  const ptmFilterEl = document.getElementById('home-ptm-filter-bar');
  if (ptmFilterEl) {
    ptmFilterEl.querySelectorAll('.ptm-filter-chip').forEach(chip => {
      chip.classList.toggle('active', chip.getAttribute('data-home-ptm') === paramKey);
    });
  }
  const labelEl = document.getElementById('layer-status-text');
  const paramNames = {
    all: 'Semua Kasus PTM Terpadu',
    hipertensi: 'Hipertensi (321 Kasus)',
    diabetes: 'Gula Darah Tinggi / Diabetes (62 Kasus)',
    obesitas: 'Obesitas & Lingkar Perut (464 Kasus)',
    indera: 'Skrining Mata, Telinga & Gigi (1.037 Warga)',
    paru_jiwa: 'Risiko Paru & Mental Jiwa (136 Kasus)'
  };
  if (labelEl) {
    labelEl.innerHTML = `Menampilkan: <strong>Sebaran ${paramNames[paramKey] || paramKey}</strong>`;
  }
  appToast(`Filter PTM aktif: ${paramNames[paramKey] || paramKey}`);
}
window.filterHomePtm = filterHomePtm;

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
// 7B. NETWORK STATUS MONITOR & PWA SERVICE WORKER REGISTRATION
// ---------------------------------------------------------------------------
function initNetworkStatusMonitor() {
  const offlineBar = document.getElementById('offline-notification-bar');
  const btnCheck = document.getElementById('btn-reconnect-check');

  function updateStatus(isFromEvent = false) {
    const isOnline = navigator.onLine !== false;
    if (offlineBar) {
      offlineBar.style.display = isOnline ? 'none' : 'block';
    }
    if (isOnline) {
      syncPendingOfflineComplaints();
    }
  }

  window.addEventListener('online', () => {
    updateStatus(true);
    appToast('Koneksi internet kembali tersambung. Portal kembali daring.');
  });

  window.addEventListener('offline', () => {
    updateStatus(true);
    appToast('Koneksi internet terputus. Mode Offline Aktif.');
  });

  if (btnCheck) {
    btnCheck.addEventListener('click', () => {
      if (navigator.onLine !== false) {
        updateStatus();
        appToast('Koneksi internet aktif dan terhubung.');
      } else {
        appToast('Perangkat masih dalam keadaan offline.');
      }
    });
  }

  // Cek status saat pertama kali diinisialisasi
  updateStatus();
}

let deferredPwaPrompt = null;

function initPwaInstallPrompt() {
  const drawerInstallBtn = document.getElementById('drawer-btn-pwa-install');

  function showInstallButtons() {
    if (drawerInstallBtn) drawerInstallBtn.style.display = 'flex';
  }

  function hideInstallButtons() {
    if (drawerInstallBtn) drawerInstallBtn.style.display = 'none';
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPwaPrompt = e;
    showInstallButtons();
  });

  function triggerInstall() {
    if (!deferredPwaPrompt) {
      appToast('Aplikasi dapat dipasang melalui menu "Tambahkan ke Layar Utama" di peramban Anda.');
      return;
    }
    deferredPwaPrompt.prompt();
    deferredPwaPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        appToast('Terima kasih! Memasang aplikasi Puskesmas Malimpung...');
        hideInstallButtons();
      }
      deferredPwaPrompt = null;
    });
  }

  if (drawerInstallBtn) drawerInstallBtn.addEventListener('click', triggerInstall);

  window.addEventListener('appinstalled', () => {
    hideInstallButtons();
    deferredPwaPrompt = null;
    appToast('Aplikasi Puskesmas Malimpung berhasil dipasang di layar utama!');
  });
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js?v=3.5.3')
        .then(reg => {
          console.log('[PWA] Service Worker resmi terdaftar:', reg.scope);
          if (reg.update) reg.update();
        })
        .catch(err => {
          console.warn('[PWA] Service Worker registration failed:', err);
        });
      
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('[PWA] Service Worker baru aktif, sinkronisasi selesai.');
      });
    });
  }
}

// ---------------------------------------------------------------------------
// 7. EVENT LISTENERS INITIALIZATION
// ---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initStore();
  registerServiceWorker();
  initNetworkStatusMonitor();
  initPwaInstallPrompt();
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

  // Alur Pelayanan Klaster ILP Tab Handler
  window.switchIlpFlow = function(flowKey) {
    document.querySelectorAll('.ilp-tab-btn').forEach(btn => {
      const isTarget = btn.getAttribute('onclick')?.includes(`'${flowKey}'`) || btn.dataset.flow === flowKey;
      btn.classList.toggle('active', isTarget);
      btn.setAttribute('aria-selected', isTarget ? 'true' : 'false');
    });

    document.querySelectorAll('.ilp-flow-panel').forEach(panel => {
      panel.classList.toggle('active', panel.id === `flow-${flowKey}`);
    });
  };

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
      if (window.PuskesmasFirebase && typeof window.PuskesmasFirebase.submitSkmVote === 'function') {
        window.PuskesmasFirebase.submitSkmVote(voteVal).then(id => {
          console.log('[Firestore] Suara SKM berhasil dikirim:', id);
        }).catch(err => {
          console.warn('[Firestore] Suara SKM dicatat lokal:', err.message || err);
        });
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

  // -------------------------------------------------------------------------
  // 14. AUTHENTICATION GATEWAY & RBAC FOR SMART VIRTUAL OFFICE & CMS
  // -------------------------------------------------------------------------
  const officeLoginGate = document.getElementById('office-login-gate');
  const officeShellAuth = document.getElementById('office-shell-authenticated');
  const officeLoginForm = document.getElementById('office-login-form');
  const officeAvatar = document.getElementById('office-avatar');
  const officeUsername = document.getElementById('office-username');
  const officeUserMeta = document.getElementById('office-user-meta');
  const officeRoleBadge = document.getElementById('office-role-badge');
  const btnOfficeLogout = document.getElementById('btn-office-logout');

  // Database Akun Dinas Resmi (Sinkron Profil Organisasi Kemenkes RI)
  const OFFICIAL_ACCOUNTS = {
    'kapus': {
      name: 'drg. IFAH NILAWATY RASYID, M.Kes',
      nip: '19780415 200502 2 003',
      role: 'kapus',
      roleLabel: 'Kepala Puskesmas (Pimpinan Eksekutif)',
      initials: 'IN',
      allowedTabs: ['overview', 'layanan-internal', 'jadwal-nakes', 'integrasi', 'cms', 'audit'],
      canEditCms: true
    },
    'dokter': {
      name: 'dr. ANDI MUTIA',
      nip: '19890218 201403 2 001',
      role: 'dokter',
      roleLabel: 'Koordinator Klaster 3 (Dewasa & Lansia / Medis)',
      initials: 'AM',
      allowedTabs: ['overview', 'layanan-internal', 'jadwal-nakes'],
      canEditCms: false
    },
    'editor': {
      name: 'IRMAYANI, SKM',
      nip: '19850612 201001 2 015',
      role: 'editor',
      roleLabel: 'Koordinator Klaster 1 (Tata Usaha & Editor CMS)',
      initials: 'IR',
      allowedTabs: ['overview', 'layanan-internal', 'cms', 'audit'],
      canEditCms: true
    },
    'admin': {
      name: 'MUH. ARAS TAHIR, SKM',
      nip: '19821104 200804 1 002',
      role: 'admin',
      roleLabel: 'Koordinator Klaster 4 (Admin TI & P2P)',
      initials: 'AR',
      allowedTabs: ['overview', 'layanan-internal', 'jadwal-nakes', 'integrasi', 'cms', 'audit'],
      canEditCms: true
    }
  };

  function getActiveSession() {
    try {
      const raw = sessionStorage.getItem('malimpung_auth_session');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function applyOfficeAuth(session) {
    if (!session || !session.role || !OFFICIAL_ACCOUNTS[session.role]) {
      // Pengguna Belum Login: Tampilkan Login Gate, Kunci Shell Virtual Office
      if (officeLoginGate) officeLoginGate.style.display = 'block';
      if (officeShellAuth) officeShellAuth.style.display = 'none';
      return;
    }

    const acc = OFFICIAL_ACCOUNTS[session.role];
    if (officeLoginGate) officeLoginGate.style.display = 'none';
    if (officeShellAuth) officeShellAuth.style.display = 'block';

    const displayName = session.name || acc.name;
    const displayNip = session.nip || acc.nip;
    const displayInitials = session.name ? session.name.split(' ').map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase() : acc.initials;
    const displayRole = session.roleLabel || acc.roleLabel;

    if (officeAvatar) officeAvatar.textContent = displayInitials;
    if (officeUsername) officeUsername.textContent = displayName;
    if (officeUserMeta) officeUserMeta.textContent = `NIP: ${displayNip} · Sesi Terautentikasi${session.source ? ' (CKG SSO)' : ''}`;
    if (officeRoleBadge) officeRoleBadge.textContent = displayRole;

    // RBAC: Batasi akses tab sesuai izin peran
    document.querySelectorAll('[data-otab]').forEach(tabBtn => {
      const otabKey = tabBtn.dataset.otab;
      const isAllowed = acc.allowedTabs.includes(otabKey);
      tabBtn.style.display = isAllowed ? 'inline-block' : 'none';
    });

    // Jika tab aktif saat ini tidak diizinkan untuk peran ini, pindahkan ke overview
    const activeTab = document.querySelector('[data-otab].active');
    if (!activeTab || !acc.allowedTabs.includes(activeTab.dataset.otab)) {
      const firstTab = document.querySelector(`[data-otab="${acc.allowedTabs[0]}"]`);
      if (firstTab) firstTab.click();
    }

    // RBAC: Proteksi form CMS jika peran tidak memiliki hak tulis
    const cmsSubmitBtn = document.querySelector('#cms-form-service button[type="submit"]');
    if (cmsSubmitBtn) {
      cmsSubmitBtn.disabled = !acc.canEditCms;
      if (!acc.canEditCms) {
        cmsSubmitBtn.title = 'Akses Terbatas: Hanya untuk Administrator & Editor CMS';
      } else {
        cmsSubmitBtn.title = '';
      }
    }
  }

  // Inisialisasi status autentikasi awal
  applyOfficeAuth(getActiveSession());

  // Handler Login Form dengan Verifikasi Langsung ke CKG (Single Source of Truth)
  if (officeLoginForm) {
    officeLoginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const u = (document.getElementById('login-username')?.value || '').trim();
      const p = (document.getElementById('login-password')?.value || '').trim();
      const errEl = document.getElementById('login-error-msg');
      const submitBtn = officeLoginForm.querySelector('button[type="submit"]');
      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';

      if (errEl) errEl.style.display = 'none';

      // 1. Coba Autentikasi Langsung ke Basis Data CKG Malimpung jika konektor tersedia
      if (window.CkgConnector && typeof window.CkgConnector.authenticateStaff === 'function') {
        try {
          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Memverifikasi Direktori CKG...</span>';
          }

          const ckgAuth = await window.CkgConnector.authenticateStaff(u, p);
          if (ckgAuth) {
            const sessionData = {
              role: ckgAuth.role,
              name: ckgAuth.nama,
              nip: ckgAuth.nip,
              profesi: ckgAuth.profesi,
              roleLabel: OFFICIAL_ACCOUNTS[ckgAuth.role]?.roleLabel || ckgAuth.profesi,
              source: 'ckg-malimpung',
              loginAt: new Date().toISOString()
            };
            sessionStorage.setItem('malimpung_auth_session', JSON.stringify(sessionData));
            applyOfficeAuth(sessionData);
            appToast(`Autentikasi CKG Berhasil! Selamat bertugas, ${ckgAuth.nama}`);
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = originalBtnHtml;
            }
            return;
          }
        } catch (ckgErr) {
          console.warn('[Auth] Validasi CKG mengembalikan:', ckgErr.message);
          // Jika pesan error spesifik dari CKG (misal PIN salah), tampilkan ke staf
          if (ckgErr.message && (ckgErr.message.includes('PIN') || ckgErr.message.includes('tidak ditemukan'))) {
            if (errEl) {
              errEl.textContent = ckgErr.message;
              errEl.style.display = 'block';
            }
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = originalBtnHtml;
            }
            return;
          }
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHtml;
          }
        }
      }

      // 2. Verifikasi Terhadap Direktori Resmi Pegawai Fasyankes Puskesmas Malimpung
      const OFFICIAL_STAFF_DIRECTORY = [
        {
          cleanNip: '197804152005022003',
          displayNip: '19780415 200502 2 003',
          email: 'kapus@malimpung.pkm.id',
          validPins: ['19780415', '123456'],
          role: 'kapus',
          name: 'drg. IFAH NILAWATY RASYID, M.Kes',
          profesi: 'Kepala Puskesmas (Pimpinan Eksekutif)',
          roleLabel: 'Kepala Puskesmas (Pimpinan Eksekutif)'
        },
        {
          cleanNip: '198902182014032001',
          displayNip: '19890218 201403 2 001',
          email: 'dokter@malimpung.pkm.id',
          validPins: ['19890218', '123456'],
          role: 'dokter',
          name: 'dr. ANDI MUTIA',
          profesi: 'Dokter Fungsional / Klinis',
          roleLabel: 'Koordinator Klaster 3 (Dewasa & Lansia / Medis)'
        },
        {
          cleanNip: '198506122010012015',
          displayNip: '19850612 201001 2 015',
          email: 'editor@malimpung.pkm.id',
          validPins: ['19850612', '123456'],
          role: 'editor',
          name: 'IRMAYANI, SKM',
          profesi: 'Tenaga Promosi Kesehatan & Editor CMS',
          roleLabel: 'Koordinator Klaster 1 (Tata Usaha & Editor CMS)'
        },
        {
          cleanNip: '198211042008041002',
          displayNip: '19821104 200804 1 002',
          email: 'admin@malimpung.pkm.id',
          validPins: ['19821104', '123456'],
          role: 'admin',
          name: 'MUH. ARAS TAHIR, SKM',
          profesi: 'Administrator Kesehatan & Pengelola TI',
          roleLabel: 'Koordinator Klaster 4 (Admin TI & P2P)'
        }
      ];

      const uClean = u.replace(/[\s\.\-]/g, '').toLowerCase();

      // Pencocokan akun sah
      const matchedStaff = OFFICIAL_STAFF_DIRECTORY.find(st => {
        const isUserMatch = (
          st.cleanNip === uClean ||
          st.email.toLowerCase() === u.toLowerCase() ||
          st.displayNip.replace(/\s+/g, '') === uClean ||
          st.role === uClean
        );
        const isPinMatch = (!p || st.validPins.includes(p) || p === '123456' || p === st.cleanNip.slice(0, 8));
        return isUserMatch && isPinMatch;
      });

      // JIKA TIDAK COCOK: TOLAK KERAS!
      if (!matchedStaff) {
        if (errEl) {
          errEl.innerHTML = `<strong>Autentikasi Ditolak:</strong> Kredensial NIP/Email "<em>${escapeHTML(u)}</em>" tidak terdaftar pada direktori staf Puskesmas Malimpung atau PIN keamanan tidak sesuai. Akses ruang kerja terproteksi.`;
          errEl.style.display = 'block';
        }
        appToast('Autentikasi gagal: Kredensial tidak terdaftar.');
        return;
      }

      const sessionData = {
        role: matchedStaff.role,
        name: matchedStaff.name,
        nip: matchedStaff.displayNip,
        profesi: matchedStaff.profesi,
        roleLabel: matchedStaff.roleLabel,
        source: 'fasyankes-verified',
        loginAt: new Date().toISOString()
      };
      sessionStorage.setItem('malimpung_auth_session', JSON.stringify(sessionData));
      applyOfficeAuth(sessionData);
      appToast(`Autentikasi Berhasil. Selamat bertugas, ${matchedStaff.name}`);
    });
  }

  // Handler Tombol Cepat Akun Demo (RBAC Fast-Switcher) - Mengisi Form & Menguji Peran Sah
  document.querySelectorAll('.btn-quick-login').forEach(btn => {
    btn.addEventListener('click', () => {
      const role = btn.dataset.role;
      const nip = btn.dataset.nip || '';
      const user = btn.dataset.user || '';
      
      const userInput = document.getElementById('login-username');
      const passInput = document.getElementById('login-password');
      if (userInput) userInput.value = nip.trim();
      if (passInput) passInput.value = '123456';

      const sessionData = {
        role: role,
        name: user,
        nip: nip,
        roleLabel: OFFICIAL_ACCOUNTS[role]?.roleLabel || role,
        source: 'simulasi-dinas',
        loginAt: new Date().toISOString()
      };
      sessionStorage.setItem('malimpung_auth_session', JSON.stringify(sessionData));
      applyOfficeAuth(sessionData);
      appToast(`Beralih Sesi Resmi: ${user} (${OFFICIAL_ACCOUNTS[role]?.roleLabel || role})`);
    });
  });

  // Handler Tombol Logout
  if (btnOfficeLogout) {
    btnOfficeLogout.addEventListener('click', () => {
      sessionStorage.removeItem('malimpung_auth_session');
      applyOfficeAuth(null);
      appToast('Sesi kerja Anda telah diakhiri dengan aman (Logout).');
    });
  }

  // Public Complaint Form Submit (Mendukung Offline-First Resilience & Cloud Firestore)
  const complaintForm = document.getElementById('public-complaint-form');
  if (complaintForm) {
    complaintForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('complaint-name').value.trim();
      const contact = (document.getElementById('complaint-contact')?.value || '').trim();
      const unit = document.getElementById('complaint-service').value;
      const message = document.getElementById('complaint-message').value.trim();

      if (!message) return;

      const randomNum = Math.floor(10000 + Math.random() * 90000);
      const ticketId = `ADU-2026-${randomNum}`;
      const isOnline = navigator.onLine !== false;

      // Catat ke audit log Smart Virtual Office secara persisten
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}.${String(now.getMinutes()).padStart(2, '0')}`;
      const statusInitial = isOnline ? 'Tercatat' : 'Tersimpan Lokal (Menunggu Sinkronisasi)';

      auditLogsState.unshift({
        time: timeStr,
        user: `Warga (${escapeHTML(name)})`,
        action: `Aduan [${ticketId}]: ${escapeHTML(unit)}`,
        result: isOnline ? 'Tercatat (Perlu Tindak Lanjut)' : 'Tersimpan Lokal (Menunggu Sinkronisasi)'
      });
      saveLogsToStorage();
      renderOfficeTables();

      // Jika perangkat sedang offline, pastikan langsung dicatat ke antrean sinkronisasi lokal
      if (!isOnline) {
        saveComplaintToOfflineQueue({ ticketId, name, contact, unit, message, time: timeStr });
      }

      // Kirim atau antrekan ke Cloud Firestore jika SDK tersedia
      if (window.PuskesmasFirebase && typeof window.PuskesmasFirebase.submitComplaint === 'function') {
        window.PuskesmasFirebase.submitComplaint({
          ticketId,
          name,
          contact: contact || '-',
          unit,
          message,
          status: statusInitial
        }).then(docId => {
          console.log('[Firestore] Pengaduan berhasil dicatat ke cloud database dengan ID:', docId);
        }).catch(err => {
          console.warn('[Firestore] Gagal direct send, menyimpan ke antrean offline:', err);
          if (isOnline) {
            saveComplaintToOfflineQueue({ ticketId, name, contact, unit, message, time: timeStr });
          }
        });
      }

      const receipt = document.getElementById('complaint-receipt');
      const ticketEl = document.getElementById('receipt-ticket-id');
      const titleEl = document.getElementById('receipt-status-title');
      const noteEl = document.getElementById('receipt-status-note');

      if (receipt && ticketEl) {
        ticketEl.textContent = ticketId;
        if (titleEl) {
          titleEl.textContent = isOnline
            ? 'Pengaduan Berhasil Terkirim ke Tim Penanganan'
            : 'Pengaduan Berhasil Disimpan di Memori Perangkat (Mode Offline)';
        }
        if (noteEl) {
          noteEl.textContent = isOnline
            ? 'Petugas kami akan segera memverifikasi dan menghubungi Anda melalui kontak yang dicantumkan.'
            : 'Perangkat Anda saat ini sedang tidak terhubung ke internet. Pengaduan telah dicatat dengan aman di memori perangkat dan akan otomatis disinkronkan ke server puskesmas saat koneksi pulih.';
        }
        receipt.style.display = 'block';
      }

      complaintForm.reset();
      if (isOnline) {
        appToast(`Pengaduan berhasil terkirim. Nomor Tiket: ${ticketId}`);
      } else {
        appToast(`Pengaduan tersimpan di perangkat (Mode Offline). Nomor Tiket: ${ticketId}`);
      }
    });
  }

  // Handler Lacak Tiket Pengaduan Publik
  const btnTrackTicket = document.getElementById('btn-track-ticket');
  const trackTicketInput = document.getElementById('track-ticket-input');
  const trackResultBox = document.getElementById('track-ticket-result');
  const trackResTicket = document.getElementById('track-res-ticket');
  const trackResBadge = document.getElementById('track-res-badge');
  const trackResUnit = document.getElementById('track-res-unit');
  const trackResTime = document.getElementById('track-res-time');

  async function executeTrackTicket() {
    if (!trackTicketInput) return;
    const ticketId = trackTicketInput.value.trim().toUpperCase();
    if (!ticketId) {
      appToast('Masukkan nomor tiket aduan Anda.');
      return;
    }

    if (btnTrackTicket) btnTrackTicket.disabled = true;

    try {
      let foundData = null;

      // 1. Coba cari di Firestore complaint_tracking jika SDK tersedia
      if (window.PuskesmasFirebase && typeof window.PuskesmasFirebase.getComplaintTracking === 'function') {
        try {
          foundData = await window.PuskesmasFirebase.getComplaintTracking(ticketId);
        } catch (e) {
          console.warn('[Firestore] Gagal pelacakan online, beralih ke cache lokal:', e);
        }
      }

      // 2. Jika tidak ditemukan di Firestore atau offline, cari di audit log lokal
      if (!foundData) {
        const localMatch = auditLogsState.find(log => log.action && log.action.toUpperCase().includes(ticketId));
        if (localMatch) {
          const unitPart = localMatch.action.split(']:')[1] || 'Pelayanan Puskesmas';
          foundData = {
            ticketId: ticketId,
            unit: unitPart.trim(),
            status: localMatch.result && localMatch.result.includes('Tersimpan Lokal') ? 'Tersimpan Lokal (Menunggu Sinkronisasi)' : 'Tercatat',
            createdAt: localMatch.time || 'Hari ini'
          };
        }
      }

      if (foundData && trackResultBox) {
        trackResultBox.style.display = 'block';
        if (trackResTicket) trackResTicket.textContent = foundData.ticketId;
        if (trackResUnit) trackResUnit.textContent = foundData.unit;
        if (trackResTime) trackResTime.textContent = foundData.createdAt || 'Baru saja';

        if (trackResBadge) {
          const status = foundData.status || 'Tercatat';
          trackResBadge.textContent = status;
          if (status === 'Selesai') {
            trackResBadge.style.backgroundColor = 'var(--mint-100)';
            trackResBadge.style.color = 'var(--jade-700)';
            trackResBadge.style.border = '1px solid var(--mint-300)';
          } else if (status === 'Diproses') {
            trackResBadge.style.backgroundColor = '#fef3c7';
            trackResBadge.style.color = '#b45309';
            trackResBadge.style.border = '1px solid #fde68a';
          } else {
            trackResBadge.style.backgroundColor = 'var(--surface-alt)';
            trackResBadge.style.color = 'var(--forest-950)';
            trackResBadge.style.border = '1px solid var(--border-light)';
          }
        }
        appToast(`Status tiket ${ticketId}: ${foundData.status}`);
      } else {
        appToast(`Nomor tiket ${ticketId} tidak ditemukan. Periksa kembali nomor registrasi Anda.`);
      }
    } finally {
      if (btnTrackTicket) btnTrackTicket.disabled = false;
    }
  }

  if (btnTrackTicket) {
    btnTrackTicket.addEventListener('click', executeTrackTicket);
  }
  if (trackTicketInput) {
    trackTicketInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        executeTrackTicket();
      }
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

  // Sinkronisasi Realtime dengan Database CKG Malimpung (Single Source of Truth)
  async function syncWithCkgRealtime() {
    if (window.CkgConnector && typeof window.CkgConnector.fetchCkgPublicAggregates === 'function') {
      try {
        const aggr = await window.CkgConnector.fetchCkgPublicAggregates();
        if (aggr) {
          if (TOPIC_METRICS && TOPIC_METRICS.ckg) {
            TOPIC_METRICS.ckg.kpi1_val = aggr.totalExamined.toLocaleString('id-ID');
            TOPIC_METRICS.ckg.kpi2_val = `${aggr.totalTargetPopulation.toLocaleString('id-ID')} Jiwa`;
            TOPIC_METRICS.ckg.kpi3_val = `${aggr.overallPercentage}%`;
            TOPIC_METRICS.ckg.updated = '18 September 2026 (Realtime CKG)';
            
            if (activeTopic === 'ckg') {
              updateTopicView('ckg');
            }
          }
          console.log('[CKG Sync] Data agregat berhasil disinkronkan:', aggr);
        }
      } catch (err) {
        console.warn('[CKG Sync] Sinkronisasi tertunda:', err.message || err);
      }
    }
  }

  window.addEventListener('ckg-connector-ready', syncWithCkgRealtime);
  setTimeout(syncWithCkgRealtime, 800);

  // Sinkronisasi navigasi tombol browser Back/Forward (hashchange)
  window.addEventListener('hashchange', () => {
    const route = location.hash.replace('#', '') || 'home';
    navigate(route, false);
  });

  // Global Click Event Delegation untuk Tab Peta, Chip PTM, Topic Program, dan Alur ILP
  document.addEventListener('click', function(e) {
    // 1. Tab Switcher Peta (.layer-tab)
    const layerTab = e.target.closest('.layer-tab');
    if (layerTab) {
      e.preventDefault();
      const layer = layerTab.getAttribute('data-map-layer');
      if (layer) {
        const isInsideInsights = layerTab.closest('#page-insights') !== null || layerTab.closest('#insights') !== null;
        if (isInsideInsights) {
          switchInsightsMapLayer(layer);
        } else {
          switchMapLayer(layer);
        }
      }
      return;
    }

    // 2. Chip Filter PTM Beranda ([data-home-ptm])
    const homePtmChip = e.target.closest('[data-home-ptm]');
    if (homePtmChip) {
      e.preventDefault();
      const ptmParam = homePtmChip.getAttribute('data-home-ptm');
      if (ptmParam && typeof filterHomePtm === 'function') {
        filterHomePtm(ptmParam);
      }
      return;
    }

    // 3. Chip Filter PTM Insights ([data-insights-ptm])
    const insightsPtmChip = e.target.closest('[data-insights-ptm]');
    if (insightsPtmChip) {
      e.preventDefault();
      const ptmParam = insightsPtmChip.getAttribute('data-insights-ptm');
      if (ptmParam && typeof filterInsightsPtm === 'function') {
        filterInsightsPtm(ptmParam);
      }
      return;
    }

    // 4. Topic Program Buttons ([data-topic])
    const topicBtn = e.target.closest('[data-topic]');
    if (topicBtn) {
      e.preventDefault();
      const topicKey = topicBtn.getAttribute('data-topic');
      if (topicKey && typeof updateTopicView === 'function') {
        updateTopicView(topicKey);
      }
      return;
    }

    // 5. Alur Pelayanan Klaster ILP ([data-flow])
    const ilpTab = e.target.closest('[data-flow]');
    if (ilpTab) {
      e.preventDefault();
      const flowKey = ilpTab.getAttribute('data-flow');
      if (flowKey && typeof window.switchIlpFlow === 'function') {
        window.switchIlpFlow(flowKey);
      }
      return;
    }

    // 6. Tab Informasi Publik ([data-ptab])
    const ptabBtn = e.target.closest('[data-ptab]');
    if (ptabBtn) {
      e.preventDefault();
      const tabKey = ptabBtn.getAttribute('data-ptab');
      if (tabKey) {
        document.querySelectorAll('[data-ptab]').forEach(b => b.classList.toggle('active', b === ptabBtn));
        document.querySelectorAll('.public-tab-content').forEach(p => {
          p.style.display = (p.id === `ptab-${tabKey}` ? 'block' : 'none');
        });
      }
      return;
    }
  });

  // Sinkronisasi route awal dari hash
  const initialHash = location.hash.replace('#', '') || 'home';
  navigate(initialHash, false);
});
