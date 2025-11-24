import React from 'react';

const Cell = ({ value, onClick, isFading, disabled }) => {
  return (
    <div 
      className={`cell ${value ? value.toLowerCase() : ''} ${isFading ? 'fading' : ''} ${disabled ? 'disabled' : ''}`} 
      onClick={onClick}
    >
      {value}
    </div>
  );
};

export default Cell;
