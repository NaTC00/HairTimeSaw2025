import React from 'react';
import { Container, Row, Col, Image, Carousel } from 'react-bootstrap';

import './OverlayGeneralReviewStyle.css';
import ReviewCarousel from '../components/ReviewCarousel.jsx'
/*const reviews = [
    {
      text: "I could probably go into sales for you. Definitely worth the investment. We've used hair salon for the last five years.",
      name: "Jessica Zhang",
      role: "Customer",
    },
    {
      text: "Absolutely wonderful! We can't understand how we've been living without the hair salon. I am completely blown away.",
      name: "Leanna May",
      role: "Customer",
    },
   
];*/
  

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
            /*<div
                className="position-absolute top-50 start-50 translate-middle"
                style={{
                zIndex: 5,
                display: 'flex',
                justifyContent: 'space-between',
                width: '50%',
                transform: 'translate(-50%, -50%)',
                }}>
                <img src="/icons/quotation-mark.png" alt="Quotation Icon Left" style={{ width: '50px', backgroundColor: 'rgba(199, 178, 153, 0.5)'}} />
                <img src="/icons/quotation-mark.png" alt="Quotation Icon Right" style={{ width: '50px', backgroundColor: 'rgba(199, 178, 153, 0.5)' }} />
            </div>

             <div
                className="position-absolute top-50 start-50 translate-middle text-center text-white"
                style={{ zIndex: 10 }}
            >
                <Carousel>
                    {
                        reviews.map((review, index)=>
                        (
                            <Carousel.Item key={index}>
                                <div className="d-block w-100">
                                    <h1>{review.name}</h1>
                                    <p>{review.text}</p>
                                    <footer>{review.role}</footer>

                                </div>

                            </Carousel.Item>

                        ))
                    }
                </Carousel>
            </div>*/

      
    );
   
}
export default OverlayGeneralReview;