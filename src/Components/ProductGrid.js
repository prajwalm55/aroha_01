// import React from 'react';

// const ProductGrid = ({ products, category, size, style, onAddToCart }) => {
//   const filteredProducts = products.filter((product) => {
//     const matchCategory = category ? product.category === category : true;
//     const matchSize = size ? product.size === size : true;
//     const matchStyle = style ? product.style === style : true;
//     return matchCategory && matchSize && matchStyle;
//   });

//   return (
//     <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
//       {filteredProducts.length === 0 ? (
//         <p style={{ fontSize: '16px', color: '#555' }}>No products match the selected filters.</p>
//       ) : (
//         <div
//           style={{
//             display: 'flex',
//             gap: '24px',
//             flexWrap: 'wrap',
//             justifyContent: 'flex-start',
//           }}
//         >
//           {filteredProducts.map((product) => (
//             <div
//               key={product._id}
//               style={{
//                 border: '1px solid #e5e7eb',
//                 borderRadius: '12px',
//                 padding: '16px',
//                 width: '220px',
//                 backgroundColor: '#fff',
//                 boxShadow: '0 4px 6px rgba(0,0,0,0.08)',
//               }}
//             >
//               <div
//                 style={{
//                   backgroundColor: product.color,
//                   height: '160px',
//                   marginBottom: '12px',
//                   borderRadius: '8px',
//                 }}
//               ></div>
//               <h4>{product.name}</h4>
//               <p><strong>Size:</strong> {product.size}</p>
//               <p style={{ color: '#2563eb', fontWeight: 'bold' }}>
//                 ${product.price}
//               </p>
//               <button
//                 onClick={() => onAddToCart(product)}
//                 style={{
//                   backgroundColor: '#2563eb',
//                   color: '#fff',
//                   border: 'none',
//                   padding: '10px 0',
//                   borderRadius: '6px',
//                   cursor: 'pointer',
//                   width: '100%',
//                 }}
//               >
//                 Add to Cart
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductGrid;





// import React from 'react';

// const ProductGrid = ({ products, category, size, style, onAddToCart }) => {
//   const filteredProducts = products.filter((product) => {
//     const matchCategory = category ? product.category === category : true;
//     const matchSize = size ? product.size === size : true;
//     const matchStyle = style ? product.style === style : true;
//     return matchCategory && matchSize && matchStyle;
//   });

//   return (
//     <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
//       {filteredProducts.length === 0 ? (
//         <p style={{ fontSize: '16px', color: '#555' }}>
//           No products match the selected filters.
//         </p>
//       ) : (
//         <div
//           style={{
//             display: 'flex',
//             gap: '24px',
//             flexWrap: 'wrap',
//             justifyContent: 'flex-start',
//           }}
//         >
//           {filteredProducts.map((product) => (
//             <div
//               key={product._id}
//               style={{
//                 border: '1px solid #e5e7eb',
//                 borderRadius: '12px',
//                 padding: '16px',
//                 width: '220px',
//                 textAlign: 'left',
//                 backgroundColor: '#fff',
//                 boxShadow: '0 4px 6px rgba(0,0,0,0.08)',
//               }}
//             >
//               <div
//                 style={{
//                   backgroundColor: product.color,
//                   height: '160px',
//                   marginBottom: '12px',
//                   borderRadius: '8px',
//                 }}
//               ></div>
//               <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#1f2937' }}>
//                 {product.name}
//               </h4>
//               <p style={{ fontSize: '13px', color: '#6b7280' }}>
//                 <strong>Size:</strong> {product.size}
//               </p>
//               <p
//                 style={{
//                   fontWeight: '600',
//                   fontSize: '14px',
//                   color: '#2563eb',
//                   marginBottom: '16px',
//                 }}
//               >
//                 ${product.price}
//               </p>
//               <button
//                 onClick={() => onAddToCart(product)}
//                 style={{
//                   backgroundColor: '#2563eb',
//                   color: '#fff',
//                   border: 'none',
//                   padding: '10px 0',
//                   borderRadius: '6px',
//                   cursor: 'pointer',
//                   fontWeight: '600',
//                   width: '100%',
//                 }}
//               >
//                 Add to Cart
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductGrid;

// import React from 'react';

// const ProductGrid = ({ products, category, size, style, onAddToCart }) => {
//   // Apply filters based on category, size, and style
//   const filteredProducts = products.filter((product) => {
//     // Only apply filters if they are selected
//     const categoryMatch = !category || product.category === category;
//     const sizeMatch = !size || product.size === size;
//     const styleMatch = !style || product.style === style;
  
//     return categoryMatch && sizeMatch && styleMatch;
//   });
  

//   return (
//     <div
//       style={{
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
//         gap: '24px',
//         marginTop: '20px',
//       }}
//     >
//       {filteredProducts.length > 0 ? (
//         filteredProducts.map((product) => (
//           <div
//             key={product._id}
//             style={{
//               backgroundColor: '#fff',
//               padding: '16px',
//               borderRadius: '8px',
//               boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
//               textAlign: 'center',
//             }}
//           >
//             <h3 style={{ marginBottom: '8px' }}>{product.name}</h3>
//             <p>Category: {product.category}</p>
//             <p>Size: {product.size}</p>
//             <p>Style: {product.style}</p>
//             <p>Price: ${product.price}</p>
//             <button
//               onClick={() => onAddToCart(product)}
//               style={{
//                 marginTop: '8px',
//                 padding: '8px 12px',
//                 backgroundColor: '#2563eb',
//                 color: '#fff',
//                 border: 'none',
//                 borderRadius: '6px',
//                 cursor: 'pointer',
//               }}
//             >
//               Add to Cart
//             </button>
//           </div>
//         ))
//       ) : (
//         <p style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
//           No products match the selected filters.
//         </p>
//       )}
//     </div>
//   );
// };

// export default ProductGrid;








// import React from 'react';
// import ProductCard from './ProductCard'; // ✅ Correct default import

// const ProductGrid = ({ products, onAddToCart }) => {
//   return (
//     <div
//       style={{
//         display: 'grid',
//         gridTemplateColumns: 'repeat(4, 1fr)',
//         gap: '24px',
//         justifyItems: 'center',
//       }}
//     >
//       {products.length > 0 ? (
//         products.map((product) => (
//           <ProductCard
//             key={product._id || product.name}
//             product={product}
//             addToCart={onAddToCart}
//           />
//         ))
//       ) : (
//         <p style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
//           No products match the selected filters.
//         </p>
//       )}
//     </div>
//   );
// };

// export default ProductGrid;

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

    // Debug logs — you'll see these in your browser console
    console.log('Checking:', {
      name: product.name,
      productCategory,
      productSize,
      productStyle,
      matchCategory,
      matchSize,
      matchStyle
    });

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
