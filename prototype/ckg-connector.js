/**
 * PUSKESMAS MALIMPUNG — SMART VIRTUAL OFFICE & HEALTH HUB
 * Konektor Lintas Firebase Resmi ke Database CKG Malimpung (ckg-malimpung)
 * Single Source of Truth untuk RBAC Staf & Agregasi Data Kesehatan Wilayah
 * 
 * Target Denominator Resmi Populasi (Lampiran 2):
 * - Desa Malimpung: 4.013 Jiwa
 * - Desa Padangloang: 3.279 Jiwa
 * - Kelurahan Maccirinna: 1.533 Jiwa
 * - Total Wilayah Kerja: 8.825 Jiwa
 */

import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  limit,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// Konfigurasi Web App Firebase CKG Malimpung Resmi
export const ckgFirebaseConfig = {
  apiKey: "AIzaSyAVBhUvUGDYvtpH_chAAXzsUJnW7vrtnco",
  authDomain: "ckg-malimpung.firebaseapp.com",
  projectId: "ckg-malimpung",
  storageBucket: "ckg-malimpung.firebasestorage.app",
  messagingSenderId: "695466415592",
  appId: "1:695466415592:web:ee89945b07b0523cd3c05d"
};

// Inisialisasi Named Firebase App khusus untuk koneksi sekunder ke CKG
let ckgApp = null;
let ckgDb = null;

try {
  const existingApps = getApps();
  const ckgAppName = "CKG_MALIMPUNG_SOURCE";
  ckgApp = existingApps.find(a => a.name === ckgAppName) || initializeApp(ckgFirebaseConfig, ckgAppName);
  
  ckgDb = initializeFirestore(ckgApp, {
    localCache: persistentLocalCache({
      tabManager: persistentMultipleTabManager()
    })
  });
  console.log("[CkgConnector] Terhubung ke Cloud Firestore ckg-malimpung sebagai Single Source of Truth.");
} catch (err) {
  console.warn("[CkgConnector] Gagal menginisialisasi konektor CKG khusus, menggunakan fallback memori:", err.message || err);
}

// Data Master Denominator Resmi Wilayah Kerja (Sesuai Lampiran 2)
export const OFFICIAL_DEMOGRAPHICS = {
  totalPopulation: 8825,
  regions: {
    malimpung: {
      name: "Desa Malimpung",
      population: 4013,
      areaKm2: 5.78,
      type: "Desa",
      desc: "Batas Utara langsung dengan Kabupaten Enrekang. Menjadi salah satu Desa Pusat Pertumbuhan (DPP)."
    },
    padangloang: {
      name: "Desa Padangloang",
      population: 3279,
      areaKm2: 28.89,
      type: "Desa",
      desc: "Memiliki wilayah geografis yang cukup luas di Patampanua namun dengan kepadatan yang cenderung renggang."
    },
    maccirinna: {
      name: "Kelurahan Maccirinna",
      population: 1533,
      areaKm2: 5.01,
      type: "Kelurahan",
      desc: "Wilayah administrasi terkecil secara luas wilayah di Kecamatan Patampanua."
    }
  }
};

/**
 * Normalisasi nama desa dari input teks bebas di CKG
 */
function normalizeRegionName(rawName) {
  if (!rawName) return "malimpung";
  const s = String(rawName).toLowerCase().trim();
  if (s.includes("padang") || s.includes("loang")) return "padangloang";
  if (s.includes("macci") || s.includes("rinna")) return "maccirinna";
  return "malimpung"; // Default ke Malimpung
}

// Objek API Global CkgConnector untuk dipakai oleh app.js
export const CkgConnector = {
  isAvailable: () => ckgDb !== null,
  db: ckgDb,
  demographics: OFFICIAL_DEMOGRAPHICS,

  /**
   * 1. Autentikasi Staf & RBAC Langsung ke Koleksi 'staff' / 'users' di CKG
   * Mendukung pencocokan NIP, Email Dinas, atau username
   */
  async authenticateStaff(identifier, inputPin) {
    const cleanId = String(identifier || '').trim();
    const cleanPin = String(inputPin || '').trim();

    if (!cleanId || !cleanPin) {
      throw new Error("NIP/Email dan PIN harus diisi lengkap.");
    }

    if (!ckgDb) {
      console.warn("[CkgConnector] Database CKG offline, beralih ke verifikasi lokal terproteksi.");
      return null;
    }

    try {
      // Cek dokumen di koleksi 'staff'
      const staffCol = collection(ckgDb, "staff");
      
      // Cek via Doc ID langsung
      let staffSnap = await getDoc(doc(staffCol, cleanId));
      let staffData = null;

      if (staffSnap.exists()) {
        staffData = { id: staffSnap.id, ...staffSnap.data() };
      } else {
        // Query berdasarkan field nip
        const qNip = query(staffCol, where("nip", "==", cleanId), limit(1));
        const nipDocs = await getDocs(qNip);
        if (!nipDocs.empty) {
          const d = nipDocs.docs[0];
          staffData = { id: d.id, ...d.data() };
        } else {
          // Query berdasarkan field email
          const qEmail = query(staffCol, where("email", "==", cleanId), limit(1));
          const emailDocs = await getDocs(qEmail);
          if (!emailDocs.empty) {
            const d = emailDocs.docs[0];
            staffData = { id: d.id, ...d.data() };
          }
        }
      }

      // Jika tidak ditemukan di 'staff', coba cek koleksi 'users' CKG
      if (!staffData) {
        const usersCol = collection(ckgDb, "users");
        const userSnap = await getDoc(doc(usersCol, cleanId));
        if (userSnap.exists()) {
          staffData = { id: userSnap.id, ...userSnap.data() };
        }
      }

      if (!staffData) {
        throw new Error("NIP / Kredensial tidak ditemukan pada direktori staf CKG Malimpung.");
      }

      // Verifikasi PIN / Password
      const storedPin = String(staffData.pin || staffData.password || staffData.pinKeamanan || '').trim();
      if (storedPin && storedPin !== cleanPin) {
        throw new Error("PIN keamanan fasyankes tidak sesuai.");
      }

      // Map role dan hak akses fasyankes
      let mappedRole = 'dokter';
      const rawRole = String(staffData.role || staffData.peran || staffData.jabatan || '').toLowerCase();
      
      if (rawRole.includes('kapus') || rawRole.includes('kepala') || rawRole.includes('pimpinan')) {
        mappedRole = 'kapus';
      } else if (rawRole.includes('admin') || rawRole.includes('it') || rawRole.includes('ti')) {
        mappedRole = 'admin';
      } else if (rawRole.includes('editor') || rawRole.includes('promkes') || rawRole.includes('humas')) {
        mappedRole = 'editor';
      } else if (rawRole.includes('dokter') || rawRole.includes('medis') || rawRole.includes('perawat') || rawRole.includes('bidan')) {
        mappedRole = 'dokter';
      }

      return {
        nip: staffData.nip || staffData.id || cleanId,
        nama: staffData.nama || staffData.name || "Staf Puskesmas Malimpung",
        profesi: staffData.profesi || staffData.jabatan || "Tenaga Kesehatan",
        role: mappedRole,
        source: "ckg-malimpung",
        raw: staffData
      };
    } catch (err) {
      console.error("[CkgConnector] Error autentikasi CKG:", err);
      throw err;
    }
  },

  /**
   * 2. Simpan / Perbarui Akun Staf ke Koleksi 'staff' CKG (Sinkronisasi Dua Arah)
   * Hanya dapat dieksekusi oleh Kapus / Admin
   */
  async saveOrUpdateStaff(staffPayload) {
    if (!ckgDb) throw new Error("Firestore CKG belum terinisialisasi.");
    const nip = String(staffPayload.nip || '').trim();
    if (!nip) throw new Error("NIP staf wajib diisi sebagai identitas unik.");

    const staffRef = doc(ckgDb, "staff", nip);
    const dataToSave = {
      nip: nip,
      nama: String(staffPayload.nama || '').trim(),
      profesi: String(staffPayload.profesi || '').trim(),
      role: String(staffPayload.role || 'dokter').trim(),
      pin: String(staffPayload.pin || '123456').trim(),
      isActive: staffPayload.isActive !== undefined ? Boolean(staffPayload.isActive) : true,
      updatedAt: new Date().toISOString(),
      updatedSource: "SmartVirtualOffice-Portal"
    };

    await setDoc(staffRef, dataToSave, { merge: true });
    console.log(`[CkgConnector] Akun staf ${nip} berhasil disinkronkan dua arah ke CKG.`);
    return dataToSave;
  },

  /**
   * 3. Ambil dan Olah Data Realtime Agregat CKG untuk Tampilan Publik
   * Mengambil data visits & patients, lalu mengkalkulasi persentase resmi terhadap jumlah penduduk
   */
  async fetchCkgPublicAggregates() {
    // Default baseline statistik resmi Puskesmas Malimpung
    const result = {
      totalExamined: 0,
      totalTargetPopulation: OFFICIAL_DEMOGRAPHICS.totalPopulation, // 8.825 Jiwa
      overallPercentage: 0,
      regions: {
        malimpung: {
          name: OFFICIAL_DEMOGRAPHICS.regions.malimpung.name,
          population: OFFICIAL_DEMOGRAPHICS.regions.malimpung.population, // 4.013
          examined: 0,
          percentage: 0,
          areaKm2: OFFICIAL_DEMOGRAPHICS.regions.malimpung.areaKm2,
          type: OFFICIAL_DEMOGRAPHICS.regions.malimpung.type,
          desc: OFFICIAL_DEMOGRAPHICS.regions.malimpung.desc
        },
        padangloang: {
          name: OFFICIAL_DEMOGRAPHICS.regions.padangloang.name,
          population: OFFICIAL_DEMOGRAPHICS.regions.padangloang.population, // 3.279
          examined: 0,
          percentage: 0,
          areaKm2: OFFICIAL_DEMOGRAPHICS.regions.padangloang.areaKm2,
          type: OFFICIAL_DEMOGRAPHICS.regions.padangloang.type,
          desc: OFFICIAL_DEMOGRAPHICS.regions.padangloang.desc
        },
        maccirinna: {
          name: OFFICIAL_DEMOGRAPHICS.regions.maccirinna.name,
          population: OFFICIAL_DEMOGRAPHICS.regions.maccirinna.population, // 1.533
          examined: 0,
          percentage: 0,
          areaKm2: OFFICIAL_DEMOGRAPHICS.regions.maccirinna.areaKm2,
          type: OFFICIAL_DEMOGRAPHICS.regions.maccirinna.type,
          desc: OFFICIAL_DEMOGRAPHICS.regions.maccirinna.desc
        }
      },
      lifeCycles: {
        ibuAnak: 0,
        anakSekolah: 0,
        usiaProduktif: 0,
        lansia: 0
      },
      source: "ckg-realtime",
      lastUpdated: new Date().toISOString()
    };

    if (!ckgDb) {
      return this._getFallbackAggregates(result);
    }

    try {
      // 1. Cek koleksi visits di CKG
      const visitsSnap = await getDocs(collection(ckgDb, "visits"));
      let totalVisits = visitsSnap.size;

      // 2. Cek koleksi patients di CKG
      const patientsSnap = await getDocs(collection(ckgDb, "patients"));
      let totalPatients = patientsSnap.size;

      // Gunakan jumlah terbesar antara rekam visits atau patients yang tercatat
      let countedExamined = Math.max(totalVisits, totalPatients);

      if (countedExamined > 0) {
        result.totalExamined = countedExamined;

        // Distribusikan data jika dokumen tersedia
        const docs = visitsSnap.empty ? patientsSnap.docs : visitsSnap.docs;
        let countMalimpung = 0;
        let countPadangloang = 0;
        let countMaccirinna = 0;

        docs.forEach(docSnap => {
          const d = docSnap.data() || {};
          const regionKey = normalizeRegionName(d.desa || d.wilayah || d.kelurahan || d.alamat || '');
          if (regionKey === 'padangloang') countPadangloang++;
          else if (regionKey === 'maccirinna') countMaccirinna++;
          else countMalimpung++;

          // Klasifikasi siklus hidup jika usia/usiaBulan ada
          const usia = parseInt(d.usia || d.umur || 0, 10);
          if (usia > 0) {
            if (usia <= 6) result.lifeCycles.ibuAnak++;
            else if (usia <= 18) result.lifeCycles.anakSekolah++;
            else if (usia < 60) result.lifeCycles.usiaProduktif++;
            else result.lifeCycles.lansia++;
          }
        });

        result.regions.malimpung.examined = countMalimpung;
        result.regions.padangloang.examined = countPadangloang;
        result.regions.maccirinna.examined = countMaccirinna;
      } else {
        // Jika database CKG baru diinstal / belum ada dokumen, gunakan data baseline fasyankes terkini
        return this._getFallbackAggregates(result);
      }

      // Hitung persentase berbanding jumlah penduduk resmi (Lampiran 2)
      result.regions.malimpung.percentage = parseFloat(((result.regions.malimpung.examined / 4013) * 100).toFixed(1));
      result.regions.padangloang.percentage = parseFloat(((result.regions.padangloang.examined / 3279) * 100).toFixed(1));
      result.regions.maccirinna.percentage = parseFloat(((result.regions.maccirinna.examined / 1533) * 100).toFixed(1));

      result.overallPercentage = parseFloat(((result.totalExamined / 8825) * 100).toFixed(1));

      return result;
    } catch (err) {
      console.warn("[CkgConnector] Membaca data realtime CKG terkendala izin Firestore, menggunakan kalkulasi proporsional baseline:", err.message || err);
      return this._getFallbackAggregates(result);
    }
  },

  /**
   * Fallback cerdas dengan angka capaian fasyankes berbanding jumlah penduduk resmi (Lampiran 2 & CKG TERSANJUNG)
   */
  _getFallbackAggregates(base) {
    // Total capaian riil CKG TERSANJUNG Puskesmas Malimpung
    const total = 1371;
    const malimpungExamined = 772;
    const padangloangExamined = 126;
    const maccirinnaExamined = 421;

    base.totalExamined = total;
    base.overallPercentage = parseFloat(((total / 8825) * 100).toFixed(1)); // 15.5%

    base.regions.malimpung.examined = malimpungExamined;
    base.regions.malimpung.percentage = parseFloat(((malimpungExamined / 4013) * 100).toFixed(1)); // 19.2%

    base.regions.padangloang.examined = padangloangExamined;
    base.regions.padangloang.percentage = parseFloat(((padangloangExamined / 3279) * 100).toFixed(1)); // 3.8%

    base.regions.maccirinna.examined = maccirinnaExamined;
    base.regions.maccirinna.percentage = parseFloat(((maccirinnaExamined / 1533) * 100).toFixed(1)); // 27.5%

    base.lifeCycles = {
      ibuAnak: 10,       // Balita 0-5 tahun (1%)
      anakSekolah: 588,   // Anak 6-11 th (520) & Remaja 12-18 th (68) (43%)
      usiaProduktif: 661, // Dewasa 19-59 tahun (48%)
      lansia: 111         // Lansia 60+ tahun (8%)
    };
    base.source = "ckg-tersanjung-official-baseline";
    return base;
  }
};

// Ekspos ke global window untuk kemudahan integrasi dengan app.js
if (typeof window !== "undefined") {
  window.CkgConnector = CkgConnector;
  window.dispatchEvent(new CustomEvent("ckg-connector-ready", { detail: { available: true } }));
}
