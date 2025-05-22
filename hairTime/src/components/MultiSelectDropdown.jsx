import React, { useState } from 'react';
import { Dropdown, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function MultiSelectDropdown ({
    label,
    placeholder,
    borderColor,
    focusColor,
    backgroundColor,
    textColor,
    size,
    options,
    onChange,
    value,
    buttonLabel,
    onConfirmSelection
}){
    const [isHovered, setIsHovered] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState(value || []);

    const handleToggle = (option) => {
        const newSelected = selectedOptions.includes(option)
            ? selectedOptions.filter(o => o !== option)
            : [...selectedOptions, option];

        setSelectedOptions(newSelected);

       
        if (onChange) {
            onChange(newSelected);
        }
    };
   


  return (
    <Form>
      <Form.Label
        style={{
          color: textColor,
          textTransform: 'uppercase',
          fontFamily: 'sans-serif',
          fontWeight: 'bold',
          fontSize: '12px',
          marginBottom: '0.5rem'
        }}
      >
        {label}
      </Form.Label>

      <Dropdown
        style={{ width: '100%' }}
        >
  <Dropdown.Toggle
    size={size}
   
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    style={{
      width: '100%',
      fontSize: '12px',
      border: `2px solid ${isHovered ? focusColor : borderColor}`,
      backgroundColor,
      color: textColor,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      textAlign: 'left',
      padding: '0.375rem 0.75rem'
    }}
  >
    <span>{placeholder}</span>
  </Dropdown.Toggle>

  <Dropdown.Menu  style={{ display: 'flex', flexDirection: 'column', minWidth: '200px' }}>
    {options.map((option) => (
      <div key={option} className="dropdown-item px-3 py-1">
        <Form.Check type="checkbox">
          <Form.Check.Input
            type="checkbox"
            checked={selectedOptions.includes(option)}
            onChange={() => handleToggle(option)}
          />
          <Form.Check.Label>{option}</Form.Check.Label>
        </Form.Check>
      </div>
    ))}

    {buttonLabel && onConfirmSelection && (
      <Button
        variant="outline-secondary"
        onClick={() => {
            onConfirmSelection(selectedOptions)
           
        }}
        style={{
          alignSelf: 'center',
          padding: '0.25rem 0.75rem',
          fontSize: '12px',
          width: 'auto',
          background: focusColor,
          color: 'white'
        }}
      >
        {buttonLabel}
      </Button>
    )}
    </Dropdown.Menu>
    </Dropdown>
        
    </Form>
  );
};

export default MultiSelectDropdown;
