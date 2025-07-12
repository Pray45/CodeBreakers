import React from 'react';

const categories = ['man.jpg', 'man.jpg', 'man.jpg', 'man.jpg', 'man.jpg', 'man.jpg'];

const Categories = () => {
  return (
    <section className="px-6 md:px-16 py-10 bg-background text-clr">
      <h2 className="text-2xl font-bold mb-6 text-primary text-center">Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat, index) => (
          <img src={cat} alt={`Category ${index + 1}`} className="w-full h-64 object-cover rounded-lg shadow-md hover:scale-102 transition rounded-t-lg" />
        ))}
      </div>
    </section>
  );
};

export default Categories;
