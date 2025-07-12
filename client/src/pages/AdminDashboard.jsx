import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);

  // Fetch data based on active tab
  const [listings, setListings] = useState([]);
  useEffect(() => {
    if (activeTab === 'users') {
      axios
        .get('http://localhost/CodeBreakers/logic/get-users.php', { withCredentials: true })
        .then((res) => res.data.success && setUsers(res.data.users));
    } else if (activeTab === 'orders') {
      axios
        .get('http://localhost/CodeBreakers/logic/get-orders.php', { withCredentials: true })
        .then((res) => res.data.success && setOrders(res.data.orders));
    } else if (activeTab === 'listings') {
    axios.get('http://localhost/CodeBreakers/logic/get-listings.php', { withCredentials: true })
      .then(res => {
        console.log('Items Response:', res.data); //  Check console
        if (res.data.success) {
          setItems(res.data.items);
        }
      })
      .catch(err => console.error(err));
  }
  }, [activeTab]);
const handleCancelOrder = async (orderId) => {
  try {
    const res = await axios.post(
      'http://localhost/CodeBreakers/logic/cancel-order.php',
      { order_id: orderId },
      { withCredentials: true }
    );
    if (res.data.success) {
      setOrders(prev => prev.filter(order => order.order_id !== orderId));
    } else {
      console.warn(res.data.message);
    }
  } catch (err) {
    console.error('Error cancelling order:', err);
  }
};
const handleLogout = async () => {
  try {
    await axios.post(
      'http://localhost/CodeBreakers/logic/logout.php',
      {},
      { withCredentials: true }
    );
    sessionStorage.removeItem('user');
    window.location.href = '/'; // or use navigate('/')
  } catch (err) {
    console.error('Logout failed:', err);
  }
};
const handleRemoveListing = async (itemId) => {
  try {
    const res = await axios.post(
      'http://localhost/CodeBreakers/logic/remove-listing.php',
      { item_id: itemId },
      { withCredentials: true }
    );
    if (res.data.success) {
      setItems(prev => prev.filter(item => item.item_id !== itemId));
    } else {
      console.warn(res.data.message);
    }
  } catch (err) {
    console.error('Error removing item:', err);
  }
};

  // Delete user handler
  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      const res = await axios.post(
        'http://localhost/CodeBreakers/logic/delete-user.php',
        { id },
        { withCredentials: true }
      );

      if (res.data.success) {
        setUsers(users.filter((u) => u.user_id !== id));
      } else {
        alert(res.data.message || 'Failed to delete user');
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Server error');
    }
  };

  return (
    <div className="min-h-screen bg-background text-white p-6">
      <h1 className="text-3xl font-bold text-primary mb-6 text-center">Admin Dashboard</h1>

      {/* Top Menu */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-semibold"
        >
          Logout
        </button>
      </div>

      <div className="flex justify-center gap-8 mb-8">
        {['users', 'orders', 'listings'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full font-semibold ${
              activeTab === tab
                ? 'bg-primary text-white'
                : 'bg-surface text-muted hover:bg-muted transition'
            }`}
          >
            Manage {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-surface p-6 rounded-xl shadow-lg">
        {activeTab === 'users' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">User List</h3>
            <ul className="space-y-2">
              {users.map((u) => (
                <li key={u.user_id} className="p-2 border-b border-gray-700 flex justify-between items-center">
                  <div>
                    <span className="font-semibold">{u.name}</span> – {u.email} ({u.role})
                  </div>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    onClick={() => handleDeleteUser(u.user_id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === 'orders' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Manage Orders</h3>
            <ul className="space-y-4">
              {orders.length === 0 && <p className="text-muted">No orders found.</p>}
              {orders.map((order) => (
                <li key={order.order_id} className="p-4 border border-gray-700 rounded-lg bg-background shadow-sm">
                  <p className="text-primary font-bold mb-1">Order #{order.order_id}</p>
                  <p><strong>Item:</strong> {order.item_name}</p>
                  <p><strong>Order By:</strong> {order.buyer_name}</p>
                  <p><strong>Seller:</strong> {order.seller_name}</p>
                  <p>
                    <strong>Status:</strong>{' '}
                    <span className={`inline-block px-2 py-1 text-sm rounded ${
                      order.status === 'completed' ? 'bg-green-600' :
                      order.status === 'pending' ? 'bg-yellow-600' :
                      order.status === 'rejected' ? 'bg-red-600' : 'bg-gray-600'
                    }`}>
                      {order.status}
                    </span>
                  </p>
                  <p className="text-sm text-muted mt-1">
                    {new Date(order.created_at).toLocaleString()}
                  </p>
                  <button
                    onClick={() => handleCancelOrder(order.order_id)}
                    className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Cancel Order
                  </button>

                </li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === 'listings' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Manage Listings</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {items.length === 0 && <p className="text-muted">No items listed.</p>}
              {items.map((item) => (
                <li key={item.item_id} className="bg-background border border-gray-700 rounded-lg p-4 shadow-sm">
                  <img
                    src={`http://localhost/CodeBreakers/uploads/${item.image}`}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-md mb-3"
                  />
                  <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                  <p className="text-sm text-muted mb-2">{item.description.length > 80 ? item.description.slice(0, 80) + '...' : item.description}</p>
                  <p className="text-sm"><strong>Category:</strong> {item.category}</p>
                  <p className="text-sm"><strong>Size:</strong> {item.size}</p>
                  <p className="text-sm"><strong>Condition:</strong> {item.condition}</p>
                  <p className="text-sm"><strong>Status:</strong> 
                    <span className={`ml-2 text-sm px-2 py-1 rounded ${
                      item.status === 'available' ? 'bg-green-600' : 'bg-gray-500'
                    }`}>
                      {item.status}
                    </span>
                  </p>
                  <p className="text-sm text-muted mt-2">Uploaded by: {item.uploader_name}</p>
                  <button
                    onClick={() => handleRemoveListing(item.item_id)}
                    className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Remove Listing
                  </button>

                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};


export default AdminDashboard;
