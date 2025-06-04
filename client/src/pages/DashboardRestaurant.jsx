import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function DashboardRestaurant() {
  const [restaurantId, setRestaurantId] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: '', prep_time: '', restrictions: '' });
  const [editItemId, setEditItemId] = useState(null);
  const [editedItem, setEditedItem] = useState({});

  useEffect(() => {
    const storedId = localStorage.getItem('restaurantId');
    const token = localStorage.getItem('token');
    if (!storedId || !token) {
      alert('Not logged in. Redirecting to login.');
      return window.location.href = '/login';
    }
    setRestaurantId(storedId);
    fetchMenu(storedId);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const fetchMenu = async (id) => {
    try {
      const res = await axios.get(`/api/menus/${id}`);
      setMenuItems(res.data);
    } catch (err) {
      console.error('Failed to fetch menu', err);
    }
  };

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No token found. Please log in again.');
      return;
    }

    try {
      await axios.post(
        '/api/menus',
        { ...newItem, restaurant_id: restaurantId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchMenu(restaurantId);
      setNewItem({ name: '', price: '', prep_time: '', restrictions: '' });
    } catch (err) {
      console.error("❌ Error adding item:", err.response?.status, err.response?.data);
      alert('Failed to add item.');
    }
  };

  const handleDelete = async (itemId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`/api/menus/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMenu(restaurantId);
    } catch (err) {
      alert('Failed to delete item.');
      console.error(err);
    }
  };

  const handleEditToggle = (item) => {
    setEditItemId(item.id);
    setEditedItem({ ...item });
  };

  const handleEditChange = (e) => {
    setEditedItem({ ...editedItem, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`/api/menus/${editItemId}`, editedItem, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditItemId(null);
      setEditedItem({});
      fetchMenu(restaurantId);
    } catch (err) {
      alert('Failed to update item.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-green-700">Restaurant Dashboard</h2>
        <button onClick={handleLogout} className="text-sm text-red-600 underline">
          Logout
        </button>
      </div>

      {/* Add Menu Form */}
      <div className="bg-gray-100 p-4 rounded shadow mb-6 max-w-xl">
        <h3 className="text-lg font-semibold mb-2">Add New Item</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="name" value={newItem.name} onChange={handleChange} placeholder="Name" className="border p-2 rounded" />
          <input name="price" value={newItem.price} onChange={handleChange} placeholder="Price" type="number" className="border p-2 rounded" />
          <input name="prep_time" value={newItem.prep_time} onChange={handleChange} placeholder="Prep Time" type="number" className="border p-2 rounded" />
          <input name="restrictions" value={newItem.restrictions} onChange={handleChange} placeholder="Restrictions" className="border p-2 rounded" />
        </div>
        <button onClick={handleAdd} className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Add Item
        </button>
      </div>

      {/* Menu Items List */}
      <div className="max-w-2xl">
        <h3 className="text-xl font-semibold mb-4">Menu Items</h3>
        <ul className="space-y-4">
          {menuItems.map(item => (
            <li key={item.id} className="p-4 bg-white border rounded shadow-sm">
              {editItemId === item.id ? (
                <div className="space-y-2">
                  <input
                    name="name"
                    value={editedItem.name}
                    onChange={handleEditChange}
                    className="w-full border p-2 rounded"
                  />
                  <input
                    name="price"
                    value={editedItem.price}
                    onChange={handleEditChange}
                    className="w-full border p-2 rounded"
                  />
                  <input
                    name="prep_time"
                    value={editedItem.prep_time}
                    onChange={handleEditChange}
                    className="w-full border p-2 rounded"
                  />
                  <input
                    name="restrictions"
                    value={editedItem.restrictions}
                    onChange={handleEditChange}
                    className="w-full border p-2 rounded"
                  />
                  <button onClick={handleUpdate} className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{item.name} — ${item.price}</p>
                    <p className="text-sm text-gray-600">
                      Prep: {item.prep_time} min | Restrictions: {item.restrictions}
                    </p>
                  </div>
                  <div className="space-x-2">
                    <button onClick={() => handleEditToggle(item)} className="text-sm text-blue-600 hover:underline">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-sm text-red-600 hover:underline">
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
