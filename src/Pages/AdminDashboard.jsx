import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({ name: "", price: "", description: "" });
  const [error, setError] = useState("");

  // Fetch products on page load
  useEffect(() => {
    axios.get("http://localhost:3001/api/admin/products", {
      withCredentials: true
    })
    .then(res => setProducts(res.data))
    .catch(err => setError("Unauthorized or failed to load products"));
  }, []);

  // Delete Product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/admin/products/${id}`, {
        withCredentials: true
      });
      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  // Handle Edit Click
  const startEdit = (product) => {
    setEditingProduct(product._id);
    setUpdatedProduct({
      name: product.name,
      price: product.price,
      description: product.description
    });
  };

  // Submit Update
  const submitUpdate = async () => {
    try {
      const res = await axios.put(`http://localhost:3001/api/admin/products/${editingProduct}`, updatedProduct, {
        withCredentials: true
      });
      setProducts(products.map(p => p._id === editingProduct ? res.data : p));
      setEditingProduct(null);
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {products.map(product => (
        <div key={product._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          {editingProduct === product._id ? (
            <>
              <input
                type="text"
                value={updatedProduct.name}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
              />
              <input
                type="number"
                value={updatedProduct.price}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
              />
              <input
                type="text"
                value={updatedProduct.description}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
              />
              <button onClick={submitUpdate}>Save</button>
              <button onClick={() => setEditingProduct(null)}>Cancel</button>
            </>
          ) : (
            <>
              <p><strong>{product.name}</strong></p>
              <p>₹{product.price}</p>
              <p>{product.description}</p>
              <button onClick={() => startEdit(product)}>Edit</button>
              <button onClick={() => deleteProduct(product._id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}


export default AdminDashboard;
