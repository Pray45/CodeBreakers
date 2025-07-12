import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost/CodeBreakers/logic/get-products.php')
      .then(res => {
        if (res.data.success) {
          setProducts(res.data.products);
        }
      })
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  return (
    <section className="px-6 md:px-16 py-10 bg-background text-clr">
      <h2 className="text-2xl font-bold mb-6 text-primary text-center">Latest Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.length === 0 && <p className="text-muted text-center">No products available.</p>}
        {products.map(product => (
          <div key={product.item_id} className="bg-surface rounded-xl shadow-lg overflow-hidden">
            <img
              src={`http://localhost/CodeBreakers/uploads/${product.image}`}
              alt={product.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-1">{product.title}</h3>
              <p className="text-sm text-muted mb-2">
                {product.description.length > 80 ? product.description.slice(0, 80) + '...' : product.description}
              </p>
              <p className="text-sm"><strong>Category:</strong> {product.category}</p>
              <p className="text-sm">
                <strong>Status:</strong>{' '}
                <span className={`inline-block px-2 py-1 rounded ${
                  product.status === 'available' ? 'bg-green-600' : 'bg-gray-500'
                }`}>
                  {product.status}
                </span>
              </p>
            </div>
            <Link
                to={`/product/${product.item_id}`}
                className="inline-block mt-3 bg-primary text-white px-4 py-2 rounded hover:opacity-90"
                >
                View Details
            </Link>

          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
