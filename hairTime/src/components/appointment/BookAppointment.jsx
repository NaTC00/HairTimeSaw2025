import '../../styles/colors.css';
import EditInputText from "../EditInputText";
import React from "react";
import { Col, Row, Container } from "react-bootstrap";

function BookAppointment() {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert('Form inviato!');
  };

  const commonProps = {
    borderColor: "var(--secondary)",
    focusColor: "var(--orange)",
    backgroundColor: "var(--background_cream)",
    textColor: "var(--secondary)",
    size: "lg",
    onSubmit: handleFormSubmit,
  };

  return (
    <Container fluid className="py-5">
      <Row className="align-items-start">
        {/* Colonna sinistra - Testo */}
        <Col lg={4} className="mb-4">
          <h1 className="mb-3">Prenota un appuntamento online</h1>
          <p className="mb-4">
            Compila i campi per prenotare il tuo servizio.
          </p>
        </Col>

        {/* Colonna destra - Form */}
        <Col lg={8}>
          <Row className="mb-3">
            <Col md={4}>
              <EditInputText {...commonProps} label="Nome" placeholder="Es. Mario" inputType="text" />
            </Col>
            <Col md={4}>
              <EditInputText {...commonProps} label="Email" placeholder="esempio@email.com" inputType="email" />
            </Col>
            <Col md={4}>
              <EditInputText {...commonProps} label="Numero di telefono" placeholder="(083) 632-5556" inputType="tel" />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <EditInputText
                {...commonProps}
                label="Servizio"
                placeholder="Seleziona servizio"
                inputType="text"
                showDropdown={true}
                dropdownLabel="Servizio"
                dropdownOptions={[
                  { label: "Taglio", value: "taglio" },
                  { label: "Barba", value: "barba" },
                  { label: "Colorazione", value: "colorazione" },
                ]}
              />
            </Col>
            <Col md={4}>
              <EditInputText {...commonProps} label="Data" placeholder="gg/mm/aaaa" inputType="date" />
            </Col>
            <Col md={4}>
              <EditInputText {...commonProps} label="Orario" placeholder="--:--" inputType="time" />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default BookAppointment;
