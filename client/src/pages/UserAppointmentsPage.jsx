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

export default function UserAppointmentsPage(){
    const [selectedMonth, setSelectedMonth] = useState( new Date().getMonth());
    const [showSubmitForm, setShowSubmitForm] = useState(false);

    const handleToggle = () => {
        setShowSubmitForm(prev => !prev);
    };
  

   
    const {
        appointments,
        isLoading,
        error: appointmentsError,
        alert: appointmentAlert,
        showAlert: showAppointmentAlert,
        hideAlert: hideAppointmentAlert,
        deleteApp,
        refetchAppointments
    } = useAppointments();

    const{
        alert: reviewAlert,
        showAlert: showReviewAlert,
        hideAlert: hideReviewAlert,
        submit

    } = useReviews()

   




    const handleDeleteAppointment = async (appointmentId) => {
        const result = await deleteApp(appointmentId)
        if (!result.success) {
            showAppointmentAlert({
                title: "Cancellazione fallita!",
                message: result.error,
                error: true,
              });
        }else{
            showAppointmentAlert({
                title: "Cancellazione riuscita",
                message: "L'appuntamento è stato cancellato correttamente.",
                error: false
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
      

        const result = await submit(rating, comment)
        if (!result.success) {
            showReviewAlert({
              title: "Recensione non inviata!",
              message: result.error,
              error: true,
            });
          } else {
            showReviewAlert({
              title: "Recensione inviata!",
              message: "Grazie per il tuo feedback! La tua recensione è stata registrata correttamente.",
              error: false,
            });
        }
       
    }


    
    
      return (
        <Container fluid className="p-5" style={{backgroundColor: 'var(--background)'}}>
                
        <Row className="mb-3">
            <Col xs={12} md={6} lg={6} className="mb-3 mb-md-0">
            {appointmentAlert?.error ? (
                <FailureAlert
                    title={appointmentAlert.title}
                    error={{ message: appointmentAlert.message }}
                    onClose={hideAppointmentAlert}
                />
                ) : (
                appointmentAlert && (
                    <SuccessAlert
                    content={{
                        heading: appointmentAlert.title,
                        message: appointmentAlert.message,
                    }}
                    onClose={hideAppointmentAlert}
                    />
                )
                )}

                {reviewAlert?.error ? (
                <FailureAlert
                    title={reviewAlert.title}
                    error={{ message: reviewAlert.message }}
                    onClose={hideReviewAlert}
                />
                ) : (
                reviewAlert && (
                    <SuccessAlert
                    content={{
                        heading: reviewAlert.title,
                        message: reviewAlert.message,
                    }}
                    onClose={hideReviewAlert}
                    />
                )
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