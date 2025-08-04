import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Components/Header';
import CategoryNav from '../Components/CategoryNav';
import Filters from '../Components/Filters';
import ProductGrid from '../Components/ProductGrid';
import CartSidebar from '../Components/CartSidebar';
import Sidebar from '../Components/Sidebar';

const Home = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sizeFilter, setSizeFilter] = useState('');
  const [styleFilter, setStyleFilter] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();

  // ✅ Only open sidebar when explicitly requested via navigate state
  useEffect(() => {
    if (location?.state?.openSidebar) {
      setSidebarOpen(true);
    }
  }, [location]);

  const handleAddToCart = (product) => {
    setSelectedProduct(product);
  };

  const handleConfirmAdd = () => {
    if (!selectedProduct) return;

    const existing = cartItems.find((item) => item.id === selectedProduct.id);

    if (existing) {
      const updated = cartItems.map((item) =>
        item.id === selectedProduct.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updated);
    } else {
      setCartItems([...cartItems, { ...selectedProduct, quantity: 1 }]);
    }

    setCartOpen(true);
    setSelectedProduct(null);
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', background: '#f9fafb' }}>
      <Header
        cartItems={cartItems}
        onCartToggle={() => setCartOpen(true)}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <CategoryNav
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 32px' }}>
        <Filters
          sizeFilter={sizeFilter}
          setSizeFilter={setSizeFilter}
          styleFilter={styleFilter}
          setStyleFilter={setStyleFilter}
        />
        <ProductGrid
          category={selectedCategory}
          size={sizeFilter}
          style={styleFilter}
          onAddToCart={handleAddToCart}
        />
      </main>

      <CartSidebar
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />

      {/* Product Confirmation Modal */}
      {selectedProduct && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: '#fff',
              padding: '24px',
              borderRadius: '12px',
              width: '340px',
              boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
              fontFamily: 'system-ui, sans-serif',
              textAlign: 'center',
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
              {selectedProduct.name}
            </h3>
            <p style={{ marginBottom: '4px', fontSize: '14px' }}>
              <strong>Size:</strong> {selectedProduct.size}
            </p>
            <p style={{ marginBottom: '16px', fontSize: '14px' }}>
              <strong>Price:</strong> ${selectedProduct.price}
            </p>

            <button
              onClick={handleConfirmAdd}
              style={{
                backgroundColor: '#22c55e',
                color: '#fff',
                padding: '12px 0',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                width: '100%',
                fontSize: '15px',
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

