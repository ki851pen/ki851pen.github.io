importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');
workbox.precaching.precacheAndRoute([
  {
    "url": "App.js",
    "revision": "86be8e0a0960635c2917ce9052ea6366"
  },
  {
    "url": "images/icons/icon-128x128.png",
    "revision": "423f4b50799e99a8f82034e0af14c4c5"
  },
  {
    "url": "images/icons/icon-144x144.png",
    "revision": "7a1ce75e7c471983cd3c09fa0b3f569f"
  },
  {
    "url": "images/icons/icon-152x152.png",
    "revision": "55e5edabf7437f357588abb17e13f1ac"
  },
  {
    "url": "images/icons/icon-192x192.png",
    "revision": "36bda4d0613da690d1e1fe6b57a2840b"
  },
  {
    "url": "images/icons/icon-384x384.png",
    "revision": "3c6bcbc533bec681fcf99dd9630e7d24"
  },
  {
    "url": "images/icons/icon-512x512.png",
    "revision": "49803157e2441b9b72fbc4cad2da51b2"
  },
  {
    "url": "images/icons/icon-72x72.png",
    "revision": "d3a2268c1793e157696648aee2f5d177"
  },
  {
    "url": "images/icons/icon-96x96.png",
    "revision": "547b5d29e0a9eb36691e0e057e62db9e"
  },
  {
    "url": "images/logo_long.png",
    "revision": "4302ca4ff047f5564ef97c1cb9f3cc10"
  },
  {
    "url": "images/logo_white.png",
    "revision": "c74555bd99b1d66da89f33eeb4360dd4"
  },
  {
    "url": "images/logo.png",
    "revision": "17d90b823a455f328168a29ef5b47e04"
  },
  {
    "url": "images/news_fishbowl.png",
    "revision": "e7298ca15c786be50fdebcbadd9b3d10"
  },
  {
    "url": "images/news.jpg",
    "revision": "f7f60ccab1cbd5a4cc0399c1d46b6066"
  },
  {
    "url": "images/portfolio_accelerator.png",
    "revision": "23874727da1fb8cf5388ec3cb65a45c5"
  },
  {
    "url": "images/portfolio_ideation.png",
    "revision": "5a9357eb7456f8d933b6c094c663d58b"
  },
  {
    "url": "images/portfolio_scale.png",
    "revision": "ce9a06c5e7b8ad83f08e5ef6c3273fe6"
  },
  {
    "url": "images/portfolio_space.png",
    "revision": "112c141fb0fbf8a7bf245dc763414176"
  },
  {
    "url": "images/workingmodel.png",
    "revision": "968510dff1f64e2fee5dc88b56b04dba"
  },
  {
    "url": "index.html",
    "revision": "062d07bb757722a64d53ea0d28574de6"
  },
  {
    "url": "styles.css",
    "revision": "e97948f125d25b8b4a019376259d9d24"
  }
]);

workbox.routing.registerRoute(
    new RegExp('https://www.youtube.com/(.*)'), 
    new workbox.strategies.CacheFirst({
      cacheExpiration: { maxEntriea: 20, maxAgeSeconds: 12 * 60 * 60 }
    })
  );
  
