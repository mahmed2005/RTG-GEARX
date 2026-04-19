const CACHE_NAME = 'rtg-cache-v1';
const CORE_ASSETS = [
  'index.html',
  'manifest.json',
  'sw.js',
  'icon-192.png',
  'icon-512.png'
  // ملاحظة: يمكنك إضافة هنا ملفات محلية أخرى (صور المنتجات، ملفات JS/CSS منفصلة) إذا أردت تخزينها أوفلاين
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(CORE_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  // شبكة أولاً ثم fallback للكاش
  event.respondWith(
    fetch(event.request).then(response => {
      // إذا الاستجابة صالحة، خزّن نسخة في الكاش (اختياري للملفات المحلية)
      try {
        const resClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, resClone).catch(()=>{});
        });
      } catch(e){}
      return response;
    }).catch(() => {
      return caches.match(event.request).then(cached => {
        if (cached) return cached;
        // إذا لم يوجد في الكاش، حاول إرجاع صفحة index كـ fallback (مفيد لل SPA)
        return caches.match('index.html');
      });
    })
  );
});
