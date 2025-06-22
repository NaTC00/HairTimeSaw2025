import { useEffect, useState } from "react";
import {
  subscribeNotification,
  checkNotificationSubscription,
  unsubscribeNotificationById,
} from "../httpManager/request";
import { useAxiosPrivate } from "./useAxiosPrivate";

export function usePushSubscription(checkOnly = false) {
  const [subscribed, setSubscribed] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState(null);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  const checkSubscription = async () => {
    try {
      console.log("Esecuzione controllo sottoscrizione");

      if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
        setError("Push API non supportata.");
        console.log("Push API non supportata.");
        return;
      }

      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (!subscription) {
        console.log("Nessuna subscription trovata");
        setSubscribed(false);
        setSubscriptionId(null);
        return;
      }

      const id = await checkNotificationSubscription(
        axiosPrivate,
        subscription,
      );
      if (id) {
        console.log("Sottoscrizione trovata con ID:", id);
        setSubscribed(true);
        setSubscriptionId(id);
      } else {
        console.log("Nessuna sottoscrizione registrata sul server");
        setSubscribed(false);
        setSubscriptionId(null);
      }

      setError(null);
    } catch (err) {
      console.error("Errore nel check sottoscrizione:", err);
      setError(err?.response?.data?.error || err.message);
    }
  };

  useEffect(() => {
    checkSubscription();
  }, [checkOnly]);

  const subscribePush = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      let subscription = await registration.pushManager.getSubscription();

      if (!subscription) {
        if (Notification.permission !== "granted") {
          const permission = await Notification.requestPermission();
          if (permission !== "granted") {
            console.log("Permesso notifiche negato.");
            throw new Error("Permesso notifiche negato.");
          }
        }

        const vapidKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;
        const convertedKey = urlBase64ToUint8Array(vapidKey);

        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedKey,
        });
        console.log("Eseguo richiesta per subscribeNotification");
        await subscribeNotification(axiosPrivate, subscription);
      }

      const id = await checkNotificationSubscription(
        axiosPrivate,
        subscription,
      );

      if (!id) {
        console.log(
          "La subscription non era salvata nel server. La registro...",
        );
        await subscribeNotification(axiosPrivate, subscription);
      } else {
        console.log("Subscription già presente nel server");
      }
      setSubscribed(true);
      setSubscriptionId(id);
      setError(null);
    } catch (err) {
      console.error("Errore nella sottoscrizione:", err);
      setError(err?.response?.data?.error || err.message);
    }
  };

  const unsubscribePush = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscriptionId) {
        await unsubscribeNotificationById(axiosPrivate, subscriptionId);
      }

      if (subscription) {
        await subscription.unsubscribe();
      }

      setSubscribed(false);
      setSubscriptionId(null);
      setError(null);
    } catch (err) {
      console.error("Errore disiscrizione:", err);
      setError(err?.response?.data?.error || err.message);
    }
  };

  return { subscribed, subscriptionId, error, subscribePush, unsubscribePush };
}

// 🔁 Util per VAPID
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}
