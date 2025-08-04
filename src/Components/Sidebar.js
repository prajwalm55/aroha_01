import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ open, onClose }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    onClose(); // Close sidebar
    navigate('/login'); // Redirect to login
  };

  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        height: '100%',
        width: '300px',
        backgroundColor: '#fff',
        boxShadow: '-2px 0 5px rgba(0,0,0,0.2)',
        padding: '20px',
        zIndex: 999,
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <button onClick={onClose} style={{ float: 'right' }}>❌</button>
      <h2 style={{ marginTop: '20px' }}>Profile</h2>

      {user ? (
        <>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <button
            onClick={handleLogout}
            style={{
              marginTop: '20px',
              padding: '10px 15px',
              backgroundColor: '#ef4444',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Logout
          </button>
        </>
        
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default Sidebar;
