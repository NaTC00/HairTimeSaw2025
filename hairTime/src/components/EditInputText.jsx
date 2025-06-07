/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Form } from "react-bootstrap";
function EditInputText({
    label,
    placeholder,
    borderColor,
    focusColor,
    backgroundColor,
    textColor,
    size,
    inputType = "text",
    isTextArea = false,
    value,
    onClick,
    onChange,
    readOnly = false,
    customComponent = null,
    showCustomComponent = false})
    {
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
                            color: textColor
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