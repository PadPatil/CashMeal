import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function DashboardEventPlanner() {
  const [formData, setFormData] = useState({ dietary: '', budget: '', time: '' });
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [eventPlannerDetails, setEventPlannerDetails] = useState(null);

  useEffect(() => {
    // Fetch event planner details on component mount
    const fetchEventPlannerDetails = async () => {
      try {
        const id = localStorage.getItem('eventPlannerId');
        console.log('Fetched from localStorage:', id); 
        if (!id) throw new Error('Not logged in');
        const res = await axios.get(`/api/eventplanner/${id}`);
        setEventPlannerDetails(res.data);
      } catch (err) {
        console.error('Failed to fetch event planner details:', err);
        alert('Please log in again.');
        window.location.href = '/login/eventplanner';
      }
    };
    fetchEventPlannerDetails();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get('/api/search-restaurants', { params: formData });
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
      setSelectedRestaurant(id);
      setMenuItems(res.data);
    } catch (err) {
      console.error('Failed to load menu items:', err);
    }
  };

  const handleOrder = async (item) => {
    if (!eventPlannerDetails) {
      alert('Event planner info not loaded.');
      return;
    }

    const orderData = {
      OrderNumber: `ORD-${Date.now()}`,  // Or generate on backend
      CustomerName: eventPlannerDetails.name,
      AccountNumber: eventPlannerDetails.accountNumber,
      CustomerAddress: eventPlannerDetails.address,
      RestaurantID: selectedRestaurant,
      RestaurantName: restaurants.find(r => r.id === selectedRestaurant)?.name || '',
      MenuItems: [{ itemId: item.id, name: item.name, quantity, price: item.price }],
      TotalPrepTime: item.prep_time * quantity,
      TotalCost: item.price * quantity,
      TimeConstraint: formData.time,
      CostConstraint: formData.budget,
    };

    try {
      await axios.post('/api/orders', orderData);
      alert('Order placed successfully!');
      setQuantity(1);
    } catch (err) {
      console.error('Order creation failed:', err);
      alert('Failed to place order.');
    }
  };

  return (
    <div className="min-h-screen bg-white p-8">
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
        <div className="mt-8 bg-white p-6 border rounded shadow max-w-4xl mx-auto">
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
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-16 p-1 border rounded"
                    />
                    <button
                      onClick={() => handleOrder(item)}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
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
