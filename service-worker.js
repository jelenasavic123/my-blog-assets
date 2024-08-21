const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles/main.css',
  '/scripts/main.js',
  '/p/lista-svih-serija_5.html',  // Dodajte sve URL-ove koje želite da keširate
  'https://jelenasavic123.github.io/my-blog-assets/icon192.png',
  'https://jelenasavic123.github.io/my-blog-assets/icon512.png',
  'https://jelenasavic123.github.io/my-blog-assets/icon360.png',
  'https://jelenasavic123.github.io/my-blog-assets/icon640.png',
  'https://jelenasavic123.github.io/my-blog-assets/screenshot1.png',
  'https://jelenasavic123.github.io/my-blog-assets/screenshot2.png'
];

// Instalirajte service worker i keširajte stranice
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Poslušajte fetch događaje i vratite keširane resurse ili mrežne odgovore
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
