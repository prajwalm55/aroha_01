import React from 'react';

const categories = ['Shirts', 'Pants', 'Shoes', 'Accessories'];

const CategoryNav = ({ onCategorySelect }) => {
  return (
    <nav style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid #eee', padding: '1rem' }}>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategorySelect(cat)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {cat}
        </button>
      ))}
    </nav>
  );
};

export default CategoryNav;
