import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginEventPlanner() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/eventplanner/login', { email, password });
      const { token, id, EventPlannerName } = res.data;
      console.log('Login response:', res.data);

      localStorage.setItem('token', token);
      localStorage.setItem('eventPlannerId', id);
      localStorage.setItem('eventPlannerName', EventPlannerName);

      console.log('Stored ID:', localStorage.getItem('eventPlannerId'))
      navigate('/dashboard/eventplanner'); // Redirect to event planner dashboard
    } catch (err) {
      console.error('Login failed:', err);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Event Planner Login</h2>

        <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          className="w-full mb-4 px-3 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          className="w-full mb-6 px-3 py-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="bg-green-600 text-white py-2 w-full rounded hover:bg-green-700">
          Log In
        </button>
      </form>
    </div>
  );
}
