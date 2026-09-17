/**
 * PUSKESMAS MALIMPUNG — SMART VIRTUAL OFFICE
 * Service Worker (Offline Resilience & PWA Engine)
 * Versi Cache: pkm-malimpung-v3.5.1
 */

const CACHE_NAME = 'pkm-malimpung-v3.5.3';
const CORE_ASSETS = [
  './',
  './index.html',
  './style.css?v=3.5.3',
  './style.css',
  './app.js?v=3.5.3',
  './app.js',
  './manifest.json',
  './favicon.ico',
  './favicon.svg',
  './assets/batas_wilayah_malimpung.geojson',
  './assets/favicon_puskesmas.svg',
  './assets/favicon-32x32.png',
  './assets/apple-touch-icon.png',
  './assets/icon-512x512.png',
  './assets/logo_puskesmas_malimpung.png',
  './assets/logo_pinrang.png',
  './assets/BerAKHLAK_Putih_Vektor.svg',
  './assets/logo_berakhlak.webp',
  './assets/hero_malimpung.webp',
  './assets/hero_malimpung_hd.webp',
  './assets/gedung_puskesmas.webp',
  './assets/berita_posyandu.webp',
  './assets/berita_bumil.webp',
  './assets/berita_stunting.webp',
  './assets/berita_phbs.webp',
  './assets/persona_ibu_anak.webp',
  './assets/persona_usia_sekolah.webp',
  './assets/persona_usia_produktif.webp',
  './assets/persona_lansia.webp'
];

// 1. Install Event: Pra-simpan aset utama (Precache)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Gunakan addAll toleran agar satu file yang gagal tidak membatalkan keseluruhan install
      return Promise.allSettled(
        CORE_ASSETS.map((url) =>
          cache.add(url).catch((err) => {
            console.warn('[SW] Lewati cache untuk asset:', url, err);
          })
        )
      );
    }).then(() => self.skipWaiting())
  );
});

// 2. Activate Event: Bersihkan cache versi lama
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('[SW] Membersihkan cache lama:', name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch Event: Strategi Hibrida Tahan Gangguan Koneksi
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Hanya proses request GET
  if (request.method !== 'GET') return;

  // Abaikan request Google Analytics atau telemetry Firebase agar tidak menyumbat cache
  if (
    url.hostname.includes('google-analytics.com') ||
    url.hostname.includes('googletagmanager.com') ||
    url.hostname.includes('analytics.google.com')
  ) {
    return;
  }

  // A. Permintaan Navigasi HTML (Halaman Utama): Network First, fallback ke Cache
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          const defaultPage = await caches.match('./index.html');
          return defaultPage || caches.match('./');
        })
    );
    return;
  }

  // B. Aset Statis Lokal (CSS, JS, Gambar, GeoJSON, Favicon): Cache First, fallback ke Network
  if (
    url.origin === self.location.origin &&
    (url.pathname.includes('/assets/') ||
      url.pathname.endsWith('.css') ||
      url.pathname.endsWith('.js') ||
      url.pathname.endsWith('.geojson') ||
      url.pathname.endsWith('.svg') ||
      url.pathname.endsWith('.png') ||
      url.pathname.endsWith('.webp') ||
      url.pathname.endsWith('.ico') ||
      url.pathname.endsWith('.json'))
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          // Lakukan background revalidation jika online
          fetch(request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                caches.open(CACHE_NAME).then((cache) => cache.put(request, networkResponse));
              }
            })
            .catch(() => {
              // Abaikan network failure saat background revalidation
            });
          return cachedResponse;
        }

        return fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const clone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
            }
            return networkResponse;
          })
          .catch(() => {
            // Jika request gambar gagal saat offline, kembalikan response kosong yang aman
            return new Response('', { status: 408, statusText: 'Offline Asset Unavailable' });
          });
      })
    );
    return;
  }

  // C. Resource Eksternal (Leaflet CDN & Google Fonts): Stale While Revalidate
  if (url.hostname.includes('unpkg.com') || url.hostname.includes('fonts.gstatic.com') || url.hostname.includes('fonts.googleapis.com')) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const clone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // D. Ubin Peta OpenStreetMap: Caching jika online, cegah error jika offline
  if (url.hostname.includes('tile.openstreetmap.org')) {
    event.respondWith(
      caches.match(request).then((cachedTile) => {
        if (cachedTile) return cachedTile;
        return fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const clone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
            }
            return networkResponse;
          })
          .catch(() => {
            // Return 204 No Content untuk tile yang gagal agar Leaflet tidak memunculkan log error parah
            return new Response(null, { status: 204, statusText: 'Tile Offline' });
          });
      })
    );
    return;
  }

  // Default Fetch
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});
