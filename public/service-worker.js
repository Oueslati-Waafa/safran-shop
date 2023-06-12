// service-worker.js

// Set the cache name and version
const CACHE_NAME = "my-cache";
const CACHE_VERSION = "v1";

// Define the files to cache
const urlsToCache = [
  "/",
  "/index.html",
  "/offline.png",
  "/logo192.png",
  // Add other files to cache here
];

// Install the service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(`${CACHE_NAME}-${CACHE_VERSION}`).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event handler
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return the cached response if found
      if (response) {
        return response;
      }

      // If the request is not cached, fetch it
      return fetch(event.request);
    })
  );
});
