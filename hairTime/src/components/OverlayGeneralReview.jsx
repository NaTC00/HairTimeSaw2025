import React from 'react';
import { Container, Row, Col, Image, Carousel } from 'react-bootstrap';

import './OverlayGeneralReviewStyle.css';
import ReviewCarousel from '../components/ReviewCarousel.jsx'

  

function OverlayGeneralReview(){
    return(
            <Container fluid className="background-container">
                <h2 className="text-center">Cosa dicono di noi</h2>
                <Row className="justify-content-center align-items-center" >
                    <Col sm={6} className="d-flex justify-content-center">
                        <Image src="/images/quotation-mark.png" fluid className="image-left" />
                    </Col>
                    <Col sm={6} className="d-flex justify-content-center"> 
                        <Image src="/images/quotation-mark.png" fluid className="image-right" />
                    </Col>
                </Row>
                <Row className="carousel-row justify-content-center align-items-center">
                    <Col  className="d-flex justify-content-center">
                        <ReviewCarousel />
                    </Col>
                </Row>
            </Container>
            

      
    );
   
}
export default OverlayGeneralReview;