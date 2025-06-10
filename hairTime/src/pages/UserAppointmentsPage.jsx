import React, { useState, useEffect, useMemo } from "react";
import AppointmentCard from "../components/appointment/AppointmentCard";
import MonthCarousel from "../components/appointment/MonthCarousel"
import {ListGroup, Container, Row, Col, Button, Fade } from "react-bootstrap";
import FailureAlert from "../components/alert/FailureAlert"
import SuccessAlert from "../components/alert/SuccessAlert";
import SubmitReviews from "../components/appointment/SubmitReviews"
import { useAppointments } from '../hooks/useAppointments';
import {useReviews} from '../hooks/useReviews'
import { useAlert } from '../hooks/useAlert'
import '../styles/colors.css'
import useAxiosPrivate from '../httpManager/useAxiosPrivate'
export default function UserAppointmentsPage(){
    const [selectedMonth, setSelectedMonth] = useState( new Date().getMonth());
    const [showSubmitForm, setShowSubmitForm] = useState(false);
    const { alert: alertError, showAlert: showErrorAlert, hideAlert: hideErrorAlert } = useAlert();
    const { alert: alertSuccess, showAlert: showSuccessAlert, hideAlert: hideSuccessAlert } = useAlert();

    const handleToggle = () => {
        setShowSubmitForm(prev => !prev);
    };
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
  

    const axiosPrivate = useAxiosPrivate();
    const {
        appointments,
        isLoading,
        error: appointmentsError,
        deleteApp,
        refetchAppointments
    } = useAppointments({ useAxiosPrivate: axiosPrivate });

    const{
        submit,
        error: reviewError

    } = useReviews({ useAxiosPrivate: axiosPrivate })

   




    const handleDeleteAppointment = async (appointmentId) => {
        const success = await deleteApp(appointmentId)
        if(success){
            showSuccessAlert({
                title: "Cancellazione riuscita",
                message: "L'appuntamento è stato cancellato correttamente."
            })
        }
    }



    const filteredAppointments = useMemo(() => {
        if (!appointments) return [];
        return appointments.filter(appointment =>
            new Date(appointment.date).getMonth() === selectedMonth
        );
    }, [appointments, selectedMonth])

    useEffect(() => {
        if(appointmentsError){
            showErrorAlert({
                title: "Errore",
                error: appointmentsError
              })
        }
    }, [appointmentsError])


    const handleSubmitReview = async (rating, comment) => {
       /* try{
            await submitReview(axiosPrivate, rating, comment)
            setAlertSuccess({heading: "Recensione inviata!", messsage: "Recensione inviata con successo! Grazie per aver condiviso la tua opinione."})
        }catch(error){
            console.error(error.response?.data?.error);
            setAlertError({
                error: error,
                title: "Invio recensione fallita"
            })
            setTimeout(() => setAlertError(null), 5000);
        }*/

        const success = await submit(rating, comment)
        if (success) {
            showSuccessAlert({
                title: "Recensione inviata",
                message: "Grazie per il tuo feedback! La tua recensione è stata registrata correttamente."
            })
        }
       
    }

    useEffect(() => {
        if (reviewError) {
            showErrorAlert({
                title: "Errore durante l'invio",
                error: reviewError
            });
        }
    }, [reviewError]);

    
    
      return (
        <Container fluid className="p-5" style={{backgroundColor: 'var(--background)'}}>
                
        <Row className="mb-3">
            <Col xs={12} md={6} lg={6} className="mb-3 mb-md-0">
            {alertError && alertError.error && (
            <FailureAlert
                error={alertError.error}
                title={alertError.title}
                onClose={hideErrorAlert}
            />
            )}

            {alertSuccess && (
            <SuccessAlert
                content={{
                    heading: alertSuccess.title,
                    message: alertSuccess.message
                }}
                onClose={hideSuccessAlert}
            />
            )}
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
                {filteredAppointments.map((app) => (
                <div key={app.id} className="mb-3">
                    <AppointmentCard appointment={app} onDeleteAppointment={handleDeleteAppointment}/>
                </div>
                ))}
            </div>
            </Col>
        </Row>
        <Row className="justify-content-center">
            <Col  xs="auto" className="text-center">
                <Button
                size="sm"
                variant="primary"
                onClick={handleToggle}
                className="btn-ornage"
                >
                LASCIA UNA RECENSIONE
                </Button>
            </Col>
        </Row>

        <Row >
            <Col>
            <Fade in={showSubmitForm} mountOnEnter unmountOnExit>
                <div className="mt-4"> {/* margine per stacco visivo */}
                <SubmitReviews onSubmitReview={handleSubmitReview} />
                </div>
            </Fade>
            </Col>

        </Row>
        </Container>
        
      );

}