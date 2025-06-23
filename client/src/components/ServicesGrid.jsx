// ServicesGrid.jsx
import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { useServices } from "../hooks/useServices";
const serviceImages = {
  "Taglio": "/images/hair_cutHT.JPG",
  "Piega": "/images/hair_stylingHT.JPG",
  "Colore": "/images/hair_coloring.JPG",
  "Schiariture": "/images/hair_clearings.JPG",
  "Tonalizzante": "/images/hair_toner.JPG",
  "Maschera": "/images/hair_mask.JPG" 
};

const serviceDescriptions = {
  "Taglio": "Rinnova il tuo look con un taglio su misura che valorizza i tuoi lineamenti.",
  "Piega": "Una piega impeccabile per ogni occasione: elegante, naturale o audace.",
  "Colore": "Dai luce e personalità ai tuoi capelli con un colore vibrante e su misura.",
  "Tonalizzante": "Esalta i riflessi e correggi i toni indesiderati per un colore sempre luminoso e naturale.",
  "Schiariture": "Tecniche di schiaritura moderne per un effetto luce naturale, sfumato e personalizzato. Illumina il tuo look con eleganza e stile.",
  "Maschera": "Un trattamento intensivo che nutre in profondità, lasciando i capelli morbidi e visibilmente più sani."
};



export function ServicesGrid() {

     const {
        services,
        isLoading: isServicesLoading,
        error: servicesError,
        refetch: refetchServices,
      } = useServices();

      if (isServicesLoading) {
        return (
          <div className="text-center my-5">
            <Spinner animation="border" role="status" />
            <span className="visually-hidden">Caricamento servizi...</span>
          </div>
        );
      }
    
      if (servicesError) {
        return (
          <div className="text-center my-5">
            <p>Errore nel caricamento dei servizi</p>
            <Button variant="primary" onClick={refetchServices}>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              &nbsp;Riprova
            </Button>
          </div>
        );
      }
      
  return (
  
    <Container className="my-5">
      <h1 className="mb-5 text-center" style={{ fontWeight: 'bold', fontStyle: 'italic', color: 'var(--secondary)'}}>Servizi offerti</h1>
      <Row>
        {services.map((svc, i) => (
          <Col
            key={i}
            md={4}
            className="d-flex align-items-stretch mb-5"
            data-aos="fade-up"
            data-aos-delay={i * 100}
          >
            <Card className="border-0 shadow-sm h-100 overflow-visible position-relative">
              <Card.Img
                variant="top"
                src={serviceImages[svc.name]}
                style={{ height: '400px', objectFit: 'cover' }}
              />
              <Card.Body
                className="bg-white rounded mx-3 p-4 position-relative"
                style={{ marginTop: '-60px', zIndex: 1 }}
              >
                <Card.Title>{svc.name}</Card.Title>
                <Card.Text>
                <span style={{ fontStyle: 'italic' }}>
                  {serviceDescriptions[svc.name]}
                </span><br></br>
                <span style={{ fontWeight: 'bold' }}>Prezzo: €{svc.cost}</span>
                </Card.Text>

               
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
