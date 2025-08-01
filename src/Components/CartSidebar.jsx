


// // src/Components/CartSidebar.js
// import React from 'react';

// const CartSidebar = ({ open, onClose, cartItems, setCartItems }) => {
//   if (!open) return null;

//   const updateQuantity = (id, delta) => {
//     const updated = cartItems
//       .map(item =>
//         item.id === id
//           ? { ...item, quantity: Math.max(1, item.quantity + delta) }
//           : item
//       );
//     setCartItems(updated);
//   };

//   const removeItem = (id) => {
//     setCartItems(cartItems.filter(item => item.id !== id));
//   };

//   const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   return (
//     <div style={{
//       position: 'fixed',
//       top: 0,
//       right: 0,
//       width: '300px',
//       height: '100%',
//       backgroundColor: '#fff',
//       boxShadow: '-2px 0 5px rgba(0,0,0,0.2)',
//       padding: '20px',
//       zIndex: 1000
//     }}>
//       <h3>Shopping Cart</h3>
//       <button onClick={onClose} style={{ float: 'right', fontSize: '18px' }}>×</button>
//       <div style={{ clear: 'both' }} />
//       {cartItems.map(item => (
//         <div key={item.id} style={{ marginBottom: '15px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
//           <p><strong>{item.name}</strong></p>
//           <p>Price: ${item.price}</p>
//           <p>
//             Qty:
//             <button onClick={() => updateQuantity(item.id, -1)} style={{ margin: '0 5px' }}>-</button>
//             {item.quantity}
//             <button onClick={() => updateQuantity(item.id, 1)} style={{ margin: '0 5px' }}>+</button>
//           </p>
//           <button onClick={() => removeItem(item.id)} style={{ color: 'red' }}>Remove</button>
//         </div>
//       ))}
//       <h4>Total: ${total.toFixed(2)}</h4>
//       <button style={{
//         backgroundColor: 'green',
//         color: '#fff',
//         padding: '10px 15px',
//         border: 'none',
//         cursor: 'pointer',
//         width: '100%',
//         marginTop: '10px'
//       }}>
//         Send Cart via WhatsApp
//       </button>
//     </div>
//   );
// };

// export default CartSidebar;


import React from 'react';

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

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '320px',
        height: '100%',
        backgroundColor: '#fff',
        boxShadow: '-2px 0 5px rgba(0,0,0,0.2)',
        padding: '20px',
        zIndex: 1000,
        overflowY: 'auto',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>Shopping Cart</h3>
        <button
          onClick={onClose}
          style={{
            fontSize: '18px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          ×
        </button>
      </div>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item, index) => (
          <div
            key={`${item.id}-${item.size}-${index}`}
            style={{
              borderBottom: '1px solid #ddd',
              paddingBottom: '10px',
              marginBottom: '15px',
            }}
          >
            <p style={{ fontWeight: 'bold' }}>{item.name}</p>
            <p style={{ margin: 0 }}>Size: <strong>{item.size}</strong></p>
            <p style={{ margin: 0 }}>${item.price.toFixed(2)}</p>
            <div style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
              <button onClick={() => updateQuantity(item.id, item.size, -1)} style={qtyBtn}>-</button>
              <span style={{ margin: '0 10px' }}>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.size, 1)} style={qtyBtn}>+</button>
              <button
                onClick={() => removeItem(item.id, item.size)}
                style={{
                  marginLeft: 'auto',
                  background: 'none',
                  border: 'none',
                  color: 'red',
                  cursor: 'pointer',
                }}
              >
                🗑
              </button>
            </div>
          </div>
        ))
      )}

      <h4>Total: ${total.toFixed(2)}</h4>

      <button
        style={{
          backgroundColor: 'green',
          color: '#fff',
          padding: '10px',
          width: '100%',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
        onClick={() => {
          const msg = cartItems
            .map(
              (item) =>
                `${item.name} (${item.size}) x ${item.quantity} = $${(
                  item.price * item.quantity
                ).toFixed(2)}`
            )
            .join('%0A');
          const whatsappURL = `https://wa.me/?text=My Cart:%0A${msg}%0ATotal: $${total.toFixed(2)}`;
          window.open(whatsappURL, '_blank');
        }}
      >
        Send Cart via WhatsApp
      </button>
    </div>
  );
};

const qtyBtn = {
  width: '30px',
  height: '30px',
  fontSize: '16px',
  background: '#eee',
  border: '1px solid #ccc',
  cursor: 'pointer',
};

export default CartSidebar;
