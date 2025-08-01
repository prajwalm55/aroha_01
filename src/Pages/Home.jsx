


// import React, { useState } from 'react';
// import Header from '../Components/Header';
// import CategoryNav from '../Components/CategoryNav';
// import Filters from '../Components/Filters';
// import ProductGrid from '../Components/ProductGrid';

// const dummyProducts = [
//   { name: 'Classic White Shirt', price: 29.99, color: '#f3f4f6' },
//   { name: 'Casual Blue Shirt', price: 34.99, color: '#60a5fa' },
//   { name: 'Premium Black Shirt', price: 39.99, color: '#1f2937' },
// ];

// const Home = () => {
//   const [selectedCategory, setSelectedCategory] = useState('Shirts');
//   const [cartItems, setCartItems] = useState([]);

//   const addToCart = (product) => {
//     setCartItems([...cartItems, product]);
//   };

//   return (
//     <div>
//       <Header cartCount={cartItems.length} />
//       <CategoryNav onCategorySelect={setSelectedCategory} />
//       <div style={{ padding: '1rem' }}>
//         <Filters />
//         <ProductGrid products={dummyProducts} addToCart={addToCart} />
//       </div>
//     </div>
//   );
// };

// export default Home;



// src/Pages/Home.jsx
import React, { useState } from 'react';
import Header from '../Components/Header';
import CategoryNav from '../Components/CategoryNav';
import Filters from '../Components/Filters';
import ProductGrid from '../Components/ProductGrid';
import CartSidebar from '../Components/CartSidebar';

const Home = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    const existing = cartItems.find((item) => item.id === product.id);
    if (existing) {
      const updated = cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updated);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    setCartOpen(true);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', background: '#f9fafb' }}>
      <Header cartItems={cartItems} onCartToggle={() => setCartOpen(true)} />
      <CategoryNav onCategorySelect={setSelectedCategory} />
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <Filters category={selectedCategory} />
        <ProductGrid category={selectedCategory} onAddToCart={handleAddToCart} />
      </main>
      <CartSidebar
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
    </div>
  );
};

export default Home;
