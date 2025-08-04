// Login.js
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/api/auth/login',
        {
          ...data,
          role,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const userData = response.data;
        localStorage.setItem('user', JSON.stringify(userData));

        if (userData.role === 'admin' && role === 'admin') {
          alert('Admin login successful');
          navigate('/admin/dashboard');
        } else if (userData.role === 'user' && role === 'user') {
          alert('User login successful');
          navigate('/');
        } else {
          alert(`You are not authorized to login as ${role}`);
        }
      }
    } catch (err) {
      alert(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#f9fafb',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          backgroundColor: '#ffffff',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
          width: '100%',
          maxWidth: '400px',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '10px', color: '#1f2937' }}>Login to StyleHub</h2>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '14px' }}>
          <label>
            <input
              type="radio"
              value="user"
              checked={role === 'user'}
              onChange={() => setRole('user')}
            />{' '}
            User
          </label>
          <label>
            <input
              type="radio"
              value="admin"
              checked={role === 'admin'}
              onChange={() => setRole('admin')}
            />{' '}
            Admin
          </label>
        </div>

        <input
          type="email"
          placeholder="Email"
          style={{
            padding: '10px',
            borderRadius: '6px',
            border: '1px solid #e5e7eb',
            fontSize: '14px',
          }}
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <p style={{ color: '#dc2626', fontSize: '12px' }}>{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Password"
          style={{
            padding: '10px',
            borderRadius: '6px',
            border: '1px solid #e5e7eb',
            fontSize: '14px',
          }}
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && <p style={{ color: '#dc2626', fontSize: '12px' }}>{errors.password.message}</p>}

        <button
          type="submit"
          style={{
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '10px',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '600',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          Login
        </button>

        <p style={{ textAlign: 'center', fontSize: '13px' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'none' }}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
