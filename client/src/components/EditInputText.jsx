/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Form } from "react-bootstrap";

// Componente riutilizzabile per un campo di input (testo o textarea)
function EditInputText({
    label, // Etichetta sopra l'input
    placeholder, // Testo di default
    borderColor, // Colore del bordo quando non in focus/hover
    focusColor, // Colore del bordo quando in hover
    backgroundColor,  // Colore di sfondo del campo
    textColor, // Colore del testo
    size, // Dimensione del campo
    inputType = "text", // Tipo di input
    isTextArea = false, // Se true, renderizza un <textarea> invece di un <input>
    value, // Valore dell'input
    onClick,  // Handler per click sull'input
    onChange, // Handler per modifiche del testo
    readOnly = false, // Se true, rende il campo non modificabile
    customComponent = null, // Un eventuale componente aggiuntivo da mostrare sotto l'input
    showCustomComponent = false}) // Se true, mostra `customComponent`
    {
        // Stato locale per sapere se il campo è in hover
        const [isHovered, setIsHovered] = useState(false);
    
       
        return(
            <Form.Group className="mb-3" style={{ position: "relative" }}>
                    <Form.Label style={{color: textColor, textTransform: "uppercase", fontFamily:'sans-serif', fontWeight: 'bold', fontSize: '12px'}}>{label}</Form.Label>
                    <Form.Control
                        type={inputType}
                        placeholder={placeholder}
                        size={size}
                        readOnly={readOnly}
                        value={value}
                        onClick={onClick}
                        onChange={onChange}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        as={isTextArea ? "textarea" : undefined}
                        style={{
                            fontSize: '12px',
                            border: `2px solid ${isHovered ? focusColor : borderColor}`,
                            backgroundColor,
                            color: textColor,
                            ...(isTextArea ? { maxWidth: '400px' } : {})
        
                        }}
                    />
                    {showCustomComponent && customComponent && (
                       <div
                            style={{
                            position: "absolute",
                            zIndex: 1000,
                            width: "100%", 
                            maxWidth: '100%' 
                            }}
                        >
                            {customComponent}
                        </div>
                    )}
                </Form.Group>

             
        );
  }

  export default EditInputText;