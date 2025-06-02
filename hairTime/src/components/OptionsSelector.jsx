import React, { useState, useEffect } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";

function OptionsSelector({
  label,
  placeholder,
  borderColor,
  focusColor,
  backgroundColor,
  textColor,
  size,
  values,
  onSelect
}) {

   const [selected, setSelected] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

   useEffect(() => {
    if (values.length > 0) {
      setSelected(values[0]);
      onSelect(values[0]);
    }
  }, [values]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelected(value);
    onSelect(value);
  };
 


  return (
    <Form>
      <Form.Label
        style={{
          color: textColor,
          textTransform: "uppercase",
          fontFamily: "sans-serif",
          fontWeight: "bold",
          fontSize: "12px"
        }}
      >
        {label}
      </Form.Label>

      <InputGroup className="mb-3">
        <Form.Select
          value={selected || ''}
          onChange={handleChange}
          placeholder={placeholder}
          size={size}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            fontSize: "12px",
            border: `2px solid ${isHovered ? focusColor : borderColor}`,
            backgroundColor,
            color: textColor
          }}
        >
         
          {values.map((value, i) => (
            <option key={i} value={value}>
              {value}
            </option>
          ))}
        </Form.Select>
       
      </InputGroup>

     
    </Form>
  );
}

export default OptionsSelector