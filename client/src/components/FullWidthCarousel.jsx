import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './FullWidthCarousel.css'; 

const images = [
    {
      key: 'team',
      src: '/images/team.jpg',
      title: 'Benvenuta da HairTime',
      desc: 'Professionalità, eleganza e un sorriso pronto ad accoglierti.',
    },
    {
        key: 'cut_hair',
        src: '/images/women_studio.jpg',
        title: 'Capelli che parlano di te',
        desc: 'Eleganza, volume e lucentezza per una chioma che conquista al primo sguardo.',
      },      
    {
      key: 'salon',
      src: '/images/salon.jpg',
      title: 'Il nostro salone',
      desc: 'Design raffinato e comfort per un’esperienza di puro relax.',
    },
    {
      key: 'hair_styling',
      src: '/images/styling.jpg',
      title: 'Piega da star',
      desc: 'Esci dal salone pronta a brillare, con stile e sicurezza.',
    },
    {
      key: 'sinks',
      src: '/images/wash.jpg',
      title: 'Angolo relax',
      desc: 'Un momento solo per te: coccole, benessere e bellezza.',
    },
  ];
  

export default function FullWidthCarousel() {
  return (
    <div className="carousel-wrapper">
      <Carousel fade controls indicators>
        {images.map((item, i) => (
          <Carousel.Item key={item.key}>
            <img
              className="d-block w-100 carousel-img"
              src={item.src}
              alt={item.title}
            />
            <Carousel.Caption>
              <h3 className="fw-bold fs-2 fs-md-1">{item.title}</h3>
              <p className="fw-semibold fs-5 fs-md-4 text-white">{item.desc}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
