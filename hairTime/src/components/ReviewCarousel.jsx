import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Carousel } from 'react-bootstrap';
import './ReviewCarouselStyle.css';
import {getReviews} from '../httpManager/request'
import {useReviews} from '../hooks/useReviews'


function ReviewCarousel() {
  /*const [reviews, setReviews] = useState([])
  const [error, setError] = useState(false)
  const fetchReviews = async () => {
    try{
      const reviesList = await getReviews()
      setReviews(reviesList)
      setError(false)
    }catch(error){
      setError(true)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [])*/

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
   
  return (
    <Carousel>
      {reviews.map((review, index) => {
        if (index % 2 === 0) {
          return (
            <Carousel.Item key={index}>
              <Container>
                <Row className="justify-content-center align-items-center" >
                  <Col sm className="d-flex justify-content-center align-items-center"  style={{height: '30vh', width:'90vw' }}>
                    <div className="review-item text-center">
                      <blockquote>
                        <p>{review.comment}</p>
                      </blockquote>
                      <footer>
                        <cite>{review.username}</cite>
                        <div className="star-rating">{renderStars(review.rating)}</div>
                      </footer>
                    </div>
                  </Col>
                  {reviews[index + 1] && (
                    <Col sm className="d-flex justify-content-center align-items-center" style={{height: '30vh',  width:'90vw' }}>
                      <div className="review-item text-center">
                        <blockquote>
                          <p>{reviews[index + 1].comment}</p>
                        </blockquote>
                        <footer>
                          <cite>{reviews[index + 1].username}</cite>
                          <div className="star-rating">{renderStars(reviews[index + 1].rating)}</div>
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