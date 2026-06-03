// solray.ai kill-switch service worker.
//
// In early 2026 the app itself was served on this domain with a Workbox
// service worker that precached the app shell. Visitors from that era still
// carry that worker: it hijacks navigations to solray.ai, serves the dead
// cached app shell, and its old JS forwards to /today, a black screen.
//
// This worker replaces it automatically. Browsers re-fetch sw.js from the
// network on their own update check, even on a hijacked device. The moment
// this version activates it: wipes every cache on the origin, unregisters
// itself completely (the landing needs no service worker), and reloads each
// open tab once from the network. The visitor sees the real landing page.
// Zero user action.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
    } catch (_) { /* best effort */ }
    try { await self.clients.claim(); } catch (_) { /* best effort */ }
    try { await self.registration.unregister(); } catch (_) { /* best effort */ }
    try {
      const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      for (const client of clients) {
        try { await client.navigate(client.url); } catch (_) { /* best effort */ }
      }
    } catch (_) { /* best effort */ }
  })());
});

// No fetch handler: this worker never serves anything. After activation it
// is gone and all requests flow straight to the network.
