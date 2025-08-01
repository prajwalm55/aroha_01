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
