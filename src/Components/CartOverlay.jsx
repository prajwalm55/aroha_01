// import React from 'react';

// const CartOverlay = ({ visible, onClose }) => {
//   if (!visible) return null;
//   return (
//     <div className="cart-overlay" onClick={onClose}>
//       <div className="overlay-content">
//         <h4>Cart Overlay</h4>
//         <button onClick={onClose}>Close</button>
//       </div>
//     </div>
//   );
// };

// export default CartOverlay;


import React from 'react';

const CartOverlay = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40"
      onClick={onClose}
    />
  );
};

export default CartOverlay;
