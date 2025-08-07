import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, category, size, style, onAddToCart }) => {
  const filteredProducts = products.filter((product) => {
    const productCategory = product.category?.trim().toLowerCase();
    const productSize = product.size?.trim().toLowerCase();
    const productStyle = product.style?.trim().toLowerCase();

    const selectedCategory = category?.trim().toLowerCase();
    const selectedSize = size?.trim().toLowerCase();
    const selectedStyle = style?.trim().toLowerCase();

    const matchCategory = selectedCategory ? productCategory === selectedCategory : true;
    const matchSize = selectedSize ? productSize === selectedSize : true;
    const matchStyle = selectedStyle ? productStyle === selectedStyle : true;

    return matchCategory && matchSize && matchStyle;
  });

  if (filteredProducts.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem', color: '#6b7280' }}>
        No products match the selected filters.
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '2rem',
        marginTop: '2rem',
      }}
    >
      {filteredProducts.map((product) => (
        <ProductCard
          key={product._id || product.name}
          product={product}
          addToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
