import React from 'react';
import { Container, Row, Col, Image, Carousel } from 'react-bootstrap';
import ReviewCarousel from '../components/ReviewCarousel.jsx'
import '../styles/colors.css';
  

function OverlayGeneralReview(){
    return(
            <Container fluid className="py-5" style={{ backgroundColor: 'var(--background_cream)' }}>
                <h2 className="text-center">Cosa dicono di noi</h2>
                <Row className="justify-content-center align-items-center" >
                    <Col sm={6} className="d-flex justify-content-center">
                        <Image src="/images/quotation-mark.png" fluid style={{ width: '15%', height: 'auto'}} />
                    </Col>
                    <Col sm={6} className="d-flex justify-content-center"> 
                        <Image src="/images/quotation-mark.png" fluid style={{ width: '15%', height: 'auto'}} />
                    </Col>
                </Row>
                <Row className="mt-4 justify-content-center align-items-center">
                    <Col  className="d-flex justify-content-center">
                        <ReviewCarousel />
                    </Col>
                </Row>
            </Container>
            

      
    );
   
}
export default OverlayGeneralReview;