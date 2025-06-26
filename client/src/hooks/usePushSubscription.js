import { useEffect, useState } from "react";
import {
  subscribeNotification,
  checkNotificationSubscription,
  unsubscribeNotificationById,
} from "../httpManager/request";
import { useAxiosPrivate } from "./useAxiosPrivate";

// Hook custom per gestire la sottoscrizione alle notifiche push
export function usePushSubscription(checkOnly = false) {
  const [subscribed, setSubscribed] = useState(false); //Stato: utente iscritto o meno
  const [subscriptionId, setSubscriptionId] = useState(null);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  // Funzione per verificare se l'utente è già iscritto alle notifiche push
  const checkSubscription = async () => {
    try {
      console.log("Esecuzione controllo sottoscrizione");

      // Verifica se il browser supporta le Push notification
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

      // Verifica  se la subscription è già registrata nel server
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
    }
  };

  useEffect(() => {
    checkSubscription();
  }, [checkOnly]);

  // Funzione per iscrivere l’utente alle notifiche push
  const subscribePush = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      let subscription = await registration.pushManager.getSubscription();

      if (!subscription) {
        // Richiede il permesso all’utente se non ancora concesso
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
        // Invia la subscription al server
        await subscribeNotification(axiosPrivate, subscription);
      }

      // Verifica se la subscription esiste già sul server
      const id = await checkNotificationSubscription(
        axiosPrivate,
        subscription,
      );

      if (!id) {
        // Se non esiste, la registra
        console.log(
          "La subscription non era salvata nel server. La registro...",
        );
        await subscribeNotification(axiosPrivate, subscription);
      } else {
        console.log("Subscription presente nel server");
      }
      setSubscribed(true);
      setSubscriptionId(id);
      setError(null);
      return true;
    } catch (err) {
      console.error("Errore nella sottoscrizione:", err);
      setError(err?.response?.data?.error || err.message);
      return false;
    }
  };

  // Funzione per annullare la sottoscrizione alle notifiche
  const unsubscribePush = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      // Rimuove la subscription dal server (se registrata)
      if (subscriptionId) {
        await unsubscribeNotificationById(axiosPrivate, subscriptionId);
      }

      // Rimuove la subscription dal server (se registrata)
      if (subscription) {
        await subscription.unsubscribe();
      }

      setSubscribed(false);
      setSubscriptionId(null);
      setError(null);
      return true;
    } catch (err) {
      console.error("Errore disiscrizione:", err);
      setError(err?.response?.data?.error || err.message);
      return false;
    }
  };

  return { subscribed, subscriptionId, error, subscribePush, unsubscribePush };
}

// Funzione per convertire una VAPID key da base64 a Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}
