import { useState } from "react";
import { getSlotAvailable, bookAppointment } from "../httpManager/request";
import { useServices } from "./useServices";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { useAlert } from "./useAlert";

// Hook personalizzato per gestire la prenotazione di appuntamenti
export function useBookAppointment() {
  const [selectedDate, setSelectedDate] = useState(null); // Data selezionata
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null); // Fascia oraria selezionata
  const [selectedServices, setSelectedServices] = useState([]); // Servizi selezionati
  const [phoneNumber, setPhoneNumber] = useState(""); // Numero di telefono inserito
  const [availableSlots, setAvailableSlots] = useState({}); //Date e fasce disponibili
  const [enabledDates, setEnabledDates] = useState([]); //Date disponibili
  const [timeSlots, setTimeSlots] = useState([]); //Fasce dispobili per il giorno selezionato
  const { alert, showAlert, hideAlert } = useAlert();
  const [showCalendar, setShowCalendar] = useState(false); // Stato per la visibilità del calendario

  const axiosPrivate = useAxiosPrivate(); // Hook per ottenere l'istanza Axios privata con token

  // Recupera i servizi disponibili
  const {
    services,
    isLoading: isServicesLoading,
    error: servicesError,
    refetch: refetchServices,
  } = useServices();

  // Funzione per formattare la data in formato "YYYY-MM-DD"
  const formatDate = (date) => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  // Quando l'utente seleziona o deseleziona dei servizi
  const handleServiceChange = async (selected) => {
    setSelectedServices(selected);
    setSelectedDate(null);
    setSelectedTimeSlot(null);
    setTimeSlots([]);

    if (selected.length > 0) {
      try {
        const selectedIds = selected.map((item) => item.id);

        //recupera le date e le fasce orarie disponibli per i servizi selezionati
        const slotData = await getSlotAvailable(selectedIds);

        setAvailableSlots(slotData);

        //Estrae le date dispobili
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

  //Quando l'utente seleziona una data
  const handleDateChanged = (date) => {
    const formatted = formatDate(date);
    setSelectedDate(date);

    //recupera le fasce orarie per la data selezionata
    const slots = availableSlots[formatted] || [];

    setTimeSlots(slots);
    setShowCalendar(false);
  };

  //Quando l'utente seleziona una fascia oraria
  const handleTimeSlotChange = (slot) => {
    setSelectedTimeSlot(slot);
  };

  //Effettua la prenotazione
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

      resetForm(); //Pulisce tutti i campi dopo la prenotazione

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
