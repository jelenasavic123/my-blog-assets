const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles/main.css',
  '/scripts/main.js',
  '/p/lista-svih-serija_5.html',
  '/p/nasa-preporuka.html',
  '/p/najgedanije.html',  // Dodajte ovu stranicu
  '/2024/05/laz-yalan.html',  // Dodajte ovaj post
  'https://jelenasavic123.github.io/my-blog-assets/16.png',
  'https://jelenasavic123.github.io/my-blog-assets/32.png',
  'https://jelenasavic123.github.io/my-blog-assets/48.png',
  'https://jelenasavic123.github.io/my-blog-assets/64.png',
  'https://jelenasavic123.github.io/my-blog-assets/128.png',
  'https://jelenasavic123.github.io/my-blog-assets/192.png',
  'https://jelenasavic123.github.io/my-blog-assets/360.png',
  'https://jelenasavic123.github.io/my-blog-assets/512.png',
  'https://jelenasavic123.github.io/my-blog-assets/screen360x640.png',
  'https://jelenasavic123.github.io/my-blog-assets/1280x800.png',
  'https://jelenasavic123.github.io/my-blog-assets/screen360x640-2.png',
  '/offline.html'  // Dodajte ovu stranicu za offline prikaz
];

// Instalirajte servisni radnik i keširajte stranice
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Aktivirajte novi servisni radnik i očistite stare keševe
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Brisanje starih keševa
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Poslušajte fetch događaje i vratite keširane resurse ili mrežne odgovore
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response; // Vraća keširani odgovor ako postoji
      }

      // Ako nije u kešu, pokušaj preuzimanja sa mreže
      return fetch(event.request).catch(() => {
        // Ako je mreža nedostupna, vratite offline stranicu
        return caches.match('/offline.html');
      });
    })
  );
});
