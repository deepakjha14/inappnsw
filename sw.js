self.addEventListener('install', ()=>{
    console.log('service worker installed');
})

self.addEventListener('activate', ()=>{
    console.log('service worker activated');
})

self.skipWaiting();

self.addEventListener('fetch', (event)=>{
    console.log('fetch event intercepted', event.request.url);
    event.respondWith(
        caches.open('cordova-web-app').then(function(cache) {
          return cache.match(event.request).then(function (response) {
            return response || fetch(event.request).then(function(response) {
              cache.put(event.request, response.clone());
              return response;
            });
          });
        })
      );
})
// New service worker registration 