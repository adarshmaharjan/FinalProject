if (typeof importScripts === 'function') {
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js',
  );
  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded');
    workbox.core.skipWaiting();
    console.log(workbox);
    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

    /* custom cache rules */
    workbox.routing.registerRoute(
      new workbox.routing.NavigationRoute(
        new workbox.strategies.NetworkFirst({
          cacheName: 'PRODUCTION',
          // plugins: [bgSyncPlugin],
        }),
      ),
    );

    const bgSyncPlugin = new workbox.backgroundSync.BackgroundSyncPlugin(
      'myQueue',
      {
        maxRetentionTime: 24 * 60,
        callbacks: {
          queueDidReplay: showNotification,
        },
      },
    );
  } else {
    console.log('Workbox could not be loaded. No Offline support');
    //
  }
}

console.log('Service Worker Loaded...');

self.addEventListener('push', e => {
  const data = e.data.json();
  console.log('Push Recieved...');
  self.registration.showNotification(data.title, {
    body: 'Notified by AbskMedia!',
    icon: 'https://bit.ly/2XI1KD3',
    vibrate: [100, 50, 100, 50, 100, 50, 100, 50, 100, 50],
    requireInteraction: true,
    data: {
      dateofArrival: Date.now(),
      primaryKey: 1,
    },
  });
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(clients.openWindow('/login'));
});

var showNotification = () => {
  self.registration.showNotification('Post Sent', {
    body: 'You are back online and your post was successfully sent!',
  });
};
