import { useState, useEffect, useCallback } from "react";
import { getAllAppointments, deleteAppointment } from "../httpManager/request";
import { useAxiosPrivate } from "./useAxiosPrivate";
export function useAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  const loadAppointments = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getAllAppointments(axiosPrivate);
      setAppointments(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  const deleteApp = useCallback(async (appointmentId) => {
    try {
      await deleteAppointment(axiosPrivate, appointmentId);
      setAppointments((prevAppointments) =>
        prevAppointments.filter((app) => app.id !== appointmentId),
      );
      return true;
    } catch (err) {
      setError(err);
      return false;
    }
  }, []);

  return {
    appointments,
    isLoading,
    error,
    deleteApp,
    refetchAppointments: loadAppointments,
  };
}
