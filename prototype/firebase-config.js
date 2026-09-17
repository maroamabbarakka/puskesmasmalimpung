/**
 * PUSKESMAS MALIMPUNG — HEALTH HUB V2
 * Konfigurasi & Inisialisasi Resmi Firebase Web SDK & Cloud Firestore
 * Proyek: puskesmas-malimpung
 * Tanggal: 18 September 2026
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAnalytics, isSupported } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// Konfigurasi Web App Firebase Resmi Puskesmas Malimpung
export const firebaseConfig = {
  apiKey: "AIzaSyBqbO4-R6YK76tn6D9NYYjE5lBVVX3ZfKM",
  authDomain: "puskesmas-malimpung.firebaseapp.com",
  projectId: "puskesmas-malimpung",
  storageBucket: "puskesmas-malimpung.firebasestorage.app",
  messagingSenderId: "1039480634652",
  appId: "1:1039480634652:web:308528bd79b506ba298ed9",
  measurementId: "G-BH467HR1V6"
};

// Inisialisasi Firebase App
export const app = initializeApp(firebaseConfig);

// Inisialisasi Cloud Firestore dengan Multi-Tab Persistent Local Cache (Offline Resilience)
let db = null;
try {
  db = initializeFirestore(app, {
    localCache: persistentLocalCache({
      tabManager: persistentMultipleTabManager()
    })
  });
  console.log("[Firebase] Cloud Firestore diinisialisasi dengan persistent local cache aktif.");
} catch (err) {
  console.warn("[Firebase] Inisialisasi cache Firestore beralih ke fallback:", err.message || err);
}

export { db };

// Inisialisasi Google Analytics secara kondisional
export let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then(supported => {
    if (supported) {
      analytics = getAnalytics(app);
      console.log("[Firebase] Google Analytics (G-BH467HR1V6) aktif untuk Puskesmas Malimpung.");
    } else {
      console.log("[Firebase] Lingkungan peramban tidak mendukung Analytics.");
    }
  }).catch(err => {
    console.warn("[Firebase] Analytics dilewati:", err.message || err);
  });
}

// ---------------------------------------------------------------------------
// Helper API Global untuk Integrasi Non-Blocking Frontend (PuskesmasFirebase)
// ---------------------------------------------------------------------------
if (typeof window !== "undefined") {
  window.PuskesmasFirebase = {
    isAvailable: () => db !== null,
    db: db,

    /**
     * Kirim Pengaduan Warga ke Cloud Firestore
     * Mendukung offline queue otomatis lewat persistent cache
     */
    async submitComplaint(payload) {
      if (!db) throw new Error("Firestore belum terinisialisasi");
      const cleanData = {
        ticketId: String(payload.ticketId || '').trim(),
        name: String(payload.name || '').trim(),
        contact: String(payload.contact || '').trim(),
        unit: String(payload.unit || '').trim(),
        message: String(payload.message || '').trim(),
        status: String(payload.status || 'Tercatat'),
        createdAt: new Date().toISOString()
      };

      // Simpan dokumen pengaduan lengkap ke koleksi complaints
      const compRef = await addDoc(collection(db, "complaints"), cleanData);

      // Simpan proyeksi pelacakan publik (tanpa data PII) ke koleksi complaint_tracking
      try {
        await setDoc(doc(db, "complaint_tracking", cleanData.ticketId), {
          ticketId: cleanData.ticketId,
          unit: cleanData.unit,
          status: cleanData.status,
          createdAt: cleanData.createdAt,
          updatedAt: cleanData.createdAt
        });
      } catch (trackErr) {
        console.warn("[Firebase] Pelacakan publik dicatat lokal:", trackErr.message || trackErr);
      }

      return compRef.id;
    },

    /**
     * Lacak Status Tiket Pengaduan Publik
     */
    async getComplaintTracking(ticketId) {
      if (!db) throw new Error("Firestore belum terinisialisasi");
      const docRef = doc(db, "complaint_tracking", String(ticketId).trim());
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        return snap.data();
      }
      return null;
    },

    /**
     * Kirim Suara Survei Kepuasan Masyarakat (SKM) ke Cloud Firestore
     */
    async submitSkmVote(voteValue) {
      if (!db) throw new Error("Firestore belum terinisialisasi");
      const cleanVote = {
        vote: String(voteValue).trim(),
        createdAt: new Date().toISOString()
      };
      const voteRef = await addDoc(collection(db, "skm_votes"), cleanVote);
      return voteRef.id;
    },

    /**
     * Ambil Rekapitulasi SKM Publik
     */
    async getSkmSummary() {
      if (!db) return null;
      try {
        const snap = await getDocs(collection(db, "skm_votes"));
        const counts = { 'Sangat Puas': 0, 'Puas': 0, 'Kurang Puas': 0, 'Tidak Puas': 0 };
        let total = 0;
        snap.forEach(docSnap => {
          const d = docSnap.data();
          if (counts[d.vote] !== undefined) {
            counts[d.vote]++;
            total++;
          }
        });
        return { counts, total };
      } catch (err) {
        console.warn("[Firebase] Gagal mengambil rekap SKM:", err);
        return null;
      }
    }
  };

  // Kirim event kesiapan Firebase ke window
  window.dispatchEvent(new CustomEvent("puskesmas-firebase-ready", { detail: { available: true } }));
}
