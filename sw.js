const CACHE_NAME = 'horoskops-m3-sec-v4';

const ALLOWED_FILES = new Map([
  ['', 'text/html'],
  ['index.html', 'text/html'],
  ['style.css', 'text/css'],
  ['app.js', 'application/javascript'],
  ['manifest.json', 'application/json'],
  ['icon-192.png', 'image/png'],
  ['icon-512.png', 'image/png'],
  ['icon-maskable-512.png', 'image/png']
]);

const PRECACHE_URLS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png'
];

function getRelativeAssetName(requestUrl) {
  const url = new URL(requestUrl);
  if (url.origin !== self.location.origin) return null;
  const scopePath = new URL(self.registration.scope).pathname;
  if (!url.pathname.startsWith(scopePath)) return null;
  return url.pathname.slice(scopePath.length);
}

function isValidContentType(response, expectedPrefix) {
  const ct = (response.headers.get('Content-Type') || '').toLowerCase();
  if (expectedPrefix === 'application/json') {
    return ct.includes('application/json') || ct.includes('application/manifest+json');
  }
  if (expectedPrefix === 'application/javascript') {
    return ct.includes('javascript');
  }
  return ct.includes(expectedPrefix);
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const assetName = getRelativeAssetName(event.request.url);
  if (assetName === null || !ALLOWED_FILES.has(assetName)) {
    return;
  }

  const expectedType = ALLOWED_FILES.get(assetName);
  const canonicalUrl = new URL(assetName || './', self.registration.scope).href;

  event.respondWith(
    caches.match(canonicalUrl).then((cached) => {
      const networkFetch = fetch(canonicalUrl, { credentials: 'same-origin' })
        .then((response) => {
          if (
            response &&
            response.status === 200 &&
            response.type === 'basic' &&
            isValidContentType(response, expectedType)
          ) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(canonicalUrl, copy));
          }
          return response;
        })
        .catch(() => cached);

      return cached || networkFetch  })
 .s.ee   rese;h