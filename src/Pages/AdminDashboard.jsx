import React, { useEffect, useState, useRef } from 'react';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // Store original data
  const [editingProduct, setEditingProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Add filters state
  const [filters, setFilters] = useState({
    category: '',
    size: '',
    style: ''
  });

  // Add new state for image upload
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const [newProduct, setNewProduct] = useState({
    name: '',
    size: '',
    style: '',
    category: '',
    price: '',
    quantity: '',
    image: '',
  });

  const [totalProducts, setTotalProducts] = useState(0);
  const [activeProducts, setActiveProducts] = useState(0);
  const [lowStock, setLowStock] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  useEffect(() => {
    fetchProducts();
    
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (showProfileDropdown && !event.target.closest('.profile-dropdown-container')) {
        setShowProfileDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileDropdown]);

  // Apply filters whenever filters or allProducts change
  useEffect(() => {
    applyFilters();
  }, [filters, allProducts]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/products/all');
      const data = await res.json();
      setAllProducts(data); // Store original data
      setProducts(data); // Display data
      calculateStats(data);
    } catch (err) {
      console.error('Failed to fetch products', err);
    }
  };

  // New function to apply filters
  const applyFilters = () => {
    let filtered = [...allProducts];
    
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }
    
    if (filters.size) {
      filtered = filtered.filter(product => product.size === filters.size);
    }
    
    if (filters.style) {
      filtered = filtered.filter(product => product.style === filters.style);
    }
    
    setProducts(filtered);
    calculateStats(filtered);
  };

  // New function to handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const calculateStats = (products) => {
    setTotalProducts(products.length);
    const active = products.filter((p) => p.quantity >= 1);
    setActiveProducts(active.length);
    const lowStockCount = products.filter((p) => p.quantity > 0 && p.quantity < 10).length;
    setLowStock(lowStockCount);
    const total = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
    setTotalValue(total);
  };

  const handleDeleteClick = (id) => {
    setSelectedProductId(id);
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/products/delete/${selectedProductId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        fetchProducts();
      } else {
        console.error('Delete failed');
      }
    } catch (err) {
      console.error('Delete failed', err);
    } finally {
      setShowDeletePopup(false);
      setSelectedProductId(null);
    }
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setSelectedProductId(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setNewProduct(product);
    setShowModal(true);
    // Clear image upload states when editing
    setImagePreview(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Updated handleInputChange to clear file upload when URL is entered
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
    
    // If image URL is being entered, clear file upload
    if (name === 'image' && value) {
      setImagePreview(null);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // New image upload handlers
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert('Please select a valid image file (JPEG, PNG, GIF, WebP)');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }
      
      setSelectedFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      
      // Clear URL input when file is uploaded
      setNewProduct(prev => ({ ...prev, image: '' }));
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setSelectedFile(null);
    setNewProduct(prev => ({ ...prev, image: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Updated handleSave to handle file uploads
  const handleSave = async () => {
    try {
      let imageUrl = newProduct.image;
      
      // If there's a selected file, upload it first
      if (selectedFile) {
        const formData = new FormData();
        formData.append('image', selectedFile);
        
        const uploadResponse = await fetch('http://localhost:3001/api/upload', {
          method: 'POST',
          body: formData
        });
        
        const uploadResult = await uploadResponse.json();
        
        if (uploadResult.success) {
          imageUrl = uploadResult.imageUrl;
        } else {
          alert('Failed to upload image');
          return;
        }
      }

      // Create product data with image URL
      const productData = {
        ...newProduct,
        image: imageUrl
      };

      let response;
      if (editingProduct) {
        response = await fetch(`http://localhost:3001/api/products/update/${editingProduct._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData)
        });
      } else {
        response = await fetch('http://localhost:3001/api/products/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData)
        });
      }
      
      if (response.ok) {
        // Reset form and close modal
        setEditingProduct(null);
        setShowModal(false);
        setNewProduct({ name: '', size: '', style: '', category: '', price: '', quantity: '', image: '' });
        setImagePreview(null);
        setSelectedFile(null);
        fetchProducts();
      } else {
        alert('Failed to save product');
      }
    } catch (err) {
      console.error('Save failed', err);
      alert('Something went wrong while saving!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; // or use your routing method
  };

  // Updated openModal function
  const openModal = () => {
    setEditingProduct(null);
    setNewProduct({ name: '', size: '', style: '', category: '', price: '', quantity: '', image: '' });
    setImagePreview(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setShowModal(true);
  };

  const inputStyle = {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '24px',
  };

  return (
    <div style={{ 
      padding: '24px', 
      backgroundColor: '#f3f4f6', 
      minHeight: '100vh', 
      fontFamily: 'Arial, sans-serif' 
    }}>
      {/* Topbar */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '24px'
      }}>
        <h2 style={{ 
          fontSize: '24px', 
          fontWeight: 'bold',
          margin: '0'
        }}>
          <span role="img" aria-label="dashboard" style={{ marginRight: '8px' }}>📦</span>Admin Dashboard
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative' }} className="profile-dropdown-container">
          <span>Welcome, Admin</span>
          <div 
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            style={{ 
              width: '32px', 
              height: '32px', 
              backgroundColor: '#2563eb', 
              color: '#fff', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            A
          </div>
          
          {/* Profile Dropdown */}
          {showProfileDropdown && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: '0',
              marginTop: '8px',
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              zIndex: 1000,
              minWidth: '120px'
            }}>
              <button
                onClick={handleLogout}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '24px',
                  borderRadius: '8px',
                  color: '#374151'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '16px', 
        marginBottom: '24px' 
      }}>
        {[
          { label: 'Total Products 📦', value: totalProducts },
          { label: 'Active Products ✅', value: activeProducts },
          { label: 'Low Stock ⚠️', value: lowStock },
          { label: 'Total Value 💰', value: `$${totalValue.toFixed(2)}` }
        ].map((stat, idx) => (
          <div key={idx} style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px' }}>
            <p style={{ margin: '0 0 8px 0' }}>{stat.label}</p>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: 'bold',
              margin: '0'
            }}>{stat.value}</h2>
          </div>
        ))}
      </div>

     {/* Product Table */}
     <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px', marginBottom: '24px', overflowX: 'auto' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: '16px'
        }}>
          <h3 style={{ 
            fontSize: '30px', 
            fontWeight: 'bold',
            margin: '0',
            padding: '8px 12px', 
          }}>Product Management</h3>
          <button
            onClick={openModal}
            style={{ 
              backgroundColor: '#2563eb', 
              color: '#fff', 
              padding: '12px 12px', 
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '20px',
              transition: 'all 0.2s ease-in-out',
              transform: 'scale(1)'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#1d4ed8';
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#2563eb';
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = 'none';
            }}
          >
             Add New Product
          </button>
        </div>

        <style>
          {`
            .product-table-row:hover {
              background-color: #dbeafe !important;
            }
            .product-table-row {
              transition: background-color 0.2s ease-in-out;
            }
          `}
        </style>
        <div style={{ minWidth: '700px' }}>
          <table style={{ width: '100%', fontSize: '16px', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: 'rgb(243,244,246)', width: '100%', padding: '15px' }}>
              <tr>
                <th 
                  style={{ 
                    padding: '14px', 
                    fontSize: '16px', 
                    textAlign: 'left',
                    transition: 'background-color 0.2s ease-in-out',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#e5e7eb';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  Product
                </th>

                {/* Category Filter */}
                <th 
                  style={{ 
                    textAlign: 'center',
                    transition: 'background-color 0.2s ease-in-out',
                    cursor: 'pointer',
                    padding: '14px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#e5e7eb';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    style={{
                      padding: '4px',
                      fontSize: '16px',
                      borderRadius: '4px',
                      border: '1px solid #ccc'
                    }}
                  >
                    <option value="">Category</option>
                    <option value="Shirts">Shirts</option>
                    <option value="Pants">Pants</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Shoes">Shoes</option>
                  </select>
                </th>

                <th 
                  style={{ 
                    textAlign: 'center',
                    transition: 'background-color 0.2s ease-in-out',
                    cursor: 'pointer',
                    padding: '14px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#e5e7eb';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  Price
                </th>

                <th 
                  style={{ 
                    textAlign: 'center',
                    transition: 'background-color 0.2s ease-in-out',
                    cursor: 'pointer',
                    padding: '14px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#e5e7eb';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  Stock
                </th>

                {/* Size Filter */}
                <th 
                  style={{ 
                    textAlign: 'center',
                    transition: 'background-color 0.2s ease-in-out',
                    cursor: 'pointer',
                    padding: '14px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#e5e7eb';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  <select
                    value={filters.size}
                    onChange={(e) => handleFilterChange('size', e.target.value)}
                    style={{
                      padding: '4px',
                      fontSize: '16px',
                      borderRadius: '4px',
                      border: '1px solid #ccc'
                    }}
                  >
                    <option value="">Size</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                </th>

                {/* Style Filter */}
                <th 
                  style={{ 
                    textAlign: 'center',
                    transition: 'background-color 0.2s ease-in-out',
                    cursor: 'pointer',
                    padding: '14px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#e5e7eb';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  <select
                    value={filters.style}
                    onChange={(e) => handleFilterChange('style', e.target.value)}
                    style={{
                      padding: '4px',
                      fontSize: '16px',
                      borderRadius: '4px',
                      border: '1px solid #ccc'
                    }}
                  >
                    <option value="">Style</option>
                    <option value="Regular Fit">Regular Fit</option>
                    <option value="Oversized Fit">Oversized Fit</option>
                  </select>
                </th>

                <th 
                  style={{ 
                    textAlign: 'center',
                    transition: 'background-color 0.2s ease-in-out',
                    cursor: 'pointer',
                    padding: '14px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#e5e7eb';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  Status
                </th>

                <th 
                  style={{ 
                    textAlign: 'center',
                    transition: 'background-color 0.2s ease-in-out',
                    cursor: 'pointer',
                    padding: '14px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#e5e7eb';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr 
                  key={product._id} 
                  className="product-table-row"
                  style={{ 
                    borderTop: '1px solid #e5e7eb'
                  }}
                >
                  <td style={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: '40px',
                        height: '40px',
                        objectFit: 'cover',
                        borderRadius: '6px',
                        marginRight: '12px',
                        border: '1px solid #ccc',
                      }}
                    />
                    <span style={{ fontWeight: 'bold' }}>{product.name}</span>
                  </td>
                  <td style={{ textAlign: 'center' }}>{product.category}</td>
                  <td style={{ textAlign: 'center' }}>₹{product.price.toFixed(2)}/-</td>
                  <td style={{ textAlign: 'center', color: product.quantity === 0 ? 'red' : 'inherit' }}>{product.quantity}</td>
                  <td style={{ textAlign: 'center' }}>{product.size}</td>
                  <td style={{ textAlign: 'center' }}>{product.style}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      backgroundColor: product.quantity >= 1 ? '#dcfce7' : '#fee2e2',
                      color: product.quantity >= 1 ? '#15803d' : '#b91c1c'
                    }}>
                      {product.quantity >= 1 ? 'active' : 'inactive'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span
                      onClick={() => handleEdit(product)}
                      title="Edit Product"
                      style={{ 
                        cursor: 'pointer', 
                        marginRight: '12px',
                        transition: 'all 0.2s ease-in-out',
                        display: 'inline-block'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                      }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span
                      onClick={() => handleDeleteClick(product._id)}
                      title="Delete Product"
                      style={{ 
                        cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out',
                        display: 'inline-block'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                      }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6" stroke="#da1b1b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Updated Modal with Image Upload */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.4)',
          display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#fff', 
            padding: '24px', 
            borderRadius: '8px',
            width: '400px', 
            maxHeight: '90vh', 
            overflowY: 'auto', 
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ 
              fontSize: '18px', 
              fontWeight: 'bold', 
              marginBottom: '16px',
              margin: '0 0 16px 0'
            }}>
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input 
                name="name" 
                placeholder="Product Name" 
                value={newProduct.name} 
                onChange={handleInputChange} 
                style={{...inputStyle, width: '100%', boxSizing: 'border-box'}} 
              />
              
              {/* Image Upload Section */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                  Product Image
                </label>
                
                {/* Image Preview */}
                {(newProduct.image || imagePreview) && (
                  <div style={{ position: 'relative', width: '100px', height: '100px', marginBottom: '8px' }}>
                    <img 
                      src={imagePreview || newProduct.image} 
                      alt="Product preview" 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover', 
                        borderRadius: '4px',
                        border: '1px solid #d1d5db'
                      }} 
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      style={{
                        position: 'absolute',
                        top: '-8px',
                        right: '-8px',
                        backgroundColor: '#ef4444',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      ×
                    </button>
                  </div>
                )}
                
                {/* File Upload Input */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                />
                
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: '#f3f4f6',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    width: '100%'
                  }}
                >
                  📁 Upload Image
                </button>
                
                {/* Or divider */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  fontSize: '12px', 
                  color: '#6b7280',
                  margin: '4px 0' 
                }}>
                  <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }}></div>
                  <span>OR</span>
                  <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }}></div>
                </div>
                
                <input 
                  name="image" 
                  placeholder="Or paste image URL" 
                  value={newProduct.image} 
                  onChange={handleInputChange} 
                  style={{...inputStyle, width: '100%', boxSizing: 'border-box'}} 
                />
              </div>
              
              <select 
                name="category" 
                value={newProduct.category} 
                onChange={handleInputChange} 
                style={{...inputStyle, width: '100%', boxSizing: 'border-box'}}
              >
                <option value="">Select Category</option>
                <option value="Shirt">Shirt</option>
                <option value="Pant">Pant</option>
                <option value="Accesories">Accesories</option>
              </select>
              <input 
                name="price" 
                type="number" 
                placeholder="Price ($)" 
                value={newProduct.price} 
                onChange={handleInputChange} 
                style={{...inputStyle, width: '100%', boxSizing: 'border-box'}} 
              />
              <input 
                name="quantity" 
                type="number" 
                placeholder="Stock Quantity" 
                value={newProduct.quantity} 
                onChange={handleInputChange} 
                style={{...inputStyle, width: '100%', boxSizing: 'border-box'}} 
              />
              <select 
                name="size" 
                value={newProduct.size} 
                onChange={handleInputChange} 
                style={{...inputStyle, width: '100%', boxSizing: 'border-box'}}
              >
                <option value="">Select Size</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
              <select 
                name="style" 
                value={newProduct.style} 
                onChange={handleInputChange} 
                style={{...inputStyle, width: '100%', boxSizing: 'border-box'}}
              >
                <option value="">Select Style</option>
                <option value="Regular Fit">Regular Fit</option>
                <option value="Oversized Fit">Oversized Fit</option>
              </select>
            </div>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              marginTop: '20px', 
              gap: '10px' 
            }}>
              <button 
                onClick={() => setShowModal(false)} 
                style={{ 
                  padding: '8px 16px', 
                  backgroundColor: '#f3f4f6', 
                  borderRadius: '4px', 
                  border: 'none', 
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button 
                onClick={handleSave} 
                style={{ 
                  padding: '8px 16px', 
                  backgroundColor: '#2563eb', 
                  color: '#fff', 
                  borderRadius: '4px', 
                  border: 'none', 
                  cursor: 'pointer'
                }}
              >
                {editingProduct ? 'Update' : 'Save Product'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {showDeletePopup && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center',
          justifyContent: 'center', zIndex: 2000
        }}>
          <div style={{
            background: '#fff', 
            padding: '24px 32px', 
            borderRadius: '12px', 
            width: '350px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)', 
            textAlign: 'center', 
            fontFamily: 'system-ui'
          }}>
            <h3 style={{ marginBottom: '10px', margin: '0 0 10px 0' }}>🟠 Delete Product</h3>
            <p style={{ 
              marginBottom: '20px',
              margin: '0 0 20px 0'
            }}>
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '12px' 
            }}>
              <button 
                onClick={cancelDelete} 
                style={{ 
                  padding: '8px 16px', 
                  backgroundColor: '#e5e7eb', 
                  border: 'none', 
                  borderRadius: '8px', 
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete} 
                style={{ 
                  padding: '8px 16px', 
                  backgroundColor: '#ef4444', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: '8px', 
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;