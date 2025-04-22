import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from './ExampleCarouselImage'; // Importa il componente per le immagini
import './CarouselStyle.css'

function CarouselFadeExample() {
  return (
    <Carousel fade style={{ width: '60%', margin: 'auto' }}>
      <Carousel.Item>
        <ExampleCarouselImage text="Il nostro salone" interval={500} className="carousel-image-container"/>
        <Carousel.Caption>
          <h3>Il nostro salone</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage text="La nostra piega da star"  interval={500} className="carousel-image-container"/>
        <Carousel.Caption>
          <h3>La nostra piega da star</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage text="Il nostro taglio"  interval={500} className="carousel-image-container"/>
        <Carousel.Caption>
          <h3>Il taglio perfetto</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage text="Il nostro angolo relax"  interval={500} className="carousel-image-container"/>
        <Carousel.Caption>
          <h3>Il nostro angolo relax</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage text="Le nostre schiariture"  interval={500} className="carousel-image-container"/>
        <Carousel.Caption>
          <h3>Le nostre schiariture</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage text="Lavaggio"  interval={500} className="carousel-image-container"/>
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
