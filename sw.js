const CACHE_NAME = "test-cache-v2";
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
        keys.filter(k => k !== CACHE_NAME)
            .map(k => caches.delete(k))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {

  // Navigation -> always index.html
  if (event.request.mode === "navigate") {
    event.respondWith(
      caches.match(BASE_PATH + "index.html")
    );
    return;
  }

  // Static files -> cache only
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response;
      return Promise.reject("NETWORK BLOCKED");
    })
  );

});
