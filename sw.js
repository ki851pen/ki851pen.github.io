importScripts('./node_modules/workbox-sw/build/workbox-sw.js')
workbox.precaching.precacheAndRoute([
  {
    "url": "index.html",
    "revision": "134506bc344038b9ac84aeb734c3a921"
  },
  {
    "url": "styles.css",
    "revision": "951cb19b984537dbdfc1ba47235b88be"
  },
  {
    "url": "app.js",
    "revision": "dd5922722b28200f13b24893e8174a11"
  },
  {
    "url": "fallback.json",
    "revision": "a0cca426b7e16cdd174a20c4625ac59a"
  },
  {
    "url": "images/Sorry.jpg",
    "revision": "c8a9d43e921a699fd2489d49392e81b9"
  }
]);

workbox.routing.registerRoute(
    new RegExp('https://newsapi.org/(.*)'), 
    new workbox.strategies.StaleWhileRevalidate({
      cacheExpiration: { maxEntriea: 20, maxAgeSeconds: 12 * 60 * 60 }
    })
);

workbox.routing.registerRoute(
    new RegExp('.*/.(png|jpg|jpeg|gif)'), 
        workbox.strategies.cacheFirst({
        cacheName: 'news-images',
        cacheExpiration: { maxEntriea: 20, maxAgeSeconds: 12 * 60 * 60 },
        cacheableResponse: { statuses: [0, 200] }
    })
);

workbox.routing.setCatchHandler(({event}) => {
  return caches.match('./fallback.json');
});

