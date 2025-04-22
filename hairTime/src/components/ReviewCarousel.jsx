import React from 'react';
import { Container, Row, Col, Image, Carousel } from 'react-bootstrap';
import './ReviewCarouselStyle.css';

import Review from '../models/Review';

export default function ReviewCarousel() {
    const reviews = [
        new Review(
          "Probabilmente potrei lavorare nel reparto vendite per te. Ne è valsa decisamente la pena. Utilizziamo il salone da cinque anni.",
          "Jessica Zhang",
          4
        ),
        new Review(
          "Assolutamente fantastico! Non riusciamo a capire come abbiamo vissuto senza questo salone. Sono completamente sbalordita.",
          "Leanna May",
          5
        ),
        new Review(
          "Servizio eccellente e personale cordiale. Lo consiglio sicuramente a tutti!",
          "Giovanni Rossi",
          3
        ),
        new Review(
          "Un’esperienza veramente straordinaria! Ora sono una cliente fedele.",
          "Sara Bianchi",
          5
        ),
      ];
  return (
    <Carousel>
      {reviews.map((review, index) => {
        if (index % 2 === 0) {
          return (
            <Carousel.Item key={index}>
              <Container>
                <Row>
                  <Col>
                    <div className="review-item">
                      <blockquote>
                        <p>{review.text}</p>
                      </blockquote>
                      <footer>
                        <cite>{review.user}, Customer</cite>
                        <div className="star-rating">{review.renderStars()}</div>
                      </footer>
                    </div>
                  </Col>
                  {reviews[index + 1] && (
                    <Col>
                      <div className="review-item">
                        <blockquote>
                          <p>{reviews[index + 1].text}</p>
                        </blockquote>
                        <footer>
                          <cite>{reviews[index + 1].user}, Customer</cite>
                          <div className="star-rating">{reviews[index + 1].renderStars()}</div>
                        </footer>
                      </div>
                    </Col>
                  )}
                </Row>
              </Container>
            </Carousel.Item>
          );
        }
        return null;
      })}
    </Carousel>
  );
}

