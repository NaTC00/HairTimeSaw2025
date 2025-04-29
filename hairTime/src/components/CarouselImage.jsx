import React from 'react';

import {Image, Container} from 'react-bootstrap';

const images = {
  "salon": "/images/salonHT.JPG",
  "hair_styling": "/images/hair_stylingHT.JPG",
  "cut_hair": "/images/hair_cutHT.JPG",
  "sinks": "/images/sinksHT.JPG",
  "maches": "/images/machesHT.JPG",
  "hair_washing": "/images/hair_washingHT.JPG",
  
};

const CarouselImage = ({ text }) => {
 
  const imagePath = images[text];

  return (

    
    <Image 
      fluid
      src={imagePath} 
      style={{ objectFit: 'cover',  width: '500px', height: '500px'}}
    />

  );
};

export default CarouselImage;

