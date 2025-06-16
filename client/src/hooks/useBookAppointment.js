import { useEffect, useState, useCallback } from "react";
import { getSlotAvailable, bookAppointment } from "../httpManager/request";
import { useServices } from "./useServices";
import { useAxiosPrivate } from "./useAxiosPrivate";

export function useBookAppointment() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [availableSlots, setAvailableSlots] = useState({});
  const [enabledDates, setEnabledDates] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [alertError, setAlertError] = useState(null);
  const [alertSuccess, setAlertSuccess] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const {
    services,
    isLoading: isServicesLoading,
    error: servicesError,
    refetch: refetchServices,
  } = useServices();

  const formatDate = useCallback((date) => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }, []);

  const handleServiceChange = useCallback(async (selected) => {
    setSelectedServices(selected);
    setSelectedDate(null);
    setSelectedTimeSlot(null);
    setTimeSlots([]);

    if (selected.length > 0) {
      try {
        const selectedIds = selected.map((item) => item.id);
        const slotData = await getSlotAvailable(selectedIds);
        setAvailableSlots(slotData);
        const enabled = Object.keys(slotData).map(
          (dateStr) => new Date(dateStr),
        );
        setEnabledDates(enabled);
      } catch (error) {
        console.error("Errore durante il recupero degli slot:", error);
      }
    } else {
      setAvailableSlots({});
      setEnabledDates([]);
    }
  }, []);

  const handleDateChanged = useCallback(
    (date) => {
      const formatted = formatDate(date);
      setSelectedDate(date);
      const slots = availableSlots[formatted] || [];
      setTimeSlots(slots);
      setShowCalendar(false);
    },
    [availableSlots, formatDate],
  );

  const handleTimeSlotChange = useCallback((slot) => {
    setSelectedTimeSlot(slot);
  }, []);

  const handleBook = useCallback(async () => {
    try {
      const selectedIds = selectedServices.map((item) => item.id);
      const date = formatDate(selectedDate);

      await bookAppointment(
        axiosPrivate,
        selectedIds,
        phoneNumber,
        date,
        selectedTimeSlot,
      );

      setAlertSuccess({
        heading: "Prenotazione appuntamento completata",
        message: "La tua prenotazione è stata creata con successo.",
      });

      setTimeout(() => setAlertSuccess(null), 3000);
      resetForm();
    } catch (error) {
      setAlertError(error);
      setTimeout(() => setAlertError(null), 3000);
    }
  }, [
    selectedServices,
    selectedDate,
    selectedTimeSlot,
    phoneNumber,
    formatDate,
    axiosPrivate,
  ]);

  const resetForm = () => {
    setSelectedDate(null);
    setSelectedTimeSlot(null);
    setSelectedServices([]);
    setPhoneNumber("");
    setTimeSlots([]);
    setEnabledDates([]);
    setAvailableSlots({});
  };

  return {
    services,
    servicesError,
    isServicesLoading,
    selectedDate,
    selectedTimeSlot,
    selectedServices,
    phoneNumber,
    timeSlots,
    enabledDates,
    formattedDate: formatDate(selectedDate),
    showCalendar,
    alertError,
    alertSuccess,
    setPhoneNumber,
    setShowCalendar,
    handleServiceChange,
    handleDateChanged,
    handleTimeSlotChange,
    handleBook,
    refetchServices,
  };
}
