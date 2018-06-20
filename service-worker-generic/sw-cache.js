const cacheName = 'demo-cache-v1.1';

self.addEventListener('install', event => event.waitUntil(installSW().then(() => console.log('Service Worker: Installed'))));
self.addEventListener('activate', () => activateSW().then(() => console.log('Server Worker: Activating')));
self.addEventListener('fetch', event => event.respondWith(fetchInterceptor(event)));

async function installSW() {
  console.log('Service Worker: Installing');
  const cache = await caches.open(cacheName);

  return cache.addAll([
    '/',
    'styles.css',
    'cazton.png',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css',
    'https://code.jquery.com/jquery-3.3.1.slim.min.js',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js'
  ]);
}

async function activateSW() {
  console.log('Service Worker: Activated');
  const cacheKeys = await caches.keys();

  cacheKeys.forEach(key => {
    if (key !== cacheName ) {
      caches.delete(key);
    }
  });
}

async function fetchInterceptor(event) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(event.request);

  if (cachedResponse) {
    console.log(`Url was in cache: ${event.request.url}`);
    return cachedResponse;
  }

  console.log(`Url was NOT in cache: ${event.request.url}`);
  return await fetch(event.request);
}