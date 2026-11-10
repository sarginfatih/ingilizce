/* Çevrimdışı çalışma: tüm dosyalar önbelleğe alınır.
   İçerik güncellenince VERSION değerini artır (ör. v2) ki iPad yeni sürümü indirsin. */
const VERSION = 'v2';
const CACHE = 'ingilizce-' + VERSION;
const FILES = [
  './', 'index.html', 'css/styles.css', 'js/app.js', 'js/lexicon.js',
  'content/units.js', 'content/stories.js', 'content/dict.js',
  'manifest.webmanifest', 'icons/icon-180.png', 'icons/icon-192.png', 'icons/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
// Önce ağ, olmazsa önbellek: internet varken güncel sürüm, yokken kayıtlı sürüm.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return res;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match('index.html')))
  );
});
