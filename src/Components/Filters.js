import React, { useState } from 'react';

const Filters = ({ sizeFilter, setSizeFilter, styleFilter, setStyleFilter }) => {
  const sizes = ['All', 'XS', 'S', 'M', 'L', 'XL']; // ✅ Added "All" here
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
    <div
      style={{
        marginTop: '9rem', // ✅ Pushes the filters downward
        marginBottom: '1rem',
        display: 'flex',
        gap: '2rem',
        flexWrap: 'wrap',
      }}
    >
      <div>
        <strong>Size:</strong>
        <br />
        {sizes.map((size) => {
          const isAll = size === 'All';
          const isActive = isAll ? sizeFilter === '' : sizeFilter === size;

          return (
            <button
              key={size}
              style={getButtonStyle(isActive, hoveredSize === size)}
              onClick={() => setSizeFilter(isAll ? '' : size)}
              onMouseEnter={() => setHoveredSize(size)}
              onMouseLeave={() => setHoveredSize('')}
            >
              {size}
            </button>
          );
        })}
      </div>

      <div>
        <strong>Style:</strong>
        <br />
        {styles.map((style) => (
          <button
            key={style}
            style={getButtonStyle(styleFilter === style, hoveredStyle === style)}
            onClick={() =>
              setStyleFilter(styleFilter === style ? '' : style)
            }
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
