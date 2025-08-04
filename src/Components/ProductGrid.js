import React from 'react';
import products from '../assets/product';

const ProductGrid = ({ category, size, style, onAddToCart }) => {
  const filteredProducts = products.filter((product) => {
    const matchCategory = category ? product.category === category : true;
    const matchSize = size ? product.size === size : true;
    const matchStyle = style ? product.style === style : true;
    return matchCategory && matchSize && matchStyle;
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
      {filteredProducts.length === 0 ? (
        <p style={{ fontSize: '16px', color: '#555' }}>No products match the selected filters.</p>
      ) : (
        <div
          style={{
            display: 'flex',
            gap: '24px',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
          }}
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '16px',
                width: '220px',
                textAlign: 'left',
                backgroundColor: '#fff',
                boxShadow: '0 4px 6px rgba(0,0,0,0.08)',
                fontFamily: 'system-ui, sans-serif',
                transition: 'box-shadow 0.2s ease-in-out',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.08)';
              }}
            >
              <div
                style={{
                  backgroundColor: product.color,
                  height: '160px',
                  marginBottom: '12px',
                  borderRadius: '8px',
                }}
              ></div>
              <h4
                style={{
                  margin: '0 0 6px 0',
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#1f2937',
                }}
              >
                {product.name}
              </h4>
              <p
                style={{
                  margin: '0 0 6px 0',
                  fontSize: '13px',
                  color: '#6b7280',
                }}
              >
                <strong>Size:</strong> {product.size}
              </p>
              <p
                style={{
                  fontWeight: '600',
                  fontSize: '14px',
                  color: '#2563eb',
                  marginBottom: '16px',
                }}
              >
                ${product.price}
              </p>
              <button
                onClick={() => onAddToCart(product)}
                style={{
                  backgroundColor: '#2563eb',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 0',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  width: '100%',
                  fontSize: '14px',
                  transition: 'background-color 0.2s ease-in-out',
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#1d4ed8')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#2563eb')}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;

