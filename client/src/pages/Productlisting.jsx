import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const ProductGrid = () => {

  const [Products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://your-backend-url.com/api/items')
      .then((res) => {
        if (res.data.success && res.data.items.length > 0) {
          setProducts(res.data.items);
        } else {
          setProducts([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setProducts([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-background text-white">
      <Header/>
      <section className="px-6 md:px-16 py-10 bg-background h-full text-clr">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {Products.map((product) => (
            <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="bg-surface rounded-lg overflow-hidden shadow-lg hover:scale-101 duration-300 transition-transform"
            >
              <img
                src={`${product.image}`}
                alt={product.title}
                className="w-full h-48 object-cover"
                />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1">{product.title}</h3>
                <p className="text-muted text-sm mb-2 truncate">{product.description}</p>
                <span
                  className={`text-sm font-medium ${
                    product.status === 'Available' ? 'text-green-400' : 'text-red-400'
                  }`}
                  >
                  {product.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductGrid;
