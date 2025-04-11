// src/components/Button/Button.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './button.css';

function Button({ 
  children, 
  onClick, 
  to = null,  // Add a "to" prop for navigation
  type = 'button', 
  disabled = false, 
  className = '' 
}) {
  const navigate = useNavigate();
  
  const handleClick = (event) => {
    // If there's a custom onClick handler, call it
    if (onClick) {
      onClick(event);
    }
    
    // If "to" prop is provided, navigate to that route
    if (to && !disabled) {
      navigate(to);
    }
  };
  
  return (
    <button
      type={type}
      className={`button ${className}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;