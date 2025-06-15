import { useEffect, useState } from "react";
import { subscribeNotification } from "../httpManager/request";

export function usePushSubscription(enabled, axiosPrivate) {
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!enabled) return;

    async function subscribePush() {
      try {
        if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
          throw new Error("Push API non supportata nel browser.");
        }

        if (Notification.permission !== "granted") {
          const permission = await Notification.requestPermission();
          if (permission !== "granted") {
            throw new Error("Permesso notifiche negato dall'utente.");
          }
        }

        const registration = await navigator.serviceWorker.ready;
        const vapidKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;
        const convertedKey = urlBase64ToUint8Array(vapidKey);

        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedKey,
        });

        await subscribeNotification(axiosPrivate, subscription);
        setError(null);
      } catch (err) {
        console.error("Errore nella sottoscrizione push:", err);
        setError(err?.response?.data?.error || err.message);
      }
    }

    subscribePush();
  }, [enabled, axiosPrivate]);

  return error;
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}
