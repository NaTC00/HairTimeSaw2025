import Calendar from "react-calendar";
import React from "react";
import 'react-calendar/dist/Calendar.css';

function EditCalendar({ value, onChange, enabledDates = [] }) {

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
        tileDisabled={({ date }) => !isDateEnabled(date)} // 🔒 disabilita i giorni non presenti
      />
    </div>
  );
}

export default EditCalendar;
