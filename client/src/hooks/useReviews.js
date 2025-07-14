import { useCallback, useEffect, useState } from "react";
import { submitReview, getReviews } from "../httpManager/request";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { useAlert } from "./useAlert";

// Hook custom per gestire le recensioni degli utenti
export function useReviews() {
  const [reviews, setReviews] = useState([]); // Stato che contiene tutte le recensioni caricate
  const [isLoading, setIsLoading] = useState(true); // Stato per indicare se i dati sono in fase di caricamento
  const [error, setError] = useState(null);
  const { alert, showAlert, hideAlert } = useAlert(); // Hook per la gestione degli alert
  const axiosPrivate = useAxiosPrivate();

  // Funzione per inviare una nuova recensione
  const submit = async (rating, comment) => {
    try {
      await submitReview(axiosPrivate, rating, comment);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: error,
      };
    }
  };

  // Funzione per recuperare tutte le recensioni
  const fetchReviews = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getReviews();
      setReviews(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []); //Se non uso useCallback, la funzione cambia ad ogni render e il useEffect si attiva ogni volta.

  // Recupera le recensioni all'avvio e imposta un aggiornamento ogni 60 secondi
  useEffect(() => {
    fetchReviews();

    const interval = setInterval(() => {
      fetchReviews();
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [fetchReviews]);

  return {
    alert,
    showAlert,
    hideAlert,
    reviews,
    submit,
    error,
    refetchReviews: fetchReviews,
    isLoading,
  };
}
