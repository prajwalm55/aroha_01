// src/Components/Header.js
import React from 'react';

const Header = ({ cartItems, onCartToggle }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px 20px',
      borderBottom: '1px solid #ddd',
      backgroundColor: '#fff',
    }}>
      <h2>StyleHub</h2>
      <button onClick={onCartToggle} style={{ padding: '8px 15px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '5px' }}>
        Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
      </button>
    </div>
  );
};

export default Header;
