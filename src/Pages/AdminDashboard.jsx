// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const AdminDashboard = () => {
//   const [products, setProducts] = useState([]);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   const [newProduct, setNewProduct] = useState({
//     name: '',
//     size: '',
//     style: '',
//     category: '',
//     price: '',
//     quantity: '',
//     image: '',
//   });

//   const [totalProducts, setTotalProducts] = useState(0);
//   const [activeProducts, setActiveProducts] = useState(0);
//   const [lowStock, setLowStock] = useState(0);
//   const [totalValue, setTotalValue] = useState(0);

//   const [showDeletePopup, setShowDeletePopup] = useState(false);
//   const [selectedProductId, setSelectedProductId] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     const res = await axios.get('http://localhost:3001/api/products/all');
//     setProducts(res.data);
//     calculateStats(res.data);
//   };

//   const calculateStats = (products) => {
//     setTotalProducts(products.length);
//     const active = products.filter((p) => p.quantity >= 1);
//     setActiveProducts(active.length);
//     const lowStockCount = products.filter((p) => p.quantity > 0 && p.quantity < 10).length;
//     setLowStock(lowStockCount);
//     const total = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
//     setTotalValue(total);
//   };

//   const handleDeleteClick = (id) => {
//     setSelectedProductId(id);
//     setShowDeletePopup(true);
//   };

//   const confirmDelete = async () => {
//     try {
//       await axios.delete(`http://localhost:3001/api/products/delete/${selectedProductId}`);
//       fetchProducts();
//     } catch (err) {
//       console.error('Delete failed', err);
//     } finally {
//       setShowDeletePopup(false);
//       setSelectedProductId(null);
//     }
//   };

//   const cancelDelete = () => {
//     setShowDeletePopup(false);
//     setSelectedProductId(null);
//   };

//   const handleEdit = (product) => {
//     setEditingProduct(product);
//     setNewProduct(product);
//     setShowModal(true);
//   };

//   const handleInputChange = (e) => {
//     setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
//   };

//   const handleSave = async () => {
//     try {
//       if (editingProduct) {
//         await axios.put(`http://localhost:3001/api/products/update/${editingProduct._id}`, newProduct);
//       } else {
//         await axios.post('http://localhost:3001/api/products/add', newProduct);
//       }
//       setEditingProduct(null);
//       setShowModal(false);
//       setNewProduct({ name: '', size: '', style: '', category: '', price: '', quantity: '', image: '' });
//       fetchProducts();
//     } catch (err) {
//       console.error('Save failed', err);
//       alert('Something went wrong while saving!');
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   const inputStyle = {
//     padding: '10px',
//     borderRadius: '4px',
//     border: '1px solid #ccc',
//     fontSize: '14px',
//   };

//   return (
//     <div style={{ padding: '24px', backgroundColor: '#f3f4f6', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
//       {/* Topbar */}
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
//         <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>
//           <span role="img" aria-label="dashboard" style={{ marginRight: '8px' }}>📦</span>Admin Dashboard
//         </h2>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//           <span>Welcome, Admin</span>
//           <div style={{ width: '32px', height: '32px', backgroundColor: '#2563eb', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>A</div>
//           <button onClick={handleLogout} style={{ backgroundColor: '#000', color: '#fff', padding: '8px 16px', borderRadius: '4px' }}>Logout</button>
//         </div>
//       </div>

//       {/* Stats */}
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
//         {[
//           { label: 'Total Products 📦', value: totalProducts },
//           { label: 'Active Products ✅', value: activeProducts },
//           { label: 'Low Stock ⚠️', value: lowStock },
//           { label: 'Total Value 💰', value: `$${totalValue.toFixed(2)}` }
//         ].map((stat, idx) => (
//           <div key={idx} style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px' }}>
//             <p>{stat.label}</p>
//             <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>{stat.value}</h2>
//           </div>
//         ))}
//       </div>

//       {/* Product Table */}
//       <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
//         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
//           <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>Product Management</h3>
//           <button
//             onClick={() => {
//               setEditingProduct(null);
//               setNewProduct({ name: '', size: '', style: '', category: '', price: '', quantity: '', image: '' });
//               setShowModal(true);
//             }}
//             style={{ backgroundColor: '#2563eb', color: '#fff', padding: '8px 12px', borderRadius: '4px' }}
//           >
//             + Add New Product
//           </button>
//         </div>

// <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
//   <thead style={{ backgroundColor: '#dbeafe' }}>
//     <tr>
//       <th style={{ padding: '8px', textAlign: 'left' }}>Product</th>
//       <th style={{ textAlign: 'center' }}>Category</th>
//       <th style={{ textAlign: 'center' }}>Price</th>
//       <th style={{ textAlign: 'center' }}>Stock</th>
//       <th style={{ textAlign: 'center' }}>Size</th>
//       <th style={{ textAlign: 'center' }}>Style</th>
//       <th style={{ textAlign: 'center' }}>Status</th>
//       <th style={{ textAlign: 'center' }}>Actions</th>
//     </tr>
//   </thead>
//   <tbody>
//     {products.map((product) => (
//       <tr key={product._id} style={{ borderTop: '1px solid #e5e7eb' }}>
//         {/* Product Column with Image and Name only */}
//         <td style={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
//           <img
//             src={product.image}
//             alt={product.name}
//             style={{
//               width: '40px',
//               height: '40px',
//               objectFit: 'cover',
//               borderRadius: '6px',
//               marginRight: '12px',
//               border: '1px solid #ccc',
//             }}
//           />
//           <span style={{ fontWeight: 'bold' }}>{product.name}</span>
//         </td>

//         {/* Other Columns */}
//         <td style={{ textAlign: 'center' }}>{product.category}</td>
//         <td style={{ textAlign: 'center' }}>${product.price.toFixed(2)}</td>
//         <td style={{ textAlign: 'center', color: product.quantity === 0 ? 'red' : 'inherit' }}>{product.quantity}</td>
//         <td style={{ textAlign: 'center' }}>{product.size}</td>
//         <td style={{ textAlign: 'center' }}>{product.style}</td>
//         <td style={{ textAlign: 'center' }}>
//           <span style={{
//             padding: '4px 8px',
//             borderRadius: '12px',
//             fontSize: '12px',
//             backgroundColor: product.quantity >= 1 ? '#dcfce7' : '#fee2e2',
//             color: product.quantity >= 1 ? '#15803d' : '#b91c1c'
//           }}>
//             {product.quantity >= 1 ? 'active' : 'inactive'}
//           </span>
//         </td>
//         <td style={{ textAlign: 'center' }}>
//   <span
//     role="img"
//     aria-label="edit"
//     onClick={() => handleEdit(product)}
//     style={{ cursor: 'pointer', marginRight: '12px', color: '#3b82f6', fontSize: '16px' }}
//   >
//     ✏️
//   </span>
//   <span
//     role="img"
//     aria-label="delete"
//     onClick={() => handleDeleteClick(product._id)}
//     style={{ cursor: 'pointer', color: '#ef4444', fontSize: '16px' }}
//   >
//     🗑️
//   </span>
// </td>

//       </tr>
//     ))}
//   </tbody>
// </table>


//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div style={{
//           position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
//           backgroundColor: 'rgba(0,0,0,0.4)',
//           display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
//         }}>
//           <div style={{
//             backgroundColor: '#fff', padding: '24px', borderRadius: '8px',
//             width: '400px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
//           }}>
//             <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
//               {editingProduct ? 'Edit Product' : 'Add New Product'}
//             </h3>

//             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
//               <input name="name" placeholder="Product Name" value={newProduct.name} onChange={handleInputChange} style={inputStyle} />
//               <input name="image" placeholder="Image URL" value={newProduct.image} onChange={handleInputChange} style={inputStyle} />
//               <select name="category" value={newProduct.category} onChange={handleInputChange} style={inputStyle}>
//                 <option value="">Select Category</option>
//                 <option value="Shirt">Shirt</option>
//                 <option value="Pant">Pant</option>
//                 <option value="Accesories">Accesories</option>
//               </select>
//               <input name="price" type="number" placeholder="Price ($)" value={newProduct.price} onChange={handleInputChange} style={inputStyle} />
//               <input name="quantity" type="number" placeholder="Stock Quantity" value={newProduct.quantity} onChange={handleInputChange} style={inputStyle} />
//               <select name="size" value={newProduct.size} onChange={handleInputChange} style={inputStyle}>
//                 <option value="">Select Size</option>
//                 <option value="XS">XS</option>
//                 <option value="S">S</option>
//                 <option value="M">M</option>
//                 <option value="L">L</option>
//                 <option value="XL">XL</option>
//               </select>
//               <select name="style" value={newProduct.style} onChange={handleInputChange} style={inputStyle}>
//                 <option value="">Select Style</option>
//                 <option value="Regular Fit">Regular Fit</option>
//                 <option value="Oversized Fit">Oversized Fit</option>
//               </select>
//             </div>

//             <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', gap: '10px' }}>
//               <button onClick={() => setShowModal(false)} style={{ padding: '8px 16px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>Cancel</button>
//               <button onClick={handleSave} style={{ padding: '8px 16px', backgroundColor: '#2563eb', color: '#fff', borderRadius: '4px' }}>
//                 {editingProduct ? 'Update' : 'Save Product'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Popup */}
//       {showDeletePopup && (
//         <div style={{
//           position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
//           backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center',
//           justifyContent: 'center', zIndex: 2000
//         }}>
//           <div style={{
//             background: '#fff', padding: '24px 32px', borderRadius: '12px', width: '350px',
//             boxShadow: '0 2px 10px rgba(0,0,0,0.2)', textAlign: 'center', fontFamily: 'system-ui'
//           }}>
//             <h3 style={{ marginBottom: '10px' }}>🟠 Delete Product</h3>
//             <p style={{ marginBottom: '20px' }}>
//               Are you sure you want to delete this product? This action cannot be undone.
//             </p>
//             <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
//               <button onClick={cancelDelete} style={{ padding: '8px 16px', backgroundColor: '#e5e7eb', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
//               <button onClick={confirmDelete} style={{ padding: '8px 16px', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Delete</button>
//             </div>
//           </div>
//         </div>
//       )}





//     </div>
//   );
// };

// export default AdminDashboard;





import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:3001/api/products/all');
    setProducts(res.data);
    calculateStats(res.data);
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
      await axios.delete(`http://localhost:3001/api/products/delete/${selectedProductId}`);
      fetchProducts();
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
        
        const uploadResponse = await axios.post('http://localhost:3001/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        if (uploadResponse.data.success) {
          imageUrl = uploadResponse.data.imageUrl;
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

      if (editingProduct) {
        await axios.put(`http://localhost:3001/api/products/update/${editingProduct._id}`, productData);
      } else {
        await axios.post('http://localhost:3001/api/products/add', productData);
      }
      
      // Reset form and close modal
      setEditingProduct(null);
      setShowModal(false);
      setNewProduct({ name: '', size: '', style: '', category: '', price: '', quantity: '', image: '' });
      setImagePreview(null);
      setSelectedFile(null);
      fetchProducts();
    } catch (err) {
      console.error('Save failed', err);
      alert('Something went wrong while saving!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
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
    fontSize: '14px',
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#f3f4f6', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* Topbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>
          <span role="img" aria-label="dashboard" style={{ marginRight: '8px' }}>📦</span>Admin Dashboard
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span>Welcome, Admin</span>
          <div style={{ width: '32px', height: '32px', backgroundColor: '#2563eb', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>A</div>
          <button onClick={handleLogout} style={{ backgroundColor: '#000', color: '#fff', padding: '8px 16px', borderRadius: '4px' }}>Logout</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Total Products 📦', value: totalProducts },
          { label: 'Active Products ✅', value: activeProducts },
          { label: 'Low Stock ⚠️', value: lowStock },
          { label: 'Total Value 💰', value: `$${totalValue.toFixed(2)}` }
        ].map((stat, idx) => (
          <div key={idx} style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px' }}>
            <p>{stat.label}</p>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>{stat.value}</h2>
          </div>
        ))}
      </div>

      {/* Product Table */}
      <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>Product Management</h3>
          <button
            onClick={openModal}
            style={{ backgroundColor: '#2563eb', color: '#fff', padding: '8px 12px', borderRadius: '4px' }}
          >
            + Add New Product
          </button>
        </div>

        <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#dbeafe' }}>
            <tr>
              <th style={{ padding: '8px', textAlign: 'left' }}>Product</th>
              <th style={{ textAlign: 'center' }}>Category</th>
              <th style={{ textAlign: 'center' }}>Price</th>
              <th style={{ textAlign: 'center' }}>Stock</th>
              <th style={{ textAlign: 'center' }}>Size</th>
              <th style={{ textAlign: 'center' }}>Style</th>
              <th style={{ textAlign: 'center' }}>Status</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} style={{ borderTop: '1px solid #e5e7eb' }}>
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
                <td style={{ textAlign: 'center' }}>${product.price.toFixed(2)}</td>
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
                    role="img"
                    aria-label="edit"
                    onClick={() => handleEdit(product)}
                    style={{ cursor: 'pointer', marginRight: '12px', color: '#3b82f6', fontSize: '16px' }}
                  >
                    ✏️
                  </span>
                  <span
                    role="img"
                    aria-label="delete"
                    onClick={() => handleDeleteClick(product._id)}
                    style={{ cursor: 'pointer', color: '#ef4444', fontSize: '16px' }}
                  >
                    🗑️
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Updated Modal with Image Upload */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.4)',
          display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#fff', padding: '24px', borderRadius: '8px',
            width: '400px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input name="name" placeholder="Product Name" value={newProduct.name} onChange={handleInputChange} style={inputStyle} />
              
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
                    cursor: 'pointer'
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
                
                <input name="image" placeholder="Or paste image URL" value={newProduct.image} onChange={handleInputChange} style={inputStyle} />
              </div>
              
              <select name="category" value={newProduct.category} onChange={handleInputChange} style={inputStyle}>
                <option value="">Select Category</option>
                <option value="Shirt">Shirt</option>
                <option value="Pant">Pant</option>
                <option value="Accesories">Accesories</option>
              </select>
              <input name="price" type="number" placeholder="Price ($)" value={newProduct.price} onChange={handleInputChange} style={inputStyle} />
              <input name="quantity" type="number" placeholder="Stock Quantity" value={newProduct.quantity} onChange={handleInputChange} style={inputStyle} />
              <select name="size" value={newProduct.size} onChange={handleInputChange} style={inputStyle}>
                <option value="">Select Size</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
              <select name="style" value={newProduct.style} onChange={handleInputChange} style={inputStyle}>
                <option value="">Select Style</option>
                <option value="Regular Fit">Regular Fit</option>
                <option value="Oversized Fit">Oversized Fit</option>
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', gap: '10px' }}>
              <button onClick={() => setShowModal(false)} style={{ padding: '8px 16px', backgroundColor: '#f3f4f6', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleSave} style={{ padding: '8px 16px', backgroundColor: '#2563eb', color: '#fff', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>
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
            background: '#fff', padding: '24px 32px', borderRadius: '12px', width: '350px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)', textAlign: 'center', fontFamily: 'system-ui'
          }}>
            <h3 style={{ marginBottom: '10px' }}>🟠 Delete Product</h3>
            <p style={{ marginBottom: '20px' }}>
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <button onClick={cancelDelete} style={{ padding: '8px 16px', backgroundColor: '#e5e7eb', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
              <button onClick={confirmDelete} style={{ padding: '8px 16px', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;