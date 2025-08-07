import React from 'react';

const ProductCard = ({ product, addToCart }) => {
  return (
    <div
      style={{
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        fontFamily: 'system-ui, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
      }}
    >
      {/* ✅ Show image */}
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: '100%',
          height: '160px',
          objectFit: 'cover',
          borderRadius: '6px',
        }}
      />

      <div style={{ textAlign: 'left' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>
          {product.name}
        </h3>
        <p style={{ margin: 0, fontSize: '13px', color: '#6b7280' }}>
          Size: {product.size}
        </p>
        <p style={{ margin: '4px 0', fontWeight: 'bold', fontSize: '14px' }}>
          ₹{product.price.toFixed(2)}
        </p>
      </div>

      <button
        onClick={() => addToCart(product)}
        style={{
          marginTop: 'auto',
          backgroundColor: '#3b82f6',
          color: '#fff',
          padding: '10px 0',
          border: 'none',
          borderRadius: '6px',
          fontWeight: '600',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
