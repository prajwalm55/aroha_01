// import React from 'react';

// const Filters = ({ onSearch }) => {
//   return (
//     <div className="filters">
//       <input type="text" placeholder="Search products..." onChange={onSearch} />
//     </div>
//   );
// };

// export default Filters;

// import React from 'react';

// const Filters = ({ category }) => {
//   return (
//     <div className="mb-4">
//       <p className="text-sm text-gray-600">
//         {category ? `Showing products in "${category}"` : 'Showing all products'}
//       </p>
//     </div>
//   );
// };

// export default Filters;


import React from 'react';

const Filters = () => {
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const styles = ['Regular Fit', 'Oversized Fit'];

  return (
    <div style={{ margin: '1rem 0', display: 'flex', gap: '2rem' }}>
      <div>
        <strong>Size:</strong><br />
        {sizes.map(size => (
          <button key={size} style={{ margin: '0.25rem' }}>{size}</button>
        ))}
      </div>
      <div>
        <strong>Style:</strong><br />
        {styles.map(style => (
          <button key={style} style={{ margin: '0.25rem' }}>{style}</button>
        ))}
      </div>
    </div>
  );
};

export default Filters;
