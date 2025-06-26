// src/hooks/useServices.js
import { useState, useEffect, useCallback } from "react";
import { getAllServices } from "../httpManager/request";

// Hook custom per ottenere i servizi.
export function useServices() {
  const [services, setServices] = useState([]); // Stato per contenere la lista dei servizi
  const [isLoading, setIsLoading] = useState(true); // Stato per indicare se i dati sono in fase di caricamento
  const [error, setError] = useState(null);

  // Funzione per recuperare i servizi
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

  // Effettua il fetch dei servizi al primo render del componente
  //Utilizza la strategia CacheFirst
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
