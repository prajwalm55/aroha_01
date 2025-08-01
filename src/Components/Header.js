// src/Components/Header.js
import React from 'react';

const Header = ({ cartItems, onCartToggle }) => {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 40px',
        borderBottom: '1px solid #e5e7eb',
        backgroundColor: '#fff',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <h2
        style={{
          fontSize: '24px',
          fontWeight: '700',
          color: '#1f2937',
          margin: 0,
        }}
      >
        StyleHub
      </h2>
      <button
        onClick={onCartToggle}
        style={{
          backgroundColor: '#2563eb',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          padding: '10px 20px',
          fontWeight: '600',
          fontSize: '14px',
          cursor: 'pointer',
        }}
      >
        Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
      </button>
    </header>
  );
};

export default Header;
