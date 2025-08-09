const CACHE_NAME = 'hangman-v2';
const urlsToCache = [
  './',
  './hangman.html',
  
  // Hangman images
  'images/Hangman_0.png',
  'images/Hangman_1.png',
  'images/Hangman_2.png',
  'images/Hangman_3.png',
  'images/Hangman_4.png',
  'images/Hangman_5.png',
  'images/Hangman_6.png',
  
  // Favicon assets
  'android-icon-192x192.png',
  'android-icon-512x512.png',
  'apple-icon-57x57.png',
  'apple-icon-60x60.png',
  'apple-icon-72x72.png',
  'apple-icon-76x76.png',
  'apple-icon-114x114.png',
  'apple-icon-120x120.png',
  'apple-icon-144x144.png',
  'apple-icon-152x152.png',
  'apple-icon-180x180.png',
  'favicon-32x32.png',
  'favicon-96x96.png',
  'favicon-16x16.png',
  'ms-icon-144x144.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});