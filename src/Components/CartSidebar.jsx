
// import React from 'react';

// const CartSidebar = ({ open, onClose, cartItems, setCartItems }) => {
//   if (!open) return null;

//   const removeItem = (index) => {
//     const updated = [...cartItems];
//     updated.splice(index, 1);
//     setCartItems(updated);
//   };

//   return (
//     <div className="fixed right-0 top-0 w-80 h-full bg-white shadow-lg z-50 p-4">
//       <h3 className="text-xl font-bold mb-4">Cart</h3>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         cartItems.map((item, index) => (
//           <div key={index} className="mb-2 flex justify-between">
//             <span>{item.name}</span>
//             <button onClick={() => removeItem(index)}>Remove</button>
//           </div>
//         ))
//       )}
//       <button onClick={onClose} className="mt-4 w-full bg-red-500 text-white p-2 rounded">
//         Close
//       </button>
//     </div>
//   );
// };

// export default CartSidebar;


// src/Components/CartSidebar.js


// import React from 'react';

// const CartSidebar = ({ open, cartItems, setCartItems, onClose }) => {
//   const handleQuantityChange = (id, type) => {
//     const updated = cartItems.map((item) =>
//       item.id === id
//         ? {
//             ...item,
//             quantity:
//               type === 'inc'
//                 ? item.quantity + 1
//                 : item.quantity > 1
//                 ? item.quantity - 1
//                 : 1,
//           }
//         : item
//     );
//     setCartItems(updated);
//   };

//   const handleRemove = (id) => {
//     setCartItems(cartItems.filter((item) => item.id !== id));
//   };

//   const totalPrice = cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   if (!open) return null;

//   return (
//     <div
//       style={{
//         position: 'fixed',
//         top: 0,
//         right: 0,
//         width: '300px',
//         height: '100vh',
//         backgroundColor: '#fff',
//         borderLeft: '1px solid #ccc',
//         padding: '20px',
//         zIndex: 1000,
//         overflowY: 'auto',
//       }}
//     >
//       <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//         <h3>Shopping Cart</h3>
//         <button onClick={onClose}>X</button>
//       </div>

//       {cartItems.map((item) => (
//         <div key={item.id} style={{ marginBottom: '20px' }}>
//           <div>{item.name}</div>
//           <div>
//             ${item.price} × {item.quantity}
//           </div>
//           <div>
//             <button onClick={() => handleQuantityChange(item.id, 'dec')}>-</button>
//             <span style={{ margin: '0 10px' }}>{item.quantity}</span>
//             <button onClick={() => handleQuantityChange(item.id, 'inc')}>+</button>
//             <button onClick={() => handleRemove(item.id)}>🗑</button>
//           </div>
//         </div>
//       ))}

//       <h4>Total: ${totalPrice.toFixed(2)}</h4>

//       <button
//         style={{
//           backgroundColor: 'green',
//           color: '#fff',
//           padding: '10px',
//           width: '100%',
//           border: 'none',
//           borderRadius: '4px',
//           marginTop: '10px',
//         }}
//       >
//         Send Cart via WhatsApp
//       </button>
//     </div>
//   );
// };

// export default CartSidebar;


// src/Components/CartSidebar.js
import React from 'react';

const CartSidebar = ({ open, onClose, cartItems, setCartItems }) => {
  if (!open) return null;

  const updateQuantity = (id, delta) => {
    const updated = cartItems
      .map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      );
    setCartItems(updated);
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '300px',
      height: '100%',
      backgroundColor: '#fff',
      boxShadow: '-2px 0 5px rgba(0,0,0,0.2)',
      padding: '20px',
      zIndex: 1000
    }}>
      <h3>Shopping Cart</h3>
      <button onClick={onClose} style={{ float: 'right', fontSize: '18px' }}>×</button>
      <div style={{ clear: 'both' }} />
      {cartItems.map(item => (
        <div key={item.id} style={{ marginBottom: '15px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
          <p><strong>{item.name}</strong></p>
          <p>Price: ${item.price}</p>
          <p>
            Qty:
            <button onClick={() => updateQuantity(item.id, -1)} style={{ margin: '0 5px' }}>-</button>
            {item.quantity}
            <button onClick={() => updateQuantity(item.id, 1)} style={{ margin: '0 5px' }}>+</button>
          </p>
          <button onClick={() => removeItem(item.id)} style={{ color: 'red' }}>Remove</button>
        </div>
      ))}
      <h4>Total: ${total.toFixed(2)}</h4>
      <button style={{
        backgroundColor: 'green',
        color: '#fff',
        padding: '10px 15px',
        border: 'none',
        cursor: 'pointer',
        width: '100%',
        marginTop: '10px'
      }}>
        Send Cart via WhatsApp
      </button>
    </div>
  );
};

export default CartSidebar;
