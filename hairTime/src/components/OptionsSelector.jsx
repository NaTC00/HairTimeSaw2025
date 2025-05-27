import React, { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";

function OptionsSelector({
  label,
  placeholder,
  borderColor,
  focusColor,
  backgroundColor,
  textColor,
  size,
  values = [],
  onSelect,
  isMulti = false,
  onConfirmSelection,
  buttonLabel = null
}) {

  console.log(`values: ${values}`)
  const [isHovered, setIsHovered] = useState(false);
 
  const handleChange = (e) => {
    if(isMulti){
      const selected = Array.from(e.target.selectedOptions).map(
        (option) => option.value);
      onSelect(selected)
    }else{
      const selected = e.target.value;
      onSelect(selected)
    }
      
   
  }

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
          onChange={handleChange}
          multiple={isMulti}
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
        
        {buttonLabel!= null && onConfirmSelection && (
          <Button
            variant="outline-secondary"
            onClick={onConfirmSelection}
            id="button-addon2"
          >
            {buttonLabel}
          </Button>
        )}
      
      </InputGroup>

     
    </Form>
  );
}

export default OptionsSelector