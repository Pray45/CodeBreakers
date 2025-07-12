import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost/CodeBreakers/logic/get-product-detail.php?item_id=${id}`)
      .then(res => {
        if (res.data.success) {
          setProduct(res.data.product);
        }
      })
      .catch(err => console.error('Error loading product:', err));
  }, [id]);

  if (!product) return <div className="text-white text-center p-10">Loading product...</div>;

  return (
    <div className="min-h-screen bg-background text-white px-4 py-8">
      <div className="max-w-3xl mx-auto bg-surface rounded-xl shadow-lg overflow-hidden">
        <img
          src={`http://localhost/CodeBreakers/uploads/${product.image}`}
          alt={product.title}
          className="w-full h-96 object-cover"
        />
        <div className="p-6 space-y-4">
          <h1 className="text-3xl font-bold text-primary">{product.title}</h1>
          <p className="text-muted">{product.description}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Size:</strong> {product.size}</p>
          <p><strong>Condition:</strong> {product.condition}</p>
          <p>
            <strong>Status:</strong>{' '}
            <span className={`px-3 py-1 rounded text-white ${product.status === 'available' ? 'bg-green-600' : 'bg-gray-600'}`}>
              {product.status}
            </span>
          </p>
          <p className="text-sm text-muted">Uploaded by: {product.uploader_name}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
