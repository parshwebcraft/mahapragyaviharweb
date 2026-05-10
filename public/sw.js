self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    self.clients.claim().then(() =>
      caches.keys().then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
    )
  );
});

self.addEventListener("fetch", () => {
  return;
});
