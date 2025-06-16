import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import CarouselImage from './CarouselImage'; // Importa il componente per le immagini
import './CarouselStyle.css'

function CarouselFadeExample() {
  return (
    <Carousel fade style={{ width: '500px', height: '500px' }}>
    <Carousel.Item>
      <CarouselImage text="salon" />
      <Carousel.Caption>
        <h3>Il nostro salone</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <CarouselImage text="hair_styling" />
      <Carousel.Caption>
        <h3>La nostra piega da star</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <CarouselImage text="cut_hair" />
      <Carousel.Caption>
        <h3>Il nostro taglio</h3>
        <p>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur.
        </p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <CarouselImage text="sinks" />
      <Carousel.Caption>
        <h3>Il nostro angolo relax</h3>
        <p>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur.
        </p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <CarouselImage text="maches" />
      <Carousel.Caption>
        <h3>Le nostre schiariture</h3>
        <p>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur.
        </p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <CarouselImage text="hair_washing" />
      <Carousel.Caption>
        <h3>Lavaggio</h3>
        <p>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur.
        </p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  );
}

export default CarouselFadeExample;
