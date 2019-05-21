importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

const precacheManifest = [];

workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(precacheManifest);

const parametrosCacheConfig = {
  cacheName: 'parametros-data'
};

workbox.routing.registerRoute(/.*dominios/, workbox.strategies.cacheFirst(parametrosCacheConfig), 'GET');
workbox.routing.registerRoute(/.*reinos/, workbox.strategies.cacheFirst(parametrosCacheConfig), 'GET');
workbox.routing.registerRoute(/.*filos/, workbox.strategies.cacheFirst(parametrosCacheConfig), 'GET');
workbox.routing.registerRoute(/.*clases/, workbox.strategies.cacheFirst(parametrosCacheConfig), 'GET');
workbox.routing.registerRoute(/.*ordenes/, workbox.strategies.cacheFirst(parametrosCacheConfig), 'GET');
workbox.routing.registerRoute(/.*familias/, workbox.strategies.cacheFirst(parametrosCacheConfig), 'GET');
workbox.routing.registerRoute(/.*generos/, workbox.strategies.cacheFirst(parametrosCacheConfig), 'GET');
workbox.routing.registerRoute(/.*especies/, workbox.strategies.cacheFirst(parametrosCacheConfig), 'GET');

const especimenesCacheConfig = {
  cacheName: 'especimenes-data'
};

workbox.routing.registerRoute(/.*especimenes.*/, workbox.strategies.cacheFirst(especimenesCacheConfig), 'GET');

const especimenesImagesCacheConfig = {
  cacheName: 'especimenes-images'
};

workbox.routing.registerRoute(/.*.(?:png|jpg|jpeg|svg).*/, workbox.strategies.cacheFirst(especimenesImagesCacheConfig), 'GET');