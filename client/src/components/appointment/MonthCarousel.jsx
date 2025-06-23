import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import '../../styles/colors.css';
const months = [
  "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
  "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
];

function MonthCarousel({ selectedMonth, onSelectMonth }) {
  return (
    <Carousel
      activeIndex={selectedMonth}
      onSelect={onSelectMonth}
      indicators={false}
      controls={true}
      interval={null}
      variant="dark"
    >
      {months.map((month, index) => (
        <Carousel.Item key={index}>
          <div className="d-flex justify-content-center align-items-center" style={{ height: 100 }}>
            <h3 style={{ fontWeight: 'bold', fontStyle: 'italic', color: 'var(--secondary)'}}>{month}</h3>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default MonthCarousel;
