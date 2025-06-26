import React from "react";
import { Col, Row, Container, Button } from "react-bootstrap";
import EditCalendar from 'components/EditCalendar';
import OptionsSelector from 'components/OptionsSelector';
import EditInputText from "../components/EditInputText";
import MultiSelectDropdown from "../components/MultiSelectDropdown";
import FailureAlert from "../components/alert/FailureAlert";
import SuccessAlert from "../components/alert/SuccessAlert";
import NotificationToggle from '../components/NotificationToggle';
import { useBookAppointment } from "../hooks/useBookAppointment"; // <--- tuo nuovo hook

function BookAppointment() {
  const {
    selectedDate,
    selectedTimeSlot,
    selectedServices,
    phoneNumber,
    services,
    timeSlots,
    enabledDates,
    alert,
    showAlert,
    hideAlert,
    formattedDate,
    showCalendar,
    setShowCalendar,
    setPhoneNumber,
    handleServiceChange,
    handleDateChanged,
    handleTimeSlotChange,
    bookApp,
  } = useBookAppointment();

  const commonProps = {
    borderColor: "var(--secondary)",
    focusColor: "var(--orange)",
    backgroundColor: "var(--background_cream)",
    textColor: "var(--secondary)",
    size: "lg"
  };

  const isFormComplete =
    selectedDate &&
    selectedTimeSlot &&
    selectedServices.length > 0 &&
    phoneNumber.trim() !== '';

    const handleBookApp = async () => {
      const result = await bookApp()
      if(!result.success){
        showAlert({
          title: "Prenotazione fallita",
          message: result.error || "Si è verificato un errore durante la prenotazione. Riprova più tardi.",
          error: true,
        });
      }else{
        showAlert({
          title: "Prenotazione confermata",
          message: "Il tuo appuntamento è stato prenotato con successo!",
          error: false,
        });
      }
    }

  return (
    <Container fluid className="py-5 px-4" style={{ backgroundColor: 'var(--background)' }}>
    <Row className="align-items-start">
      <Col xs={12} lg={4} className="mb-4">
        <h1 className="mb-3 text-start fw-bold fst-italic" style={{ color: 'var(--secondary)' }}>
          Riserva il tuo momento di bellezza
        </h1>
        <h3 className="mb-4 text-start" style={{ color: 'var(--secondary)' }}>
          Scegli i servizi, la data e rilassati: pensiamo noi al resto.
        </h3>
      </Col>
  
      <Col xs={12} lg={8}>
        {alert && (
          <Row className="mb-3">
            <Col xs={12}>
              {alert.error ? (
                <FailureAlert error={alert.message} title={alert.title} onClose={hideAlert} />
              ) : (
                <SuccessAlert content={{ heading: alert.title, message: alert.message }} onClose={hideAlert} />
              )}
            </Col>
          </Row>
        )}
  
        <Row className="g-3">
          <Col xs={12} md={6}>
            <MultiSelectDropdown
              {...commonProps}
              label="Servizi"
              placeholder="Seleziona servizio"
              options={services}
              onChange={handleServiceChange}
              value={selectedServices}
            />
          </Col>
          <Col xs={12} md={6}>
            <EditInputText
              {...commonProps}
              label="Numero di telefono"
              placeholder="(083) 632-5556"
              inputType="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Col>
  
          <Col xs={12} md={6}>
            <EditInputText
              {...commonProps}
              label="Data"
              placeholder="gg-mm-aaaa"
              inputType="text"
              readOnly
              value={formattedDate}
              onClick={() => setShowCalendar(prev => !prev)}
              showCustomComponent={showCalendar}
              customComponent={
                <EditCalendar
                  value={selectedDate || new Date()}
                  onChange={handleDateChanged}
                  enabledDates={enabledDates}
                />
              }
            />
          </Col>
  
          <Col xs={12} md={6}>
            <OptionsSelector
              {...commonProps}
              label="Orario"
              placeholder="Seleziona una fascia oraria"
              values={timeSlots}
              value={selectedTimeSlot}
              onSelect={handleTimeSlotChange}
            />
          </Col>
  
          <Col xs={12}>
            <NotificationToggle />
          </Col>
  
          <Col xs={12} md={6}>
            <Button
              size="lg"
              disabled={!isFormComplete}
              onClick={handleBookApp}
              className="w-100 no-focus"
              style={{
                backgroundColor: 'var(--orange)',
                borderColor: 'var(--orange)',
                outline: 'none',
                boxShadow: 'none'
              }}>
              PRENOTA
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  </Container>
  
  );
}

export default BookAppointment;
