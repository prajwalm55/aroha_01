

// import React from 'react';
// import ProductCard from './ProductCard';

// const ProductGrid = ({ products, addToCart }) => {
//   return (
//     <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
//       {products.map((product) => (
//         <ProductCard key={product.name} product={product} addToCart={addToCart} />
//       ))}
//     </div>
//   );
// };

// export default ProductGrid;


// src/Components/ProductGrid.js
import React from 'react';
import products from '../assets/product';

const ProductGrid = ({ category, onAddToCart }) => {
  const filteredProducts = category
    ? products.filter((p) => p.category === category)
    : products;

  return (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      {filteredProducts.map((product) => (
        <div
          key={product.id}
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '16px',
            width: '200px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: product.color,
              height: '150px',
              marginBottom: '10px',
            }}
          ></div>
          <h4>{product.name}</h4>
          <p style={{ fontWeight: 'bold' }}>${product.price}</p>
          <button
            onClick={() => onAddToCart(product)}
            style={{
              backgroundColor: '#2563eb',
              color: '#fff',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
