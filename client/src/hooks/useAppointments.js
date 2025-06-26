import { useState, useEffect, useCallback } from "react";
import { getAllAppointments, deleteAppointment } from "../httpManager/request";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { useAlert } from "./useAlert";

// Hook custom per gestire la logica delle prenotazioni utente
export function useAppointments() {
  const [appointments, setAppointments] = useState([]); // Lista delle prenotazioni
  const [isLoading, setIsLoading] = useState(true); // Stato di caricamento
  const { alert, showAlert, hideAlert } = useAlert();
  const [error, setError] = useState(""); // Eventuale errore in fase di fetch
  const axiosPrivate = useAxiosPrivate(); // Hook per ottenere l'istanza Axios privata con token

  //recupera tutte le prenotazioni dell'utente
  const loadAppointments = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getAllAppointments(axiosPrivate);
      setAppointments(data);
      setError("");
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  //elimina la prenotazione selezionata
  const deleteApp = async (appointmentId) => {
    try {
      await deleteAppointment(axiosPrivate, appointmentId);
      // Rimuove la prenotazione dalla lista
      setAppointments((prevAppointments) =>
        prevAppointments.filter((app) => app.id !== appointmentId),
      );
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err,
      };
    }
  };

  return {
    appointments,
    isLoading,
    error,
    alert,
    showAlert,
    hideAlert,
    deleteApp,
    refetchAppointments: loadAppointments,
  };
}
