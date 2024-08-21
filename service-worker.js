const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles/main.css',
  '/scripts/main.js',
  '/p/lista-svih-serija_5.html',  // Dodajte sve URL-ove koje želite da keširate
  'https://jelenasavic123.github.io/my-blog-assets/16.png',
  'https://jelenasavic123.github.io/my-blog-assets/32.png',
  'https://jelenasavic123.github.io/my-blog-assets/48.png',
  'https://jelenasavic123.github.io/my-blog-assets/64.png',
  'https://jelenasavic123.github.io/my-blog-assets/128.png',
  'https://jelenasavic123.github.io/my-blog-assets/192.png',
  'https://jelenasavic123.github.io/my-blog-assets/360.png',
  'https://jelenasavic123.github.io/my-blog-assets/512.png',
  'https://jelenasavic123.github.io/my-blog-assets/screen360x640.png',
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
