import React from 'react';

import Image from 'react-bootstrap/Image';


// Mappa il nome della slide al percorso dell'immagine
const images = {
  "Il nostro salone": "/images/salon.JPG",
  "La nostra piega da star": "/images/hair_styling.JPG",
  "Il nostro taglio": "/images/cut_hair.JPG",
  "Il nostro angolo relax": "/images/sinks.JPG",
  "Le nostre schiariture": "/images/maches.JPG",
  "Lavaggio": "/images/hair_washing.JPG",
  
};

const ExampleCarouselImage = ({ text }) => {
  // Ottieni il percorso dell'immagine in base al testo passato come prop
  const imagePath = images[text];

  return (
    <Image 
      src={imagePath} // Usa solo il percorso dell'immagine senza '/500x500'
      width={512}  // Imposta la larghezza
      height={512}  // Imposta l'altezza
      style={{ objectFit: 'cover' }}
    />

   /* <img
      className="d-block w-100"
      src={imagePath} 
      alt={text}
    />*/
  );
};

export default ExampleCarouselImage;

