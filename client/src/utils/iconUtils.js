export function getServiceIcon(serviceName) {
    const icons = {
      "Schiariture": "/icons/lightening.png",
      "Taglio": "/icons/hair-cut.png",
      "Piega": "/icons/curling-hair.png",
      "Colore": "/icons/hair-color.png",
      "Tonalizzante": "/icons/toner.png",
      "Maschera": "/icons/hair-mask.png",
    };
  
   
    return icons[serviceName];
  }
  