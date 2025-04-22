import React from 'react'
import { useState, useEffect } from 'react';
import './HomeStyle.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Fade from 'react-bootstrap/Fade';
import CarouselFadeExample from '../components/CarouselFadeExample.jsx'

export default function Home() {
   
  const [open, setOpen] = useState(false);

  // Attiva l'animazione quando il componente viene montato
  useEffect(() => {
    setOpen(true);  // Imposta `open` a true quando il componente viene caricato
  }, []);  // Il secondo argomento `[]` fa sì che l'effetto venga eseguito solo una volta, al montaggio

  return (


    <div className="box-container">
     
     <Container fluid className="d-flex align-items-center">
      <Row className="w-100">
        <Col className="d-flex align-items-center justify-content-center">
          <CarouselFadeExample />
        </Col>
        
        <Col className="d-flex align-items-center justify-content-center">
          <Fade in={open} timeout={10000} appear={true} mountOnEnter>
              <div className="txt-container text-center">
                <h1>BENVENUTO</h1>
                <h2>NEL NOSTRO SALONE</h2>
                <p>
                  HairTime è il tuo spazio di bellezza!<br />
                  Siamo qui per esaltare il tuo stile con tagli alla moda, colori vibranti e trattamenti su misura.<br />
                  Prenota il tuo appuntamento e vivi un’esperienza da vera star.
                </p>
              </div>
            </Fade>
         
        </Col>
      </Row>
    </Container>
    </div>
  
  );
}




