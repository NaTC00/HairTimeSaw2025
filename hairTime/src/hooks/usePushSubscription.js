import { useEffect } from "react";
import { subscribeNotification } from "../httpManager/request";

export function usePushSubscription(enabled, axiosPrivate) {
  useEffect(() => {
    if (!enabled) return;

    async function subscribePush() {
      try {
        if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
          console.warn("Push API non supportata nel browser.");
          return;
        }

        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          console.warn("Permesso notifiche negato.");
          return;
        }

        const registration = await navigator.serviceWorker.ready;
        const vapidKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;
        const convertedKey = urlBase64ToUint8Array(vapidKey);

        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedKey,
        });

        await subscribeNotification(axiosPrivate, subscription);
      } catch (error) {
        console.error(
          "Errore nella sottoscrizione push:",
          error?.response?.data?.error || error.message,
        );
      }
    }

    subscribePush();
  }, [enabled, axiosPrivate]);
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}
