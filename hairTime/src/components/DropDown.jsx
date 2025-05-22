//App.js

import React, { useState } from 'react';
import { Dropdown, Form } from 'react-bootstrap';

const DropDown = () => {
    const [selected_languages, set_Selected_languages] = 
        useState([]);
    const languages = 
        ['C++', 'Java', 'ReactJS', 'Spring Boot'];
    const toggleLang = (option) => {
        if (selected_languages.includes(option)) {
            set_Selected_languages(
                selected_languages.filter((item) => 
                    item !== option));
        } else {
            set_Selected_languages(
                [...selected_languages, option]);
        }
    };
    return (
        <div>
            <h1 style={{ color: 'green' }}>
                GeeksforGeeks
            </h1>
            <Dropdown >
                <Dropdown.Toggle
                                 style={{ width: '100%' }}>
                    
                     <span>Select Options</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {languages.map((option) => (
                        <div key={option} className="dropdown-item px-3 py-1">

                            <Form.Check type="checkbox">
                                <Form.Check.Input
                                    type="checkbox"
                                    onClick={() => toggleLang(option)}
                                    active={
                                        selected_languages.includes(option)}
                            
                                />
                                <Form.Check.Label>{option}</Form.Check.Label>
                            </Form.Check>

                        </div>
                        
                        
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            <div>
                <strong>Selected Options:</strong> 
                    {selected_languages.join(', ')}
            </div>
        </div>
    );
};
export default DropDown;