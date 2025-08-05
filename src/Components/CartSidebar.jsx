import React from 'react';
import axios from 'axios';

const CartSidebar = ({ open, onClose, cartItems, setCartItems }) => {
  if (!open) return null;

  const updateQuantity = (id, size, delta) => {
    const updated = cartItems.map(item =>
      item.id === id && item.size === size
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCartItems(updated);
  };

  const removeItem = (id, size) => {
    setCartItems(cartItems.filter(item => !(item.id === id && item.size === size)));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSaveCart = async () => {
    const stored = localStorage.getItem('user');
    if (!stored) {
      alert("User not logged in");
      return;
    }

    try {
      const user = JSON.parse(stored);

      const response = await axios.post(
        'http://localhost:3001/api/cart/save',
        {
          userId: user._id,        // Send userId with cart
          cartItems,
          total
        },
        {
          withCredentials: true
        }
      );

      alert('Cart saved successfully!');
    } catch (err) {
      console.error('❌ Failed to save cart:', err);
      alert('Failed to save cart');
    }
  };

  return (
    <div style={sidebarStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>Shopping Cart</h3>
        <button onClick={onClose} style={closeBtn}>×</button>
      </div>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item, index) => (
          <div key={`${item.id}-${item.size}-${index}`} style={itemStyle}>
            <p style={{ fontWeight: 'bold' }}>{item.name}</p>
            <p style={{ margin: 0 }}>Size: <strong>{item.size}</strong></p>
            <p style={{ margin: 0 }}>${item.price.toFixed(2)}</p>
            <div style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
              <button onClick={() => updateQuantity(item.id, item.size, -1)} style={qtyBtn}>-</button>
              <span style={{ margin: '0 10px' }}>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.size, 1)} style={qtyBtn}>+</button>
              <button onClick={() => removeItem(item.id, item.size)} style={deleteBtn}>
                🗑
              </button>
            </div>
          </div>
        ))
      )}

      <h4>Total: ${total.toFixed(2)}</h4>

      <button style={saveBtn} onClick={handleSaveCart}>
        Add to Cart
      </button>
    </div>
  );
};

const sidebarStyle = {
  position: 'fixed',
  top: 0,
  right: 0,
  width: '320px',
  height: '100%',
  backgroundColor: '#fff',
  boxShadow: '-2px 0 5px rgba(0,0,0,0.2)',
  padding: '20px',
  zIndex: 1000,
  overflowY: 'auto'
};

const closeBtn = {
  fontSize: '32px',
  background: 'none',
  border: 'black',
  cursor: 'pointer',
  color: 'red'
};

const itemStyle = {
  borderBottom: '1px solid #ddd',
  paddingBottom: '10px',
  marginBottom: '15px'
};

const qtyBtn = {
  width: '30px',
  height: '30px',
  fontSize: '16px',
  background: '#eee',
  border: '1px solid #ccc',
  cursor: 'pointer'
};

const deleteBtn = {
  marginLeft: 'auto',
  background: 'none',
  border: 'none',
  color: 'red',
  cursor: 'pointer'
};

const saveBtn = {
  backgroundColor: '#2563eb',
  color: '#fff',
  padding: '10px',
  width: '100%',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: '600'
};

export default CartSidebar;
