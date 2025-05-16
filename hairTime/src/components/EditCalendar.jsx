import Calendar from "react-calendar";
import React from "react";
import 'react-calendar/dist/Calendar.css';

function EditCalendar({value, onChange}){

    return(
    <div>
        <Calendar onChange={onChange} value={value}/>
    </div>);
}

export default EditCalendar