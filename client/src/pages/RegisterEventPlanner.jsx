import React, { useState } from 'react';
import axios from 'axios';

export default function RegisterEventPlanner() {
  const [formData, setFormData] = useState({
    EventPlannerName: '',
    EventPlannerEmail: '',
    EventPlannerPassword: '',
    EventAdress: '',
    DietaryRestrictions: '',
    Budget: '',
    TimeLimit: '',
    EventTime: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/eventplanner/register', formData);
      alert('Event Planner registered successfully!');
    } catch (error) {
      console.error('❌ Registration failed:', error);
      alert('Error: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white p-4">
      <form onSubmit={handleSubmit} className="bg-blue-50 p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-blue-700">Event Planner Registration</h2>

        <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
        <input name="EventPlannerName" onChange={handleChange} value={formData.EventPlannerName}
          className="w-full mb-4 px-3 py-2 border rounded" required />

        <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
        <input name="EventPlannerEmail" type="email" onChange={handleChange} value={formData.EventPlannerEmail}
          className="w-full mb-4 px-3 py-2 border rounded" required />

        <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
        <input name="EventPlannerPassword" type="password" onChange={handleChange} value={formData.EventPlannerPassword}
          className="w-full mb-4 px-3 py-2 border rounded" required />

        <label className="block mb-2 text-sm font-medium text-gray-700">Address</label>
        <input name="EventAdress" onChange={handleChange} value={formData.EventAdress}
          className="w-full mb-4 px-3 py-2 border rounded" required />

        <label className="block mb-2 text-sm font-medium text-gray-700">Dietary Restrictions</label>
        <input name="DietaryRestrictions" onChange={handleChange} value={formData.DietaryRestrictions}
          className="w-full mb-4 px-3 py-2 border rounded" placeholder="e.g., Vegan, Halal" />

        <label className="block mb-2 text-sm font-medium text-gray-700">Budget ($)</label>
        <input name="Budget" type="number" onChange={handleChange} value={formData.Budget}
          className="w-full mb-4 px-3 py-2 border rounded" />

        <label className="block mb-2 text-sm font-medium text-gray-700">Time Limit (minutes)</label>
        <input name="TimeLimit" type="number" onChange={handleChange} value={formData.TimeLimit}
          className="w-full mb-4 px-3 py-2 border rounded" />

        <label className="block mb-2 text-sm font-medium text-gray-700">Event Time</label>
        <input name="EventTime" type="datetime-local" onChange={handleChange} value={formData.EventTime}
          className="w-full mb-6 px-3 py-2 border rounded" />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
          Register
        </button>
      </form>
    </div>
  );
}
