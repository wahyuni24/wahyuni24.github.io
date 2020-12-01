importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if(workbox) {
  console.log("Workbox berhasil dimuat");
} else {
  console.log("Worbox gagal dimuat");
}

workbox.precaching.precacheAndRoute([
    { url: "/nav.html", revision: "1" },
    { url: "/index.html", revision: "1" },
    { url: "/article.html", revision: "1"},
    { url: "/pages/home.html", revision: "1" },
    { url: "/pages/articletersimpan.html", revision: "1" },
    { url: "/pages/contact.html", revision: "1" },
    { url: "/pages/about.html", revision: "1" },
    { url: "/images/home.png", revision: "1" },
    { url: "/css/materialize.min.css", revision: "1" },
    { url: "/js/materialize.min.js", revision: "1" },
    { url: "/manifest.json", revision: "1" },
    { url: "/image/wcs.jpg", revision: "1" },
    { url: "/wcsdesign.png",  revision: "1" },
    { url: "/js/idb.js", revision: "1" },
    { url: "/js/db.js", revision: "1" },
    { url: "/js/api.js", revision: "1" },
    { url: "/js/nav.js", revision: "1" },
    { url: "https://fonts.googleapis.com/icon?family=Material+Icons", revision: "1" },
    { url: "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2", revision: "1" },

],
{
  ignoreUrlParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
  new RegExp("/pages/"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "pages"
  })
);


workbox.routing.registerRoute(
  new RegExp("https://api.football-data.org/v2/"),
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpeg|jpg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: "images",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  }),
);

workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "google-fonts-stylesheets",
  })
);

workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  workbox.strategies.cacheFirst({
    cacheName: "google-fonts-webfonts",
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0,200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);


//push notification
self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'wcsdesign.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
