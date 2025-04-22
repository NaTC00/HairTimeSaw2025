import React from 'react';

import {Image, Container} from 'react-bootstrap';


// Mappa il nome della slide al percorso dell'immagine
const images = {
  "salon": "/images/salonHT.JPG",
  "hair_styling": "/images/hair_stylingHT.JPG",
  "cut_hair": "/images/hair_cutHT.JPG",
  "sinks": "/images/sinksHT.JPG",
  "maches": "/images/machesHT.JPG",
  "hair_washing": "/images/hair_washingHT.JPG",
  
};

const ExampleCarouselImage = ({ text }) => {
  // Ottieni il percorso dell'immagine in base al testo passato come prop
  const imagePath = images[text];

  return (

    
    <Image 
      fluid
      src={imagePath} // Usa solo il percorso dell'immagine senza '/500x500'
      style={{ objectFit: 'cover',  width: '500px', height: '500px'}}
    />

  );
};

export default ExampleCarouselImage;

