import React, { useState } from "react";
import { Form } from "react-bootstrap";

function TimeSlotSelector({
  label,
  placeholder,
  borderColor,
  focusColor,
  backgroundColor,
  textColor,
  size,
  values = [],
  onSelect
}) {
  const [isHovered, setIsHovered] = useState(false);

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

      <Form.Select
        onChange={(e) => onSelect(e.target.value)}
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
        <option value="">{placeholder}</option>
        {values.map((value, i) => (
          <option key={i} value={value}>
            {value}
          </option>
        ))}
      </Form.Select>
    </Form>
  );
}

export default TimeSlotSelector