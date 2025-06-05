import React from "react";
import { Row, Col, Figure, Card, Button } from "react-bootstrap";
import { getServiceIcon } from "../../utils/iconUtils";
import '../../styles/colors.css';
export default function AppointmentCard({ appointment, onDeleteAppointment }) {
  const dateObj = new Date(appointment.date);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const weekday = dateObj.toLocaleDateString("it-IT", { weekday: "short" }); // es. Gio

  const handleClick = () => {
    onDeleteAppointment(appointment.id); // Passa l'id all'handler
  };

  return (
    <Card className="shadow-sm" style={{ borderRadius: '12px' }}>
      <Row className="g-0">
       
        <Col xs={2} className="d-flex flex-column align-items-center justify-content-center bg-light border-end position-relative" style={{ borderRadius: '12px' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{day}</div>
          <div>{weekday}</div>
         
          {<div
            className="position-absolute start-0 top-0 h-100"
            style={{ width: '12px', backgroundColor: "var(--orange)", borderRadius: '12px 0 0 12px' }}
          ></div>}
        </Col>

        
        <Col className="p-3">
          <div className="d-flex flex-column">
            
            <div className="d-flex gap-3 flex-wrap text-start">
              {appointment.services.map((service, index) => (
                <Figure key={index} className="mb-0 text-center">
                  <Figure.Image
                    width={40}
                    height={40}
                    className="location-icon"
                    src={getServiceIcon(service)}
                    alt={service}
                  />
                  <Figure.Caption className="text-center text-uppercase fw-bold small">
                    {service}
                  </Figure.Caption>
                </Figure>
              ))}
            </div>

           
            <div className="text-muted text-start small mt-2">{appointment.time_slot}</div>
          </div>
        </Col>
        <Col className="p-3 d-flex flex-column justify-content-center align-items-end">
            <Button size="sm" onClick={handleClick}>Disdici</Button>
        </Col>

      </Row>
    </Card>
  );
}
