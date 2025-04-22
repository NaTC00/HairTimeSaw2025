import React from 'react'
import './HomeStyle.css';
import {Container, Row, Col} from 'react-bootstrap';
import CarouselFadeExample from '../components/CarouselFadeExample.jsx';

import OverlayGeneralReview from '../components/OverlayGeneralReview.jsx'
export default function Home() {
   
  return (

    <>
      <Container>
        <Row className='px-4 my-5'>
          <Col sm={7} className="d-flex align-items-center justify-content-center">

          <CarouselFadeExample />
          
          </Col>
          <Col sm={5} className='txt-container'>
            <h1>BENVENUTO</h1>
            <h2>NEL NOSTRO SALONE</h2>
            <p className='font-weight-light mt-4'>
              HairTime è il tuo spazio di bellezza!<br />
              Siamo qui per esaltare il tuo stile con tagli alla moda, colori vibranti e trattamenti su misura.<br />
              Prenota il tuo appuntamento e vivi un’esperienza da vera star.
            </p>
          </Col>
        </Row>
        <Row>
          <OverlayGeneralReview/>
        </Row>
       
      </Container>
    </>
    


    /*<div className="box-container">
     
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
    </div>*/
  
  );
}




