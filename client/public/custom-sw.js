self.addEventListener("push", function (event) {
  console.log("[Service Worker] Push ricevuta");
  const data = event.data?.json() || {};

  const title = data.title || "Notifica";
  const options = {
    body: data.body || "Hai un nuovo messaggio!",
    icon: "icons/icon-192x192.png",
    badge: "icons/icon-192x192.png",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
