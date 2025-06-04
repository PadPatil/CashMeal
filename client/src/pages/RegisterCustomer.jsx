import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RegisterCustomer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    dietary: '',
    budget: '',
    time: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/customers/register', formData);

      // Optional: store returned ID or token if your backend sends it
      if (res.data?.id) {
        localStorage.setItem('customerId', res.data.id);
      }

      alert('Customer registered successfully!');
      navigate('/'); // ✅ redirect
    } catch (error) {
      console.error('❌ Registration failed:', error);
      alert('Error: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white p-4">
      <form onSubmit={handleSubmit} className="bg-green-50 p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-green-700">Customer Registration</h2>

        <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
        <input name="name" onChange={handleChange} value={formData.name}
          className="w-full mb-4 px-3 py-2 border rounded" required />

        <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
        <input name="email" type="email" onChange={handleChange} value={formData.email}
          className="w-full mb-4 px-3 py-2 border rounded" required />

        <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
        <input name="password" type="password" onChange={handleChange} value={formData.password}
          className="w-full mb-4 px-3 py-2 border rounded" required />

        <label className="block mb-2 text-sm font-medium text-gray-700">Address</label>
        <input name="address" onChange={handleChange} value={formData.address}
          className="w-full mb-4 px-3 py-2 border rounded" required />

        <label className="block mb-2 text-sm font-medium text-gray-700">Dietary Restrictions</label>
        <input name="dietary" onChange={handleChange} value={formData.dietary}
          className="w-full mb-4 px-3 py-2 border rounded" placeholder="e.g., Vegan, Gluten-Free" />

        <label className="block mb-2 text-sm font-medium text-gray-700">Budget ($)</label>
        <input name="budget" type="number" onChange={handleChange} value={formData.budget}
          className="w-full mb-4 px-3 py-2 border rounded" />

        <label className="block mb-2 text-sm font-medium text-gray-700">Time Limit (minutes)</label>
        <input name="time" type="number" onChange={handleChange} value={formData.time}
          className="w-full mb-6 px-3 py-2 border rounded" />

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full">
          Register
        </button>
      </form>
    </div>
  );
}
