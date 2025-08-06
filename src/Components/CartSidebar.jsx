import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const CartSidebar = ({ open, onClose, cartItems, setCartItems }) => {
  if (!open) return null;

  const updateQuantity = (id, size, name, delta) => {
    const updated = cartItems.map(item =>
      item.id === id && item.size === size && item.name === name
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCartItems(updated);
  };

  const removeItem = (id, size, name) => {
    setCartItems(cartItems.filter(item => !(item.id === id && item.size === size && item.name === name)));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSaveCart = async () => {
    const stored = localStorage.getItem('user');
    if (!stored) {
      alert("User not logged in");
      return;
    }

    try {
      await axios.post(
        'http://localhost:3001/api/cart/save',
        { cartItems, total },
        { withCredentials: true }
      );

      alert('Cart saved successfully!');
      setCartItems([]);
      onClose();
    } catch (err) {
      console.error('❌ Failed to save cart:', err);
      alert('Failed to save cart');
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={sidebarStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h3>Shopping Cart</h3>
          <button onClick={onClose} style={closeBtn}>×</button>
        </div>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={`${item.id}-${item.size}-${item.name}-${index}`} style={itemStyle}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                />
                <div>
                  <p style={{ fontWeight: 'bold', margin: 0 }}>{item.name}</p>
                  <p style={{ margin: 0 }}>Size: <strong>{item.size}</strong></p>
                  <p style={{ margin: 0 }}>Style: <strong>{item.style}</strong></p>
                  <p style={{ margin: 0 }}>₹{item.price.toFixed(2)}</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                <button onClick={() => updateQuantity(item.id, item.size, item.name, -1)} style={qtyBtn}>-</button>
                <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.size, item.name, 1)} style={qtyBtn}>+</button>

                <button onClick={() => removeItem(item.id, item.size, item.name)} style={deleteBtn}>
                  <FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} />
                </button>
              </div>
            </div>
          ))
        )}

        <h4>Total: ₹{total.toFixed(2)}</h4>

        <button style={saveBtn} onClick={handleSaveCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

// ✅ Dark background overlay behind sidebar
const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  zIndex: 9999,
  display: 'flex',
  justifyContent: 'flex-end',
};

const sidebarStyle = {
  width: '320px',
  height: '100%',
  backgroundColor: '#fff',
  boxShadow: '-2px 0 5px rgba(0,0,0,0.2)',
  padding: '20px',
  overflowY: 'auto',
};

const closeBtn = {
  fontSize: '32px',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: 'red',
};

const itemStyle = {
  borderBottom: '1px solid #ddd',
  paddingBottom: '10px',
  marginBottom: '15px',
};

const qtyBtn = {
  width: '30px',
  height: '30px',
  fontSize: '16px',
  background: '#eee',
  border: '1px solid #ccc',
  cursor: 'pointer',
};

const deleteBtn = {
  marginLeft: 'auto',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
};

const saveBtn = {
  backgroundColor: '#2563eb',
  color: '#fff',
  padding: '10px',
  width: '100%',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: '600',
};

export default CartSidebar;
