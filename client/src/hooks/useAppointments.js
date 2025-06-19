import { useState, useEffect, useCallback } from "react";
import { getAllAppointments, deleteAppointment } from "../httpManager/request";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { useAlert } from "./useAlert";
export function useAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { alert, showAlert, hideAlert } = useAlert();
  const [error, setError] = useState("");
  const axiosPrivate = useAxiosPrivate();

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

  const deleteApp = async (appointmentId) => {
    try {
      await deleteAppointment(axiosPrivate, appointmentId);
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
