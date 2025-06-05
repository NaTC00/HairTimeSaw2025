import React, { useState, useEffect } from "react";
import AppointmentCard from "./AppointmentCard";
import { getAllAppointments, deleteAppointment } from "../../httpManager/request";
import MonthCarousel from "./MonthCarousel"
import useAxiosPrivate from '../../httpManager/useAxiosPrivate'
import {ListGroup, Container, Row, Col, Button } from "react-bootstrap";
import FailureAlert from "../alert/FailureAlert"
import '../../styles/colors.css';
export default function MyAppointment({ onClose }){
    const currentMonth = new Date().getMonth();
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [allAppointments, setAllAppointments] = useState([]);
    const [alertError, setAlertError] = useState(null);
    const axiosPrivate = useAxiosPrivate();
    const mockAppointments = [
        {
          id: 1,
          date: "2025-06-05",
          time_slot: "09:00 - 10:00",
          services: ["Taglio", "Piega"]
        },
        {
          id: 2,
          date: "2025-06-08",
          time_slot: "14:30 - 15:30",
          services: ["Colore"]
        },
        {
          id: 3,
          date: "2025-06-12",
          time_slot: "11:00 - 12:00",
          services: ["Taglio", "Schiariture"]
        },
        {
          id: 4,
          date: "2025-07-01",
          time_slot: "16:00 - 17:00",
          services: ["Maschera", "Piega"]
        },
        {
          id: 5,
          date: "2025-07-15",
          time_slot: "10:00 - 11:00",
          services: ["Taglio"]
        }
      ];
   useEffect(() => {
        const loadAppointments = async () => {
            //const data = await getAllAppointments(axiosPrivate)
            setAllAppointments(mockAppointments);
        }
        loadAppointments()
    }, [])




    const handleDeleteAppointment = async (appointmentId) => {
        try{
            await deleteAppointment(axiosPrivate, appointmentId)
            const newAppointments = allAppointments.filter((a) => a.id !== appointmentId)
            setAllAppointments(newAppointments)
        }catch(error){
            console.error(error.response?.data?.error);
            setAlertError(error)
            setTimeout(() => setAlertError(null), 5000);
        }
    }

   
   
    console.log("Appuntamenti server:", allAppointments);
    const filteredAppointments = allAppointments.filter((app) => {
        const date = new Date(app.date);
        return date.getMonth() === selectedMonth;
      });
    console.log("Appuntamenti filtrati:", filteredAppointments);
      return (
        <Container fluid className="p-5" style={{backgroundColor: 'var(--background)'}}>
                
        <Row className="mb-3">
            <Col xs={12} md={6} lg={6} className="mb-3 mb-md-0">
            {alertError && <FailureAlert error={alertError} title = "Eliminazione prenotazione non andata a buon fine" />}
            </Col>

        </Row>
       
       
        <Row className="justify-content-center">
            
            <Col xs="auto" className="text-center">
                <i className="bi bi-calendar-check fs-1 " style={{ color: 'var(--secondary)' }}/>
            <h2 className="mb-0" style={{color: 'var(--secondary)'}}>Le mie prenotazioni</h2>
            <small className="text-muted">Consulta e gestisci i tuoi appuntamenti</small>
            </Col>
        </Row>

        
        <Row >
            <Col>
            <MonthCarousel
                selectedMonth={selectedMonth}
                onSelectMonth={(index) => setSelectedMonth(index)}
                />
            
            </Col>
        </Row>

       
        <Row className="mb-3">
            <Col>
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {filteredAppointments.map((appointment) => (
                <div key={appointment.id} className="mb-3">
                    <AppointmentCard appointment={appointment} onDeleteAppointment={handleDeleteAppointment}/>
                </div>
                ))}
            </div>
            </Col>
        </Row>
        <Row className="justify-content-center">
            <Col  xs="auto" className="text-center">
                <Button
                size="lg"
                style={{
                    backgroundColor: 'var(--orange)',
                    borderColor: 'var(--orange)',
                    outline: 'none',
                    boxShadow: 'none'}}>
                LASCIA RECENSIONE
                </Button>
            </Col>
        </Row>
        </Container>
        
      );

}