import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faTimes, faGift, faShippingFast, faPercent, faTrophy } from '@fortawesome/free-solid-svg-icons';

const CartSidebar = ({ open, onClose, cartItems, setCartItems }) => {
  const [showSubscription, setShowSubscription] = useState(false);
  
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

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = async () => {
    const stored = localStorage.getItem('user');
    if (!stored) {
      alert("User not logged in");
      return;
    }

    try {
      await axios.post(
        'http://localhost:3001/api/cart/save',
        { cartItems, total: subtotal },
        { withCredentials: true }
      );

      alert('Order placed successfully!');
      setCartItems([]);
      onClose();
    } catch (err) {
      console.error('❌ Failed to save cart:', err);
      alert('Failed to place order');
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={sidebarStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <h2 style={titleStyle}>MY CART ({itemCount})</h2>
          <button onClick={onClose} style={closeBtn}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        {/* Cart Items */}
        <div style={itemsContainerStyle}>
          {cartItems.length === 0 ? (
            <p style={emptyCartStyle}>Your cart is empty.</p>
          ) : (
            cartItems.map((item, index) => (
              <div key={`${item.id}-${item.size}-${item.name}-${index}`} style={itemCardStyle}>
                <div style={itemHeaderStyle}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={productImageStyle}
                  />
                  <div style={itemInfoStyle}>
                    <h4 style={itemNameStyle}>{item.name}</h4>
                    <span style={sizeTextStyle}>Size: {item.size}</span>
                    <div style={priceContainerStyle}>
                      <span style={currentPriceStyle}>₹{item.price.toFixed(2)}</span>
                    </div>
                  </div>
                  <div style={quantityControlsRightStyle}>
                    <div style={quantityRowStyle}>
                      <button onClick={() => updateQuantity(item.id, item.size, item.name, -1)} style={qtyBtnStyle}>-</button>
                      <span style={qtyCountStyle}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.size, item.name, 1)} style={qtyBtnStyle}>+</button>
                    </div>
                    <button onClick={() => removeItem(item.id, item.size, item.name)} style={removeTextStyle}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div style={footerStyle}>
            <div style={subtotalRowStyle}>
              <div style={subtotalContainerStyle}>
                <span style={subtotalLabelStyle}>Subtotal:</span>
                <span style={subtotalPriceStyle}>₹{subtotal.toFixed(2)}</span>
              </div>
              <button style={checkoutBtnStyle} onClick={handleCheckout}>
                🔒 PLACE ORDER
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};



// === Updated Styling ===
const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 9999,
  display: 'flex',
  justifyContent: 'flex-end',
};

const sidebarStyle = {
  width: '420px',
  height: '100%',
  backgroundColor: '#ffffff',
  boxShadow: '-4px 0 20px rgba(0,0,0,0.15)',
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'hidden',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px 20px 10px 20px',
  borderBottom: '1px solid #e5e7eb',
  position: 'relative',
};

const titleStyle = {
  margin: 0,
  fontSize: '16px',
  fontWeight: '600',
  color: '#1f2937',
  letterSpacing: '0.5px',
};

const closeBtn = {
  position: 'absolute',
  right: '20px',
  top: '50%',
  transform: 'translateY(-50%)',
  fontSize: '18px',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: '#6b7280',
  padding: '5px',
  borderRadius: '4px',
  transition: 'background-color 0.2s',
};

const itemsContainerStyle = {
  flex: 1,
  overflowY: 'auto',
  padding: '0 20px',
};

const emptyCartStyle = {
  textAlign: 'center',
  color: '#6b7280',
  fontSize: '14px',
  padding: '40px 20px',
};

const itemCardStyle = {
  borderBottom: '1px solid #f3f4f6',
  padding: '16px 0',
};

const itemHeaderStyle = {
  display: 'flex',
  gap: '12px',
  marginBottom: '12px',
};

const productImageStyle = {
  width: '60px',
  height: '60px',
  objectFit: 'cover',
  borderRadius: '8px',
  border: '1px solid #e5e7eb',
};

const itemInfoStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const itemNameStyle = {
  margin: '0 0 4px 0',
  fontSize: '15px',
  fontWeight: '600',
  color: '#1f2937',
  lineHeight: '1.4',
};

const sizeTextStyle = {
  fontSize: '13px',
  color: '#6b7280',
  fontWeight: '500',
  marginBottom: '8px',
  display: 'block',
};

const priceContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginTop: 'auto',
};

const currentPriceStyle = {
  fontSize: '15px',
  fontWeight: '700',
  color: '#1f2937',
};

const quantityControlsRightStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '8px',
};

const quantityRowStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  border: '1px solid #d1d5db',
  borderRadius: '4px',
  padding: '2px',
  backgroundColor: '#ffffff',
};

const qtyBtnStyle = {
  width: '14px',
  height: '25px',
  fontSize: '15px',
  background: '#ffffff',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: '600',
  color: '#374151',
  borderRadius: '2px',
};

const qtyCountStyle = {
  fontSize: '14px',
  fontWeight: '600',
  color: '#1f2937',
  minWidth: '20px',
  textAlign: 'center',
  padding: '0 8px',
};

const removeTextStyle = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: '12px',
  color: '#ef4444',
  fontWeight: '500',
  padding: '2px 19px 2px 5px',
};

const footerStyle = {
  padding: '20px',
  borderTop: '1px solid #e5e7eb',
  backgroundColor: '#ffffff',
};

const subtotalRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const subtotalContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
};

const subtotalLabelStyle = {
  fontSize: '14px',
  fontWeight: '500',
  color: '#6b7280',
};

const subtotalPriceStyle = {
  fontSize: '15px',
  fontWeight: '700',
  color: '#1f2937',
};

const checkoutBtnStyle = {
  backgroundColor: '#dc2626',
  color: '#ffffff',
  padding: '14px 38px',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: '16px',
  letterSpacing: '0.5px',
  transition: 'background-color 0.2s',
  minWidth: '120px',
};

export default CartSidebar;