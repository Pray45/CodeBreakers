import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [uploadedItems, setUploadedItems] = useState([]);
  const navigate = useNavigate();

  // Load user from sessionStorage
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        // Fetch orders
        axios
          .get(`http://localhost/CodeBreakers/logic/user-orders.php?user_id=${parsedUser.id}`, {
            withCredentials: true,
          })
          .then((res) => res.data.success && setOrders(res.data.orders))
          .catch((err) => console.error('Error fetching orders:', err));

        // Fetch uploaded items
        axios
          .get(`http://localhost/CodeBreakers/logic/user-listings.php?user_id=${parsedUser.id}`, {
            withCredentials: true,
          })
          .then((res) => res.data.success && setUploadedItems(res.data.items))
          .catch((err) => console.error('Error fetching uploaded items:', err));
      } catch (error) {
        console.error('Invalid user in session:', error);
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost/CodeBreakers/logic/logout.php', {
        withCredentials: true,
      });
    } catch (err) {
      console.error('Logout failed:', err);
    }

    sessionStorage.clear();
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p>Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">
          Welcome, {user.name}
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
        
        </div><Link
            to={`/home`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >Go to Home</Link>
        <br /><br />

      {/* Orders Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
        {orders.length === 0 ? (
          <p className="text-muted">No orders yet.</p>
        ) : (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li key={order.order_id} className="p-4 bg-surface rounded-lg shadow-md">
                <p className="font-bold text-primary">Order #{order.order_id}</p>
                <p><strong>Item ID:</strong> {order.item_id}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p className="text-sm text-muted">
                  {new Date(order.created_at).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Uploaded Items Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Listings</h2>
        {uploadedItems.length === 0 ? (
          <p className="text-muted">No items uploaded yet.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {uploadedItems.map((item) => (
              <li key={item.item_id} className="bg-surface rounded-lg p-4 shadow-md">
                <img
                  src={`http://localhost/CodeBreakers/uploads/${item.image}`}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-md mb-3"
                />
                <h4 className="font-bold text-lg">{item.title}</h4>
                <p className="text-sm text-muted">
                  {item.description.length > 80
                    ? item.description.slice(0, 80) + '...'
                    : item.description}
                </p>
                <p className="text-sm"><strong>Status:</strong> {item.status}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
