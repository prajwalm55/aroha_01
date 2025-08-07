import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import UserDetails from './Components/Auth/UserDetails';
import AdminDashboard from './Pages/AdminDashboard';
import ProtectedRoute from './Components/Auth/ProtectedRoute'; // ✅ Import this

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userDetails" element={<UserDetails />} />
        
        {/* ✅ Admin Protected Route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

