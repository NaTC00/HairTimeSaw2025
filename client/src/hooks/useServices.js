// src/hooks/useServices.js
import { useState, useEffect, useCallback } from "react";
import { getAllServices } from "../httpManager/request";

/**
 * Hook per ottenere i servizi.
 * Usa axios e sfrutta Workbox (CacheFirst) in background.
 */
export function useServices() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServices = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getAllServices(); // Axios farà la richiesta e Workbox gestirà la cache
      setServices(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return {
    services,
    isLoading,
    error,
    refetch: fetchServices, // opzionale: per aggiornare a mano
  };
}
