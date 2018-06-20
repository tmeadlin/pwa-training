self.addEventListener('install', event =>
  event.waitUntil(Promise.resolve().then(() => console.log('Service Worker: Installed')))
);

self.addEventListener('activate', event =>
  event.waitUntil(Promise.resolve().then(() => console.log('Service Worker: Activated')))
);

self.addEventListener('fetch', event => {
  console.log(`intercepting fetch for requestUrl: ${event.request.url}`);
  return event.respondWith(fetch((event.request.url)));
});