import Calendar from "react-calendar";
import React from "react";
import 'react-calendar/dist/Calendar.css';
// Componente calendario
// Props:
// - value: la data attualmente selezionata
// - onChange: funzione chiamata quando cambia la data
// - enabledDates: array di date abilitabili (tutte le altre verranno disabilitate)
function EditCalendar({ value, onChange, enabledDates = [] }) {

  // Funzione che verifica se una determinata data è abilitata
  const isDateEnabled = (date) => {
    return enabledDates.some(
      (d) =>
        d.getFullYear() === date.getFullYear() &&
        d.getMonth() === date.getMonth() &&
        d.getDate() === date.getDate()
    );
  };


  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
        tileDisabled={({ date }) => !isDateEnabled(date)} // Questa funzione viene chiamata automaticamente da react-calendar per ogni giorno visualizzato.
                                                          // Se restituisce true, il giorno sarà disabilitato e non selezionabile.
        className="w-100"
      />
    </div>
  );
}

export default EditCalendar;
