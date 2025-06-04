import React, { useState } from 'react';
import axios from 'axios';

export default function DashboardCustomer() {
  const [formData, setFormData] = useState({ dietary: '', budget: '', time: '' });
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [quantities, setQuantities] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get('/api/search-restaurants', {
        params: formData
      });
      setRestaurants(res.data);
      setSelectedRestaurant(null);
      setMenuItems([]);
    } catch (err) {
      console.error('Search error:', err);
      alert('Search failed.');
    }
  };

  const handleRestaurantClick = async (id) => {
    try {
      const res = await axios.get(`/api/menus/${id}`);
      setSelectedRestaurant({ id });
      setMenuItems(res.data);
    } catch (err) {
      console.error('Failed to load menu items:', err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const handleQuantityChange = (itemId, value) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: parseInt(value) || 0
    }));
  };

  const handleOrder = async (restaurantId, itemId) => {
    const token = localStorage.getItem('token');
    const accountNumber = localStorage.getItem('customerId'); // Make sure this is stored on login

    if (!token || !accountNumber) {
      alert('You must be logged in to place an order.');
      return;
    }

    const quantity = quantities[itemId] || 1;
    if (quantity < 1) return alert('Please enter a valid quantity.');

  console.log('Sending order payload:', {
    account_number: accountNumber,
    restaurant_id: restaurantId,
    items: [{ id: itemId, quantity }]
  });

    const payload = {
      account_number: accountNumber,
      restaurant_id: restaurantId,
      items: [{ id: itemId, quantity }]
    };
    
    try {
      await axios.post('/api/orders', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('✅ Order placed successfully!');
      setQuantities(prev => ({ ...prev, [itemId]: 0 }));
    } catch (err) {
      console.error('Order error:', err.response?.data || err.message);
      alert('❌ Failed to place order.');
    }
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-green-700">Customer Dashboard</h2>
        <button onClick={handleLogout} className="text-sm text-red-600 underline">
          Logout
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-green-700 text-center">Search Restaurants</h1>
      <form onSubmit={handleSearch} className="max-w-3xl mx-auto bg-green-50 p-6 rounded shadow mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            name="dietary"
            placeholder="e.g. Gluten Free"
            value={formData.dietary}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            name="budget"
            type="number"
            placeholder="Budget ($)"
            value={formData.budget}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            name="time"
            type="number"
            placeholder="Time Limit (min)"
            value={formData.time}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <button type="submit" className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full">
          Search
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {restaurants.map(r => (
          <div
            key={r.id}
            className="p-6 bg-white border rounded shadow cursor-pointer hover:bg-green-50"
            onClick={() => handleRestaurantClick(r.id)}
          >
            <h2 className="text-xl font-bold text-green-700">{r.name}</h2>
            <p className="text-gray-500">Click to view menu</p>
          </div>
        ))}
      </div>

      {selectedRestaurant && (
        <div className="mt-8 bg-white p-6 border rounded shadow">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Menu</h2>
          {menuItems.length === 0 ? (
            <p>No menu items found.</p>
          ) : (
            <ul className="space-y-4">
              {menuItems.map(item => (
                <li key={item.id} className="border p-4 rounded shadow">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p>Price: ${item.price}</p>
                  <p>Prep Time: {item.prep_time} min</p>
                  <p>Restrictions: {item.restrictions}</p>

                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      placeholder="Qty"
                      value={quantities[item.id] || ''}
                      onChange={e => handleQuantityChange(item.id, e.target.value)}
                      className="border px-2 py-1 w-20 rounded"
                    />
                    <button
                      onClick={() => handleOrder(item.restaurant_id, item.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Order
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
