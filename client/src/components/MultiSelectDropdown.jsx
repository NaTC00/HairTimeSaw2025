import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

// Componente personalizzato per selezione multipla
function MultiSelectDropdown({
  label, // Etichetta sopra l'input
  placeholder, // Testo di default
  borderColor,
  focusColor,
  backgroundColor,
  textColor,
  options, // Array di opzioni selezionabili
  onChange,
  value
}) {
  const [selected, setSelected] = useState(value);  // Stato locale della selezione

  useEffect(() => {
    setSelected(value || []);
  }, [value]);

  
  // Aggiunge o rimuove un'opzione alla selezione
  const toggleItem = (itemId) => {
    const item = options.find((opt) => opt.id === itemId);
    if (!item) return;

    // Controlla se l'elemento con id itemId è già stato selezionato
    const exists = selected.some((i) => i.id === itemId);
    // Se è già presente, lo rimuove dalla selezione (deseleziona)
    // Altrimenti lo aggiunge alla selezione
    const newSelected = exists
      ? selected.filter((i) => i.id !== itemId)
      : [...selected, item];

    setSelected(newSelected);
    if (onChange) {
      onChange(newSelected);
    }
  };

  // Rimuove un elemento dalla selezione tramite x
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
                 
                  <span
                    className="ms-2"
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItem(item);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.stopPropagation();
                        removeItem(item);
                      }
                    }}
                    style={{
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      paddingLeft: '4px',
                      color: 'white'
                    }}
                  >
                    ×
                  </span>
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
