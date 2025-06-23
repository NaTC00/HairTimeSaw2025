import React, { useState } from "react";
import {Row, Col, Container, Image,Button, Stack, Form } from "react-bootstrap";
import EditInputText from "components/EditInputText";
import '../../styles/colors.css';

export default function SubmitReviews({onSubmitReview}){

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState(null) 
    const commonProps = {
        borderColor: "var(--secondary)",
        focusColor: "var(--orange)",
        backgroundColor: "var(--background_cream)",
        textColor: "var(--secondary)",
        size: "lg",
        isTextArea: true
        };

    const handleSubmitClick = () => {
        onSubmitReview(rating, comment);
    };
    const handleStarClick = (index) => {
        if (rating === index + 1) {
          setRating(index);
        } else {
          setRating(index + 1);
        }
      };
    return(
        <Container fluid>
            <h1 style={{ fontWeight: 'bold', fontStyle: 'italic', color: 'var(--secondary)'}}>
                Condividi la tua esperienza
            </h1>
           <Row>
           <Col  >
                <Form.Label style={{color: "var(--secondary)", textTransform: "uppercase", fontFamily:'sans-serif', fontWeight: 'bold', fontSize: '12px'}}>Punteggio</Form.Label>
                <Stack direction="horizontal" gap={3}>
                    {[...Array(5)].map((_, i) => (
                        <Image
                        key={i}
                        src={i < rating ? "/icons/star-filled.png" : "/icons/star-empty.png"}
                        alt="star"
                        className="star"
                        onClick={() => handleStarClick(i)}
                        style={{ cursor: 'pointer', marginRight: '4px' }}
                        />
                    ))}
                        
                </Stack>
               
                
                <EditInputText label="Commento" {...commonProps}  value={comment} onChange={(e) => setComment(e.target.value)}></EditInputText>

            </Col>
            <Col  style={{backgroundColor: 'blu'}}>
            <p>Raccontaci la tua esperienza nel salone! Hai fatto un taglio, colore o altro?<br />
                Il tuo feedback può aiutare altri a scegliere con più sicurezza.</p>
            <Button  onClick={handleSubmitClick}>Invia recensione</Button>
            </Col>

           </Row>
        </Container>

    )

}