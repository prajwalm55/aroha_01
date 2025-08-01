import React from 'react';

const ProductCard = ({ product, addToCart }) => {
  return (
    <div style={{ width: '200px', padding: '1rem', border: '1px solid #eee', borderRadius: '10px', textAlign: 'center' }}>
      <div style={{ backgroundColor: product.color, height: '150px', borderRadius: '5px', marginBottom: '0.5rem' }}></div>
      <h3>{product.name}</h3>
      <p style={{ fontWeight: 'bold', color: '#1e3a8a' }}>${product.price}</p>
      <button onClick={() => addToCart(product)} style={{ marginTop: '0.5rem', backgroundColor: '#3b82f6', color: '#fff', padding: '0.5rem 1rem', border: 'none', borderRadius: '5px' }}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
