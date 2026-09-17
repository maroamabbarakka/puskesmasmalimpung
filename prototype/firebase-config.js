/**
 * PUSKESMAS MALIMPUNG — HEALTH HUB V2
 * Konfigurasi & Inisialisasi Resmi Firebase Web SDK
 * Proyek: puskesmas-malimpung
 * Tanggal: 17 September 2026
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAnalytics, isSupported } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";

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
