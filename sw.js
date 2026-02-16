const CACHE_NAME = "cache-v4";
const BASE_PATH = "/customsearchengine/";

const STATIC_FILES = [
  BASE_PATH,
  BASE_PATH + "index.html",
  BASE_PATH + "main.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_FILES);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {

  if (event.request.mode === "navigate") {
    event.respondWith(
      caches.match(BASE_PATH + "index.html")
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );

});
