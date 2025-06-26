import React from 'react'
import './HomeStyle.css';
import {Container, Row, Col} from 'react-bootstrap';
import { ServicesGrid } from '../components/ServicesGrid';
import OverlayGeneralReview from '../components/OverlayGeneralReview.jsx'
import FullWidthCarousel from '../components/FullWidthCarousel'
export default function Home() {
   
  return (

    <>
    <FullWidthCarousel />
    
      <Container fluid style={{ backgroundColor: 'var(--background)' }}>
  

        <Row>
        <ServicesGrid/>
        </Row>
      
        <Row>
          <OverlayGeneralReview/>
        </Row>
       
       
      </Container>
    </>
  
  
  );
}




