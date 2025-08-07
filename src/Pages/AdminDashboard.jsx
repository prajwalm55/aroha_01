// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const AdminDashboard = () => {
//   const [products, setProducts] = useState([]);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [newProduct, setNewProduct] = useState({
//     name: '',
//     size: '',
//     style: '',
//     category: '',
//     price: '',
//     quantity: '',
//     image: ''
//   });

//   const [totalProducts, setTotalProducts] = useState(0);
//   const [activeProducts, setActiveProducts] = useState(0);
//   const [lowStock, setLowStock] = useState(0);
//   const [totalValue, setTotalValue] = useState(0);

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
//     const active = products.filter(p => p.quantity >= 1);
//     setActiveProducts(active.length);
//     const lowStockCount = products.filter(p => p.quantity > 0 && p.quantity < 10).length;
//     setLowStock(lowStockCount);
//     const total = products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
//     setTotalValue(total);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3001/api/products/delete/${id}`);
//       fetchProducts();
//     } catch (err) {
//       console.error('Delete failed', err);
//     }
//   };

//   const handleEdit = (product) => {
//     setEditingProduct(product);
//     setNewProduct(product);
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
//       setNewProduct({
//         name: '',
//         size: '',
//         style: '',
//         category: '',
//         price: '',
//         quantity: '',
//         image: ''
//       });
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

//   return (
//     <div style={{ padding: '24px', backgroundColor: '#f3f4f6', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
//       {/* Topbar */}
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
//         <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>
//           <span role="img" aria-label="dashboard" style={{ marginRight: '8px' }}>📦</span>
//           Admin Dashboard
//         </h2>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//           <span>Welcome, Admin</span>
//           <div style={{ width: '32px', height: '32px', backgroundColor: '#2563eb', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>A</div>
//           <button onClick={handleLogout} style={{ backgroundColor: '#000', color: '#fff', padding: '8px 16px', borderRadius: '4px' }}>Logout</button>
//         </div>
//       </div>

//       {/* Stats */}
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
//         <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.05)' }}>
//           <p>Total Products 📦</p>
//           <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalProducts}</h2>
//         </div>
//         <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.05)' }}>
//           <p>Active Products ✅</p>
//           <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>{activeProducts}</h2>
//         </div>
//         <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.05)' }}>
//           <p>Low Stock ⚠️</p>
//           <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>{lowStock}</h2>
//         </div>
//         <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.05)' }}>
//           <p>Total Value 💰</p>
//           <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>${totalValue.toFixed(2)}</h2>
//         </div>
//       </div>

//       {/* Product Management */}
//       <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.05)', marginBottom: '24px' }}>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//           <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>Product Management</h3>
//           <button onClick={() => {
//             setEditingProduct(null);
//             setNewProduct({ name: '', size: '', style: '', category: '', price: '', quantity: '', image: '' });
//           }} style={{ backgroundColor: '#2563eb', color: '#fff', padding: '8px 12px', borderRadius: '4px' }}>
//             + Add New Product
//           </button>
//         </div>
//         <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
//           <thead style={{ backgroundColor: '#dbeafe' }}>
//             <tr>
//               <th style={{ padding: '8px', textAlign: 'left' }}>Product</th>
//               <th>Category</th>
//               <th>Price</th>
//               <th>Stock</th>
//               <th>Size</th>
//               <th>Style</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product) => (
//               <tr key={product._id} style={{ borderTop: '1px solid #e5e7eb' }}>
//                 <td style={{ padding: '8px' }}>{product.name}</td>
//                 <td style={{ textAlign: 'center' }}>{product.category}</td>
//                 <td style={{ textAlign: 'center' }}>${product.price.toFixed(2)}</td>
//                 <td style={{ textAlign: 'center', color: product.quantity === 0 ? 'red' : 'inherit' }}>{product.quantity}</td>
//                 <td style={{ textAlign: 'center' }}>{product.size}</td>
//                 <td style={{ textAlign: 'center' }}>{product.style}</td>
//                 <td style={{ textAlign: 'center' }}>
//                   <span style={{
//                     padding: '4px 8px',
//                     borderRadius: '12px',
//                     fontSize: '12px',
//                     backgroundColor: product.quantity >= 1 ? '#dcfce7' : '#fee2e2',
//                     color: product.quantity >= 1 ? '#15803d' : '#b91c1c'
//                   }}>
//                     {product.quantity >= 1 ? 'active' : 'inactive'}
//                   </span>
//                 </td>
//                 <td style={{ textAlign: 'center' }}>
//                   <button onClick={() => handleEdit(product)} style={{ backgroundColor: '#3b82f6', color: '#fff', padding: '4px 8px', borderRadius: '4px', marginRight: '6px' }}>Edit</button>
//                   <button onClick={() => handleDelete(product._id)} style={{ backgroundColor: '#ef4444', color: '#fff', padding: '4px 8px', borderRadius: '4px' }}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Form */}
//       <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.05)' }}>
//         <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>{editingProduct ? 'Edit Product' : 'Add Product'}</h3>
//         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
//           <input name="name" placeholder="Name" value={newProduct.name} onChange={handleInputChange} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
//           <input name="category" placeholder="Category" value={newProduct.category} onChange={handleInputChange} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
//           <input name="price" placeholder="Price" type="number" value={newProduct.price} onChange={handleInputChange} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
//           <input name="quantity" placeholder="Quantity" type="number" value={newProduct.quantity} onChange={handleInputChange} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
//           <input name="size" placeholder="Size" value={newProduct.size} onChange={handleInputChange} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
//           <input name="style" placeholder="Style" value={newProduct.style} onChange={handleInputChange} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
//         </div>
//         <button onClick={handleSave} style={{ marginTop: '16px', backgroundColor: '#2563eb', color: '#fff', padding: '10px 16px', borderRadius: '4px' }}>
//           {editingProduct ? 'Update' : 'Add'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;






























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
//     description: '',
//   });

//   const [totalProducts, setTotalProducts] = useState(0);
//   const [activeProducts, setActiveProducts] = useState(0);
//   const [lowStock, setLowStock] = useState(0);
//   const [totalValue, setTotalValue] = useState(0);

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

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3001/api/products/delete/${id}`);
//       fetchProducts();
//     } catch (err) {
//       console.error('Delete failed', err);
//     }
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
//       setNewProduct({
//         name: '',
//         size: '',
//         style: '',
//         category: '',
//         price: '',
//         quantity: '',
//         image: '',
//       });
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
//           <span role="img" aria-label="dashboard" style={{ marginRight: '8px' }}>📦</span>
//           Admin Dashboard
//         </h2>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//           <span>Welcome, Admin</span>
//           <div style={{ width: '32px', height: '32px', backgroundColor: '#2563eb', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>A</div>
//           <button onClick={handleLogout} style={{ backgroundColor: '#000', color: '#fff', padding: '8px 16px', borderRadius: '4px' }}>Logout</button>
//         </div>
//       </div>

//       {/* Stats */}
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
//         <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px' }}>
//           <p>Total Products 📦</p>
//           <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalProducts}</h2>
//         </div>
//         <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px' }}>
//           <p>Active Products ✅</p>
//           <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>{activeProducts}</h2>
//         </div>
//         <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px' }}>
//           <p>Low Stock ⚠️</p>
//           <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>{lowStock}</h2>
//         </div>
//         <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px' }}>
//           <p>Total Value 💰</p>
//           <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>${totalValue.toFixed(2)}</h2>
//         </div>
//       </div>

//       {/* Product Management */}
//       <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//           <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>Product Management</h3>
//           <button
//             onClick={() => {
//               setEditingProduct(null);
//               setNewProduct({
//                 name: '', size: '', style: '', category: '', price: '', quantity: '', image: '',
//               });
//               setShowModal(true);
//             }}
//             style={{ backgroundColor: '#2563eb', color: '#fff', padding: '8px 12px', borderRadius: '4px' }}
//           >
//             + Add New Product
//           </button>
//         </div>

//         <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
//           <thead style={{ backgroundColor: '#dbeafe' }}>
//             <tr>
//               <th style={{ padding: '8px', textAlign: 'left' }}>Product</th>
//               <th>Category</th>
//               <th>Price</th>
//               <th>Stock</th>
//               <th>Size</th>
//               <th>Style</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product) => (
//               <tr key={product._id} style={{ borderTop: '1px solid #e5e7eb' }}>
//                 <td style={{ padding: '8px' }}>{product.name}</td>
//                 <td style={{ textAlign: 'center' }}>{product.category}</td>
//                 <td style={{ textAlign: 'center' }}>${product.price.toFixed(2)}</td>
//                 <td style={{ textAlign: 'center', color: product.quantity === 0 ? 'red' : 'inherit' }}>{product.quantity}</td>
//                 <td style={{ textAlign: 'center' }}>{product.size}</td>
//                 <td style={{ textAlign: 'center' }}>{product.style}</td>
//                 <td style={{ textAlign: 'center' }}>
//                   <span style={{
//                     padding: '4px 8px',
//                     borderRadius: '12px',
//                     fontSize: '12px',
//                     backgroundColor: product.quantity >= 1 ? '#dcfce7' : '#fee2e2',
//                     color: product.quantity >= 1 ? '#15803d' : '#b91c1c'
//                   }}>
//                     {product.quantity >= 1 ? 'active' : 'inactive'}
//                   </span>
//                 </td>
//                 <td style={{ textAlign: 'center' }}>
//                   <button onClick={() => handleEdit(product)} style={{ backgroundColor: '#3b82f6', color: '#fff', padding: '4px 8px', borderRadius: '4px', marginRight: '6px' }}>Edit</button>
//                   <button onClick={() => handleDelete(product._id)} style={{ backgroundColor: '#ef4444', color: '#fff', padding: '4px 8px', borderRadius: '4px' }}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
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
//                 <option value="S">S</option>
//                 <option value="M">M</option>
//                 <option value="L">L</option>
//                 <option value="XS">xs</option>
//                 <option value="xL">xL</option>

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
//     </div>
//   );
// };

// export default AdminDashboard;









// final code



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

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3001/api/products/delete/${id}`);
//       fetchProducts();
//     } catch (err) {
//       console.error('Delete failed', err);
//     }
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
//       setNewProduct({
//         name: '', size: '', style: '', category: '', price: '', quantity: '', image: '',
//       });
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
//           <span role="img" aria-label="dashboard" style={{ marginRight: '8px' }}>📦</span>
//           Admin Dashboard
//         </h2>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//           <span>Welcome, Admin</span>
//           <div style={{ width: '32px', height: '32px', backgroundColor: '#2563eb', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>A</div>
//           <button onClick={handleLogout} style={{ backgroundColor: '#000', color: '#fff', padding: '8px 16px', borderRadius: '4px' }}>Logout</button>
//         </div>
//       </div>

//       {/* Stats */}
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
//         <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px' }}>
//           <p>Total Products 📦</p>
//           <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalProducts}</h2>
//         </div>
//         <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px' }}>
//           <p>Active Products ✅</p>
//           <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>{activeProducts}</h2>
//         </div>
//         <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px' }}>
//           <p>Low Stock ⚠️</p>
//           <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>{lowStock}</h2>
//         </div>
//         <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px' }}>
//           <p>Total Value 💰</p>
//           <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>${totalValue.toFixed(2)}</h2>
//         </div>
//       </div>

//       {/* Product Management */}
//       <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//           <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>Product Management</h3>
//           <button
//             onClick={() => {
//               setEditingProduct(null);
//               setNewProduct({
//                 name: '', size: '', style: '', category: '', price: '', quantity: '', image: '',
//               });
//               setShowModal(true);
//             }}
//             style={{ backgroundColor: '#2563eb', color: '#fff', padding: '8px 12px', borderRadius: '4px' }}
//           >
//             + Add New Product
//           </button>
//         </div>

//         <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
//           <thead style={{ backgroundColor: '#dbeafe' }}>
//             <tr>
//               <th style={{ padding: '8px', textAlign: 'left' }}>Product</th>
//               <th>Image</th>
//               <th>Category</th>
//               <th>Price</th>
//               <th>Stock</th>
//               <th>Size</th>
//               <th>Style</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product) => (
//               <tr key={product._id} style={{ borderTop: '1px solid #e5e7eb' }}>
//                 <td style={{ padding: '8px' }}>{product.name}</td>
//                 <td style={{ textAlign: 'center' }}>
//                   <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
//                 </td>
//                 <td style={{ textAlign: 'center' }}>{product.category}</td>
//                 <td style={{ textAlign: 'center' }}>${product.price.toFixed(2)}</td>
//                 <td style={{ textAlign: 'center', color: product.quantity === 0 ? 'red' : 'inherit' }}>{product.quantity}</td>
//                 <td style={{ textAlign: 'center' }}>{product.size}</td>
//                 <td style={{ textAlign: 'center' }}>{product.style}</td>
//                 <td style={{ textAlign: 'center' }}>
//                   <span style={{
//                     padding: '4px 8px',
//                     borderRadius: '12px',
//                     fontSize: '12px',
//                     backgroundColor: product.quantity >= 1 ? '#dcfce7' : '#fee2e2',
//                     color: product.quantity >= 1 ? '#15803d' : '#b91c1c'
//                   }}>
//                     {product.quantity >= 1 ? 'active' : 'inactive'}
//                   </span>
//                 </td>
//                 <td style={{ textAlign: 'center' }}>
//                   <button onClick={() => handleEdit(product)} style={{ backgroundColor: '#3b82f6', color: '#fff', padding: '4px 8px', borderRadius: '4px', marginRight: '6px' }}>Edit</button>
//                   <button onClick={() => handleDelete(product._id)} style={{ backgroundColor: '#ef4444', color: '#fff', padding: '4px 8px', borderRadius: '4px' }}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
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
//     </div>
//   );
// };

// export default AdminDashboard;










import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
  };

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      if (editingProduct) {
        await axios.put(`http://localhost:3001/api/products/update/${editingProduct._id}`, newProduct);
      } else {
        await axios.post('http://localhost:3001/api/products/add', newProduct);
      }
      setEditingProduct(null);
      setShowModal(false);
      setNewProduct({
        name: '', size: '', style: '', category: '', price: '', quantity: '', image: '',
      });
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
          <span role="img" aria-label="dashboard" style={{ marginRight: '8px' }}>📦</span>
          Admin Dashboard
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span>Welcome, Admin</span>
          <div style={{ width: '32px', height: '32px', backgroundColor: '#2563eb', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>A</div>
          <button onClick={handleLogout} style={{ backgroundColor: '#000', color: '#fff', padding: '8px 16px', borderRadius: '4px' }}>Logout</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px' }}>
          <p>Total Products 📦</p>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalProducts}</h2>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px' }}>
          <p>Active Products ✅</p>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>{activeProducts}</h2>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px' }}>
          <p>Low Stock ⚠️</p>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>{lowStock}</h2>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px' }}>
          <p>Total Value 💰</p>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>${totalValue.toFixed(2)}</h2>
        </div>
      </div>

      {/* Product Management */}
      <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>Product Management</h3>
          <button
            onClick={() => {
              setEditingProduct(null);
              setNewProduct({
                name: '', size: '', style: '', category: '', price: '', quantity: '', image: '',
              });
              setShowModal(true);
            }}
            style={{ backgroundColor: '#2563eb', color: '#fff', padding: '8px 12px', borderRadius: '4px' }}
          >
            + Add New Product
          </button>
        </div>

        <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#dbeafe' }}>
            <tr>
              <th style={{ padding: '8px', textAlign: 'left' }}>Product</th>
              <th>Image</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Size</th>
              <th>Style</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} style={{ borderTop: '1px solid #e5e7eb' }}>
                <td style={{ padding: '8px' }}>{product.name}</td>
                <td style={{ textAlign: 'center' }}>
                  <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
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
                  <button onClick={() => handleEdit(product)} style={{ backgroundColor: '#3b82f6', color: '#fff', padding: '4px 8px', borderRadius: '4px', marginRight: '6px' }}>Edit</button>
                  <button onClick={() => handleDeleteClick(product._id)} style={{ backgroundColor: '#ef4444', color: '#fff', padding: '4px 8px', borderRadius: '4px' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
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
              <input name="image" placeholder="Image URL" value={newProduct.image} onChange={handleInputChange} style={inputStyle} />

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
              <button onClick={() => setShowModal(false)} style={{ padding: '8px 16px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>Cancel</button>
              <button onClick={handleSave} style={{ padding: '8px 16px', backgroundColor: '#2563eb', color: '#fff', borderRadius: '4px' }}>
                {editingProduct ? 'Update' : 'Save Product'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {showDeletePopup && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000
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
            <h3 style={{ marginBottom: '10px' }}>🟠 Delete Product</h3>
            <p style={{ marginBottom: '20px' }}>
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
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

