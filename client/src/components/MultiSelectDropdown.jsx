import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import CloseButton from 'react-bootstrap/CloseButton';

function MultiSelectDropdown({
  label,
  placeholder,
  borderColor,
  focusColor,
  backgroundColor,
  textColor,
  size,
  options,
  onChange,
  value
}) {
  const [selected, setSelected] = useState(value);

  useEffect(() => {
    setSelected(value || []);
  }, [value]);

  

  const toggleItem = (itemId) => {
    const item = options.find((opt) => opt.id === itemId);
    if (!item) return;

    const exists = selected.some((i) => i.id === itemId);
    const newSelected = exists
      ? selected.filter((i) => i.id !== itemId)
      : [...selected, item];

    setSelected(newSelected);
    if (onChange) {
      onChange(newSelected);
    }
  };

  const removeItem = (item) => {
    const updated = selected.filter((i) => i.id !== item.id);
    setSelected(updated);
    if (onChange) {
      onChange(updated);
    }
  };

   const [isHovered, setIsHovered] = useState(false);

  return (
    <Form.Group className="mb-3" style={{ position: 'relative' }}>
      <Form.Label
        style={{
          color: textColor,
          textTransform: 'uppercase',
          fontFamily: 'sans-serif',
          fontWeight: 'bold',
          fontSize: '12px'
        }}
      >
        {label}
      </Form.Label>

      <Dropdown autoClose={false}  onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}>
        <Dropdown.Toggle
          
          variant="outline-primary"
          className="w-100 text-start d-flex align-items-center justify-between dropdown-toggle no-caret"
          style={{
            minHeight: '38px',
            border: `2px solid ${isHovered ? focusColor : borderColor}`,
            backgroundColor: backgroundColor,
            color: textColor,
            fontSize: '12px',
            padding: '0.375rem 0.75rem'
          }}
        >
          <style>{`.dropdown-toggle::after { display: none !important; }`}</style>

          <div
            className="d-flex flex-wrap gap-1 flex-grow-1"
            style={{
            
              overflow: 'hidden',
              alignItems: 'center'
            }}
          >
            {selected.length === 0 ? (
              <span style={{ color: borderColor, fontSize: '12px' }}>
                {placeholder}
              </span>
            ) : (
              selected.map((item) => (
                <span
                  key={item.id}
                  className="d-flex align-items-center"
                  style={{
                    backgroundColor: focusColor,
                    color: 'white',
                    padding: '0.4em',
                    borderRadius: '0.5em',
                    fontSize: '12px'
                  }}
                >
                  {item.name}
                  <CloseButton
                    className="ms-2"
                    variant="white"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItem(item);
                    }}
                  />
                </span>
              ))
            )}
          </div>

          <i className="bi bi-chevron-down ms-2" />
        </Dropdown.Toggle>

        <Dropdown.Menu
          className="w-100 p-2"
          style={{
          
            overflowY: 'auto',
            fontSize: '12px',
            color: textColor
          }}
        >
          {options.map((item) => {
            const isSelected = selected.some((i) => i.id === item.id);
            return (
              <Dropdown.Item
                key={item.id}
                as="button"
                onClick={() => toggleItem(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: isSelected ? '600' : 'normal'
                }}
              >
                <Form.Check
                  type="checkbox"
                  className="me-2"
                  checked={isSelected}
                  onChange={() => {}}
                  readOnly
                />
                {item.name}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </Form.Group>
  );
}

export default MultiSelectDropdown;
