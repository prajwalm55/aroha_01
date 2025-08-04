import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ cartItems, onCartToggle, setSidebarOpen }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    const user = localStorage.getItem('user');

    if (user) {
      // If user is logged in, open sidebar
      setSidebarOpen(true);
    } else {
      // If user not logged in, go to login page
      navigate('/login');
    }
  };

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
        position: 'relative',
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

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* 👤 Profile Icon */}
        <div
          onClick={handleProfileClick}
          style={{
            fontSize: '20px',
            cursor: 'pointer',
            background: '#f3f4f6',
            borderRadius: '50%',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          👤
        </div>

        {/* 🛒 Cart Button */}
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
      </div>
    </header>
  );
};

export default Header;
