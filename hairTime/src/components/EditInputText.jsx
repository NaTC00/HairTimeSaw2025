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
    onSubmit,
    inputType,
    showDropdown,
    dropdownOptions})
    {
        const [isHovered, setIsHovered] = useState(false);
        const handleSubmit = (e) => {
        e.preventDefault();
            if (onSubmit) onSubmit(e);
        };
        return(
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label style={{color: textColor, textTransform: "uppercase", fontFamily:'sans-serif', fontWeight: 'bold', fontSize: '12px'}}>{label}</Form.Label>
                    <Form.Control
                        type={inputType}
                        placeholder={placeholder}
                        size={size}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        style={{
                            fontSize: '12px',
                            border: `2px solid ${isHovered ? focusColor : borderColor}`,
                            backgroundColor,
                            color: textColor
                        }}
                    />
                </Form.Group>
            </Form>

             
        );
  }

  export default EditInputText;