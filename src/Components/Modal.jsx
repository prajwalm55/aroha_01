import React from 'react';

const Modal = ({ product, onClose, addToCart }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <img src={product.image} alt={product.name} className="mb-2" />
        <h2 className="text-xl font-bold">{product.name}</h2>
        <p className="mb-4">{product.price}</p>
        <div className="flex justify-between">
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            
            Add to Cart
          </button>
          <button onClick={onClose} className="text-red-500">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
