// Ver
<<<<<<< HEAD
const CACHE_NAME = 'karaoke-cache-v10';
=======
<<<<<<< Updated upstream
<<<<<<< HEAD
const CACHE_NAME = 'karaoke-cache-v5';
=======
const CACHE_NAME = 'karaoke-cache-v2';
>>>>>>> 96cd7e0ce8713cb10b11cff8166b0ff73d95108b
=======
const CACHE_NAME = 'karaoke-cache-v2';
>>>>>>> Stashed changes
>>>>>>> 8c497d8d79166da724316c9a5f298e662d443262

// Arquivos para cache (atualize com seus caminhos)
const ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/songs.json',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png'
];

// Instalação
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .catch(err => console.log('Erro ao adicionar ao cache:', err))
  );
});

// Interceptar requisições
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Limpeza de cache antigo
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Atualizações
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});