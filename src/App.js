// // // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // // import Login from './Components/Auth/Login';
// // // import Register from './Components/Auth/Register';
// // // import UserDetails from './Components/Auth/UserDetails';
// // // // 
// // // function App() {
// // //   const handleFilter = (e) => {
// // //     const value = e.target.value;
// // //     console.log('Search input:', value); 
// // //   };

// // //   return (
// // //     <Router>
// // //       <div>

// // //         <Routes>
// // //           <Route path="/" element={<Login />} />
// // //           <Route path="/login" element={<Login />} />
// // //           <Route path="/register" element={<Register />} />
// // //           <Route path="/userDetails" element={<UserDetails />} />

// // //         </Routes>
// // //       </div>
// // //     </Router>
// // //   );
// // // }

// // // export default App;


// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import Login from './Components/Auth/Login';
// // import Register from './Components/Auth/Register';
// // import UserDetails from './Components/Auth/UserDetails';
// // import Home from './Pages/Home';

// // function App() {
// //   return (
// //     <Router>
// //       <Routes>
// //         {/* Auth Routes */}
// //         <Route path="/home" element={<Login />} />
// //         <Route path="/login" element={<Login />} />
// //         <Route path="/register" element={<Register />} />
// //         <Route path="/userDetails" element={<UserDetails />} />

// //         {/* E-Commerce Route */}
// //         <Route path="/" element={<Home />} />
// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './Components/Auth/Login';
// import Register from './Components/Auth/Register';
// import UserDetails from './Components/Auth/UserDetails';
// import Home from './Pages/Home';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/userDetails" element={<UserDetails />} />
//         <Route path="/home" element={<Home />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import UserDetails from './Components/Auth/UserDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userDetails" element={<UserDetails />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
