// import React from 'react';

// const categories = ['Shirts', 'Pants', 'Shoes', 'Accessories'];

// const CategoryNav = ({ onCategorySelect, selectedCategory }) => {
//   return (
//     <nav
//       style={{
//         display: 'flex',
//         gap: '2.5rem',
//         padding: '0 40px',
//         borderBottom: '1px solid #e5e7eb',
//         backgroundColor: '#fff',
//         fontFamily: 'system-ui, sans-serif',
//       }}
//     >
//       {categories.map((cat) => (
//         <button
//           key={cat}
//           onClick={() => onCategorySelect(cat)}
//           style={{
//             background: 'none',
//             border: 'none',
//             padding: '16px 0',
//             cursor: 'pointer',
//             fontWeight: '500',
//             fontSize: '16px',
//             color: selectedCategory === cat ? '#2563eb' : '#6b7280',
//             position: 'relative',
//             transition: 'color 0.2s ease',
//           }}
//           onMouseOver={(e) => {
//             if (selectedCategory !== cat) {
//               e.target.style.color = '#374151';
//             }
//           }}
//           onMouseOut={(e) => {
//             if (selectedCategory !== cat) {
//               e.target.style.color = '#6b7280';
//             }
//           }}
//         >
//           {cat}
//           {selectedCategory === cat && (
//             <div
//               style={{
//                 position: 'absolute',
//                 bottom: '0px',
//                 left: 0,
//                 height: '2px',
//                 width: '100%',
//                 backgroundColor: '#2563eb',
//                 borderRadius: '1px',
//               }}
//             />
//           )}
//         </button>
//       ))}
//     </nav>
//   );
// };

// export default CategoryNav;






import React from 'react';

const categories = ['Shirts', 'Pants', 'Shoes', 'Accessories'];

const CategoryNav = ({ onCategorySelect, selectedCategory }) => {
  return (
    <nav
      style={{
        display: 'flex',
        gap: '2.5rem',
        padding: '0 40px',
        borderBottom: '1px solid #e5e7eb',
        backgroundColor: '#fff',
        fontFamily: 'system-ui, sans-serif',
        position: 'fixed',         // ✅ Stick to top
        top: '107px',               // ✅ Push below header
        width: '100%',            // ✅ Full width
        zIndex: 999,              // ✅ Below header
      }}
    >
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategorySelect(cat)}
          style={{
            background: 'none',
            border: 'none',
            padding: '16px 0',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '16px',
            color: selectedCategory === cat ? '#2563eb' : '#6b7280',
            position: 'relative',
            transition: 'color 0.2s ease',
          }}
          onMouseOver={(e) => {
            if (selectedCategory !== cat) {
              e.target.style.color = '#374151';
            }
          }}
          onMouseOut={(e) => {
            if (selectedCategory !== cat) {
              e.target.style.color = '#6b7280';
            }
          }}
        >
          {cat}
          {selectedCategory === cat && (
            <div
              style={{
                position: 'absolute',
                bottom: '0px',
                left: 0,
                height: '2px',
                width: '100%',
                backgroundColor: '#2563eb',
                borderRadius: '1px',
              }}
            />
          )}
        </button>
      ))}
    </nav>
  );
};

export default CategoryNav;

