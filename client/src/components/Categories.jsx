import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost/CodeBreakers/logic/get-categories.php', {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          setCategories(res.data.categories);
        } else {
          console.error('Failed to load categories');
        }
      })
      .catch((err) => {
        console.error('Error loading categories:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  const getImageForCategory = (name) => {
    return '/man.jpg';
  };

  return (
    <section className="px-6 md:px-16 py-10 bg-background text-clr">
      <h2 className="text-2xl font-bold mb-6 text-primary text-center">Categories</h2>

      {loading ? (
        <p className="text-center text-muted">Loading categories...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="relative group rounded-lg overflow-hidden shadow-lg hover:scale-[1.03] transition duration-300"
            >
              <img
                src={getImageForCategory(cat.name)}
                alt={cat.name}
                className="w-full h-64 object-cover"
              />

              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-xl bg-black py-2 rounded-lg font-bold drop-shadow-lg text-center px-2">
                  {cat.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Categories;
