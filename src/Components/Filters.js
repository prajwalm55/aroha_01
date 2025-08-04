import React, { useState } from 'react';

const Filters = ({ sizeFilter, setSizeFilter, styleFilter, setStyleFilter }) => {
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const styles = ['Regular Fit', 'Oversized Fit'];

  const [hoveredSize, setHoveredSize] = useState('');
  const [hoveredStyle, setHoveredStyle] = useState('');

  const getButtonStyle = (active, hovered) => ({
    margin: '0.25rem',
    padding: '6px 12px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: active ? '#333' : hovered ? '#e6e6e6' : '#fff',
    color: active ? '#fff' : '#000',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  });

  return (
    <div style={{ margin: '1rem 0', display: 'flex', gap: '2rem' }}>
      <div>
        <strong>Size:</strong>
        <br />
        {sizes.map((size) => (
          <button
            key={size}
            style={getButtonStyle(sizeFilter === size, hoveredSize === size)}
            onClick={() => setSizeFilter(sizeFilter === size ? '' : size)}
            onMouseEnter={() => setHoveredSize(size)}
            onMouseLeave={() => setHoveredSize('')}
          >
            {size}
          </button>
        ))}
      </div>
      <div>
        <strong>Style:</strong>
        <br />
        {styles.map((style) => (
          <button
            key={style}
            style={getButtonStyle(styleFilter === style, hoveredStyle === style)}
            onClick={() => setStyleFilter(styleFilter === style ? '' : style)}
            onMouseEnter={() => setHoveredStyle(style)}
            onMouseLeave={() => setHoveredStyle('')}
          >
            {style}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filters;
