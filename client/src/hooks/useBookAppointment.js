import { useState } from "react";
import { getSlotAvailable, bookAppointment } from "../httpManager/request";
import { useServices } from "./useServices";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { useAlert } from "./useAlert";

export function useBookAppointment() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [availableSlots, setAvailableSlots] = useState({});
  const [enabledDates, setEnabledDates] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const { alert, showAlert, hideAlert } = useAlert();
  const [showCalendar, setShowCalendar] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const {
    services,
    isLoading: isServicesLoading,
    error: servicesError,
    refetch: refetchServices,
  } = useServices();

  const formatDate = (date) => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const handleServiceChange = async (selected) => {
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
  };

  const handleDateChanged = (date) => {
    const formatted = formatDate(date);
    setSelectedDate(date);
    const slots = availableSlots[formatted] || [];
    setTimeSlots(slots);
    setShowCalendar(false);
  };

  const handleTimeSlotChange = (slot) => {
    setSelectedTimeSlot(slot);
  };

  const bookApp = async () => {
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
      resetForm();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  };

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
    alert,
    showAlert,
    hideAlert,
    setPhoneNumber,
    setShowCalendar,
    handleServiceChange,
    handleDateChanged,
    handleTimeSlotChange,
    bookApp,
    refetchServices,
  };
}
