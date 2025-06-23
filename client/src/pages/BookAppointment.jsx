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
    <Container fluid className="py-5" style={{ backgroundColor: 'var(--background)' }}>
      <Row className="align-items-center ms-5">
        <Col xs={12} lg={4} className="d-flex flex-column justify-content-start text-start mb-4 mb-lg-0">
          <h1 className="mb-3"  style={{ fontWeight: 'bold', fontStyle: 'italic', color: 'var(--secondary)'}}>Riserva il tuo momento di bellezza</h1>
          <h3 className="mb-4"  style={{  color: 'var(--secondary)'}}>Scegli i servizi, la data e rilassati: pensiamo noi al resto.</h3>
        </Col>

        <Col xs={12} lg={8} className="d-flex flex-column justify-content-center">
          <Row className="mb-3">
            <Col xs={12} md={6}>
            {alert && (
              alert.error ? (
                <FailureAlert error={alert.message} title={alert.title} onClose={hideAlert} />
              ) : (
                <SuccessAlert content={{ heading: alert.title, message: alert.message }} onClose={hideAlert} />
              )
            )}
            </Col>
          </Row>

          <Row className="mb-3  ms-5">
            <Col xs={12} md={4}>
              <MultiSelectDropdown
                {...commonProps}
                label="Servizi"
                placeholder="Seleziona servizio"
                options={services}
                onChange={handleServiceChange}
                value={selectedServices}
              />
            </Col>
            <Col xs={12} md={4}>
              <EditInputText
                {...commonProps}
                label="Numero di telefono"
                placeholder="(083) 632-5556"
                inputType="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Col>
          </Row>

          <Row className="mb-3 ms-5">
            <Col xs={12} md={4}>
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
            <Col xs={12} md={4}>
              <OptionsSelector
                {...commonProps}
                label="Orario"
                placeholder="Seleziona una fascia oraria"
                values={timeSlots}
                value={selectedTimeSlot}
                onSelect={handleTimeSlotChange}
              />
            </Col>
          </Row>

          <NotificationToggle  />

          <Row className="mb-3 ms-5">
            <Col xs={12} md={4}>
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
