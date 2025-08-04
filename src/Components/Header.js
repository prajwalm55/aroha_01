import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'phosphor-react';

const Header = ({ cartItems, onCartToggle, setSidebarOpen }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('Guest');

  // 🔁 Load user name from localStorage on mount
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsed = JSON.parse(user);
      setUsername(parsed.name || 'Guest');
    }
  }, []);

  const handleProfileClick = () => {
    const user = localStorage.getItem('user');
    if (user) {
      setSidebarOpen(true);
    } else {
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
        {/* 👤 Profile icon + name */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div
            onClick={handleProfileClick}
            style={{
              cursor: 'pointer',
              background: '#f3f4f6',
              borderRadius: '50%',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              marginBottom: '4px',
            }}
          >
            <User size={20} weight="bold" color="#1f2937" />
          </div>
          <span style={{ fontSize: '12px', color: '#1f2937', fontWeight: '500' }}>
            {username}
          </span>
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
