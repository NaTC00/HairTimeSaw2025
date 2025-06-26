import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Carousel } from 'react-bootstrap';
import {useReviews} from '../hooks/useReviews'
import "../styles/colors.css"


function ReviewCarousel() {

  const{
    reviews,
    refetchReviews,
    error: reviewError

  } = useReviews({})

  const renderStars = (rating) => {
    const starsArray = [];
    for (let i = 0; i < 5; i++) {
      starsArray.push(
        <Image
          key={i}
          src={i < rating ? "/icons/star-filled.png" : "/icons/star-empty.png"}
          alt="star"
          className="star"
        />
      );
    }
    return starsArray;
  };

  if (!reviews || reviews.length === 0) {
    return (
      <Container className="py-5 text-center">
        <h5 className="text-muted">Sii il primo a lasciare una recensione!</h5>
      </Container>
    );
  }
   
  return (
    <Carousel>
      {reviews.map((review, index) => {
        if (index % 2 === 0) {
          return (
            <Carousel.Item key={index}>
              <Container>
                <Row className="justify-content-center align-items-center" >
                  <Col sm className="d-flex justify-content-center align-items-center"  style={{height: '30vh', width:'90vw' }}>
                    <div className="text-center" style={{ textAlign: 'center', padding: '20px' }}>
                      <blockquote style={{ fontStyle: 'italic' }}>
                        <p>{review.comment}</p>
                      </blockquote>
                      <footer>
                        <cite style={{ fontWeight: 'bold', color: 'var(--orange)' }}>{review.username}</cite>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '10px',
                          }}>{renderStars(review.rating)}</div>
                      </footer>
                    </div>
                  </Col>
                  {reviews[index + 1] && (
                    <Col sm className="d-flex justify-content-center align-items-center" style={{height: '30vh',  width:'90vw' }}>
                      <div className="text-center" style={{ textAlign: 'center', padding: '20px' }}>
                        <blockquote style={{ fontStyle: 'italic' }}>
                          <p>{reviews[index + 1].comment}</p>
                        </blockquote>
                        <footer>
                          <cite style={{ fontWeight: 'bold', color: 'var(--orange)' }}>{reviews[index + 1].username}</cite>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '10px',
                          }}>{renderStars(reviews[index + 1].rating)}</div>
                        </footer>
                      </div>
                    </Col>
                  )}
                </Row>
              </Container>
            </Carousel.Item>
          );
        }
      })}
    </Carousel>
  );
}

export default ReviewCarousel;