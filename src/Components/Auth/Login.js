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
    formState: { errors }
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

        // ✅ Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(userData));

        // ✅ Navigate based on role
        if (userData.role === 'admin' && role === 'admin') {
          alert('Admin login successful');
          navigate('/admin/dashboard');
        } else if (userData.role === 'user' && role === 'user') {
          alert('User login successful');
          navigate('/'); // 👈 Open sidebar after login
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
        background: 'radial-gradient(circle at center, #232427 0%, #1e1f21 100%)',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'sans-serif',
        color: '#fff',
      }}
    >
      <div
        style={{
          display: 'flex',
          backgroundColor: '#2f3033',
          borderRadius: '10px',
          boxShadow: '0 0 30px rgba(0, 0, 0, 0.6)',
          overflow: 'hidden',
          width: '600px',
          maxWidth: '90%',
        }}
      >
        {/* Left Side (Form) */}
        <div style={{ flex: 1, padding: '30px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '40px',
              marginBottom: '25px',
              fontSize: '15px'
            }}
          >
            <label>
              <input
                type="radio"
                value="admin"
                checked={role === 'admin'}
                onChange={() => setRole('admin')}
              />{' '}
              Admin
            </label>
            <label>
              <input
                type="radio"
                value="user"
                checked={role === 'user'}
                onChange={() => setRole('user')}
              />{' '}
              User
            </label>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {/* Email */}
            <div
              style={{
                background: '#444',
                padding: '10px 12px',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '4px',
              }}
            >
              <span style={{ fontSize: '18px' }}>👤</span>
              <input
                type="email"
                placeholder="User Name"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  flex: 1,
                  paddingLeft: '10px',
                  fontSize: '14px'
                }}
                {...register('email', { required: 'Email is required' })}
              />
            </div>
            {errors.email && (
              <p style={{ color: '#ff6b6b', fontSize: '12px' }}>{errors.email.message}</p>
            )}

            {/* Password */}
            <div
              style={{
                background: '#444',
                padding: '10px 12px',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '4px',
              }}
            >
              <span style={{ fontSize: '18px' }}>🔒</span>
              <input
                type="password"
                placeholder="Password"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  flex: 1,
                  paddingLeft: '10px',
                  fontSize: '14px'
                }}
                {...register('password', { required: 'Password is required' })}
              />
            </div>
            {errors.password && (
              <p style={{ color: '#ff6b6b', fontSize: '12px' }}>{errors.password.message}</p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              style={{
                background: '#18b65f',
                border: 'none',
                padding: '12px',
                fontWeight: 'bold',
                fontSize: '16px',
                color: 'white',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              LOGIN
            </button>

            {/* Register Link */}
            <p
              style={{
                marginTop: '10px',
                textAlign: 'center',
                fontSize: '13px',
                color: '#ccc',
              }}
            >
              Don’t have an account?{' '}
              <Link
                to="/register"
                style={{
                  color: '#18b65f',
                  textDecoration: 'underline',
                  fontWeight: 'bold',
                }}
              >
                Register
              </Link>
            </p>
          </form>
        </div>

        {/* Right Side (Branding) */}
        <div
          style={{
            flex: 1,
            background: 'rgba(0, 0, 0, 0.1)',
            borderLeft: '1px solid #555',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '30px',
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>🛡️</div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>ECHO</h2>
          <p style={{ fontSize: '13px', color: '#aaa' }}>Payments Simplified</p>
        </div>
      </div>

      <p
        style={{
          marginTop: '20px',
          fontSize: '12px',
          color: '#aaa',
        }}
      >
        ©2018 Copyright ECHO Health, Inc. All Rights Reserved.
      </p>
    </div>
  );
};

export default Login;
