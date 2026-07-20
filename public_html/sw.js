self.addEventListener('push', function(event) {
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { title: "EventSync Reminder", message: event.data.text() };
    }
  }

  const title = data.title || "EventSync Reminder";
  const options = {
    body: data.message || "You have a new campaign reminder!",
    icon: '/vite.svg',
    requireInteraction: true
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(clients.matchAll({ type: 'window' }).then(windowClients => {
    // Check if there is already a window/tab open with the target URL
    for (var i = 0; i < windowClients.length; i++) {
      var client = windowClients[i];
      // If so, just focus it.
      if (client.url === '/' && 'focus' in client) {
        return client.focus();
      }
    }
    // If not, then open the target URL in a new window/tab.
    if (clients.openWindow) {
      return clients.openWindow('/');
    }
  }));
});
