import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3001/api/auth/register', {
        ...data,
        role,
      });

      if (response.status === 201) {
        alert('Registration Successful');
        navigate('/login');
      }
    } catch (err) {
      alert(err?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
        <h2 style={headingStyle}>Create Your Account</h2>

        <div style={roleContainerStyle}>
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

        {/* Full Name - Only Alphabets */}
        <input
          type="text"
          placeholder="Full Name"
          style={inputStyle}
          {...register('name', {
            required: 'Name is required',
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: 'Name can contain only alphabets',
            },
          })}
        />
        {errors.name && <p style={errorText}>{errors.name.message}</p>}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          style={inputStyle}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: 'Enter a valid email address',
            },
          })}
        />
        {errors.email && <p style={errorText}>{errors.email.message}</p>}

        {/* Mobile Number - 10 digits starting with 6-9 */}
        <input
          type="text"
          placeholder="Mobile Number"
          style={inputStyle}
          {...register('mobile', {
            required: 'Mobile number is required',
            pattern: {
              value: /^[6-9]\d{9}$/,
              message: 'Enter a valid 10-digit number starting with 6-9',
            },
          })}
        />
        {errors.mobile && <p style={errorText}>{errors.mobile.message}</p>}

        {/* Password with Hint */}
        <input
          type="password"
          placeholder="Password"
          style={inputStyle}
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/,
              message: 'Password must include uppercase, number, and special character',
            },
          })}
        />
        <div style={passwordHint}>
          <span style={hintBullet}>•</span>
          <span><strong style={hintKeyword}>6+ chars</strong>,</span>
          <strong style={hintKeyword}>1 uppercase</strong>,
          <strong style={hintKeyword}>1 number</strong>,
          <strong style={hintKeyword}>1 special character</strong>
        </div>
        {errors.password && <p style={errorText}>{errors.password.message}</p>}

        <button type="submit" style={submitBtn}>Register</button>

        <p style={textCenter}>
          Already have an account?{' '}
          <Link to="/login" style={linkStyle}>Login</Link>
        </p>
      </form>
    </div>
  );
};

// Styles
const containerStyle = {
  backgroundColor: '#f9fafb',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
  fontFamily: 'system-ui, sans-serif',
};

const formStyle = {
  backgroundColor: '#ffffff',
  padding: '30px',
  borderRadius: '10px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
  width: '100%',
  maxWidth: '400px',
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
};

const headingStyle = {
  textAlign: 'center',
  marginBottom: '10px',
  color: '#1f2937',
};

const roleContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  fontSize: '14px',
};

const inputStyle = {
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #e5e7eb',
  fontSize: '14px',
};

const errorText = {
  color: '#dc2626',
  fontSize: '12px',
  marginTop: '-10px',
  marginBottom: '-5px',
};

const passwordHint = {
  fontSize: '12px',
  color: '#4b5563',
  marginTop: '-5px',
  marginBottom: '-3px',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '4px',
  lineHeight: '1.5',
};

const hintKeyword = {
  color: '#2563eb',
  fontWeight: '500',
};

const hintBullet = {
  color: '#10b981',
  fontWeight: 'bold',
  marginRight: '6px',
};

const submitBtn = {
  backgroundColor: '#2563eb',
  color: 'white',
  padding: '10px',
  border: 'none',
  borderRadius: '6px',
  fontWeight: '600',
  fontSize: '14px',
  cursor: 'pointer',
};

const textCenter = {
  textAlign: 'center',
  fontSize: '13px',
};

const linkStyle = {
  color: '#2563eb',
  fontWeight: '600',
  textDecoration: 'none',
};

export default Register;
