// // import { useForm } from 'react-hook-form';
// // import styles from './Auth.module.css';
// // import { Link } from 'react-router-dom';
// //  import axios from 'axios';

// // const Register = () => {
// //   const {
// //   register,
// //   handleSubmit,
// //   formState: { errors },
// // } = useForm({
// //   mode: 'onChange',          // Validate on first change
// //   reValidateMode: 'onChange', // Revalidate on every change
// // });




// // const onSubmit = async (data) => {
// //   try {
// //     console.log('Registration form submitted', data);

// //     const response = await axios.post('http://localhost:3001/api/auth/register', data);

// //     if (response.status === 201) {
// //       alert('Registration successful!');
// //       // Optional: reset form or redirect to login
// //     }
// //   } catch (error) {
// //     console.error('Registration error:', error);

// //     if (error.response) {
// //       // Server responded with a non-2xx status
// //       alert(error.response.data.message || 'Registration failed');
// //     } else {
// //       // Unexpected error (like network failure)
// //       alert('An unexpected error occurred. Please try again.');
// //     }
// //   }
// // };


// //   return (
// //     <div className={styles.authContainer}>
// //       <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
// //         <h2 className={styles.authTitle}>Create an account</h2>

// //         <div className={styles.inputGroup}>
// //           <label htmlFor="name" className={styles.label}>Full Name</label>
// //           <input
// //             id="name"
// //             type="text"
// //             className={styles.input}
// //             {...register('name', {
// //               required: 'Name is required',
// //               minLength: {
// //                 value: 3,
// //                 message: 'Name must be at least 3 characters',
// //               },
// //             })}
// //           />
// //           {errors.name && <div className={styles.error}>{errors.name.message}</div>}
// //         </div>

// //         <div className={styles.inputGroup}>
// //           <label htmlFor="email" className={styles.label}>Email</label>
// //           <input
// //             id="email"
// //             type="email"
// //             className={styles.input}
// //             {...register('email', {
// //               required: 'Email is required',
// //               pattern: {
// //                 value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
// //                 message: 'Invalid email address',
// //               },
// //             })}
// //           />
// //           {errors.email && <div className={styles.error}>{errors.email.message}</div>}
// //         </div>

// //         <div className={styles.inputGroup}>
// //           <label htmlFor="mobile" className={styles.label}>Mobile Number</label>
// //           <input
// //             id="mobile"
// //             type="text"
// //             className={styles.input}
// //             {...register('mobile', {
// //               required: 'Mobile number is required',
// //               pattern: {
// //                 value: /^[0-9]{10}$/,
// //                 message: 'Mobile number must be 10 digits',
// //               },
// //             })}
// //           />
// //           {errors.mobile && <div className={styles.error}>{errors.mobile.message}</div>}
// //         </div>

// //         <div className={styles.inputGroup}>
// //           <label htmlFor="password" className={styles.label}>Password</label>
// //           <input
// //             id="password"
// //             type="password"
// //             className={styles.input}
// //             {...register('password', {
// //               required: 'Password is required',
// //               minLength: {
// //                 value: 6,
// //                 message: 'Password must be at least 6 characters',
// //               },
// //             })}
// //           />
// //           {errors.password && <div className={styles.error}>{errors.password.message}</div>}
// //         </div>

// //         <button type="submit" className={styles.submitButton}>
// //           Register
// //         </button>

// //         <p className={styles.toggleText}>
// //           Already have an account?{' '}
// //           <Link to="/login" className={styles.toggleLink}>Login</Link>
// //         </p>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Register;


// import { useForm } from 'react-hook-form';
// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';

// const Register = () => {
//   const [role, setRole] = useState('user');
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors }
//   } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.post('http://localhost:3001/api/auth/register', {
//         ...data,
//         role
//       });

//       if (response.status === 201) {
//         alert('Registration Successful');
//         navigate('/login');
//       }
//     } catch (err) {
//       alert(err?.response?.data?.message || 'Registration failed');
//     }
//   };

//   return (
//     <div
//       style={{
//         background: 'radial-gradient(circle at center, #232427 0%, #1e1f21 100%)',
//         height: '100vh',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         fontFamily: 'sans-serif',
//         color: '#fff',
//       }}
//     >
//       <div
//         style={{
//           display: 'flex',
//           backgroundColor: '#2f3033',
//           borderRadius: '10px',
//           boxShadow: '0 0 30px rgba(0, 0, 0, 0.6)',
//           overflow: 'hidden',
//           width: '600px',
//           maxWidth: '90%',
//         }}
//       >
//         {/* Left Side (Form) */}
//         <div style={{ flex: 1, padding: '30px' }}>
//           <div
//             style={{
//               display: 'flex',
//               justifyContent: 'center',
//               gap: '40px',
//               marginBottom: '25px',
//               fontSize: '15px'
//             }}
//           >
//             <label>
//               <input
//                 type="radio"
//                 value="admin"
//                 checked={role === 'admin'}
//                 onChange={() => setRole('admin')}
//               />{' '}
//               Admin
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 value="user"
//                 checked={role === 'user'}
//                 onChange={() => setRole('user')}
//               />{' '}
//               User
//             </label>
//           </div>

//           <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
//             {/* Name */}
//             <input
//               type="text"
//               placeholder="Name"
//               style={inputStyle}
//               {...register('name', { required: 'Name is required' })}
//             />
//             {errors.name && <p style={errorStyle}>{errors.name.message}</p>}

//             {/* Email */}
//             <input
//               type="email"
//               placeholder="Email"
//               style={inputStyle}
//               {...register('email', { required: 'Email is required' })}
//             />
//             {errors.email && <p style={errorStyle}>{errors.email.message}</p>}

//             {/* Mobile */}
//             <input
//               type="text"
//               placeholder="Mobile"
//               style={inputStyle}
//               {...register('mobile', { required: 'Mobile number is required' })}
//             />
//             {errors.mobile && <p style={errorStyle}>{errors.mobile.message}</p>}

//             {/* Password */}
//             <input
//               type="password"
//               placeholder="Password"
//               style={inputStyle}
//               {...register('password', {
//                 required: 'Password is required',
//                 minLength: {
//                   value: 6,
//                   message: 'Password must be at least 6 characters'
//                 }
//               })}
//             />
//             {errors.password && <p style={errorStyle}>{errors.password.message}</p>}

//             <button
//               type="submit"
//               style={{
//                 background: '#18b65f',
//                 border: 'none',
//                 padding: '12px',
//                 fontWeight: 'bold',
//                 fontSize: '16px',
//                 color: 'white',
//                 borderRadius: '4px',
//                 cursor: 'pointer',
//               }}
//             >
//               REGISTER
//             </button>

//             <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '13px', color: '#ccc' }}>
//               Already have an account?{' '}
//               <Link to="/login" style={{ color: '#18b65f', textDecoration: 'underline', fontWeight: 'bold' }}>
//                 Login
//               </Link>
//             </p>
//           </form>
//         </div>

//         {/* Right Side */}
//         <div
//           style={{
//             flex: 1,
//             background: 'rgba(0, 0, 0, 0.1)',
//             borderLeft: '1px solid #555',
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             justifyContent: 'center',
//             padding: '30px',
//           }}
//         >
//           <div style={{ fontSize: '48px', marginBottom: '10px' }}>🛡️</div>
//           <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>ECHO</h2>
//           <p style={{ fontSize: '13px', color: '#aaa' }}>Payments Simplified</p>
//         </div>
//       </div>

//       <p
//         style={{
//           marginTop: '20px',
//           fontSize: '12px',
//           color: '#aaa',
//         }}
//       >
//         ©2018 Copyright ECHO Health, Inc. All Rights Reserved.
//       </p>
//     </div>
//   );
// };

// const inputStyle = {
//   background: '#444',
//   padding: '10px 12px',
//   border: 'none',
//   color: 'white',
//   fontSize: '14px',
//   borderRadius: '4px',
// };

// const errorStyle = {
//   color: '#ff6b6b',
//   fontSize: '12px',
//   margin: '0 -5px'
// };

// export default Register;


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
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3001/api/auth/register', {
        ...data,
        role
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
            {/* Name */}
            <input
              type="text"
              placeholder="Name"
              style={inputStyle}
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <p style={errorStyle}>{errors.name.message}</p>}

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              style={inputStyle}
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p style={errorStyle}>{errors.email.message}</p>}

            {/* Mobile */}
            <input
              type="text"
              placeholder="Mobile"
              style={inputStyle}
              {...register('mobile', { required: 'Mobile number is required' })}
            />
            {errors.mobile && <p style={errorStyle}>{errors.mobile.message}</p>}

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              style={inputStyle}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
            />
            {errors.password && <p style={errorStyle}>{errors.password.message}</p>}

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
              REGISTER
            </button>

            <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '13px', color: '#ccc' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#18b65f', textDecoration: 'underline', fontWeight: 'bold' }}>
                Login
              </Link>
            </p>
          </form>
        </div>

        {/* Right Side */}
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

const inputStyle = {
  background: '#444',
  padding: '10px 12px',
  border: 'none',
  color: 'white',
  fontSize: '14px',
  borderRadius: '4px',
};

const errorStyle = {
  color: '#ff6b6b',
  fontSize: '12px',
  margin: '0 -5px'
};

export default Register;
