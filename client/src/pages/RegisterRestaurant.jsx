import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For redirect

const RegisterRestaurant = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    cuisine: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/restaurants/register', formData);
      const restaurantId = response.data.id;
      console.log('📦 Registered restaurant with ID:', restaurantId);
      
      // Save ID to localStorage
      localStorage.setItem('restaurantId', restaurantId);

      alert('Restaurant registered!');
      
      // Redirect to dashboard
      navigate('/dashboard/restaurant');
    } catch (error) {
      console.error('❌ Registration failed', error);
      alert('Registration failed. See console.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white p-4">
      <form onSubmit={handleSubmit} className="bg-blue-50 p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-blue-700">Restaurant Registration</h2>

        <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
        <input name="name" onChange={handleChange} value={formData.name}
          className="w-full mb-4 px-3 py-2 border rounded" required />

        <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
        <input name="email" onChange={handleChange} value={formData.email}
          type="email" className="w-full mb-4 px-3 py-2 border rounded" required />

        <label className="block mb-2 text-sm font-medium text-gray-700">Contact</label>
        <input name="contact" onChange={handleChange} value={formData.contact}
          className="w-full mb-4 px-3 py-2 border rounded" />

        <label className="block mb-2 text-sm font-medium text-gray-700">Cuisine</label>
        <input name="cuisine" onChange={handleChange} value={formData.cuisine}
          className="w-full mb-6 px-3 py-2 border rounded" required />
        
        <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
        <input name="password" type="password" onChange={handleChange} value={formData.password}
          className="w-full mb-4 px-3 py-2 border rounded" required />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterRestaurant;
