// src/pages/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/restaurants/login', { email, password });
      const { token, restaurantId } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('restaurantId', restaurantId);
      window.location.href = '/dashboard/restaurant'; // Redirect on success
    } catch (err) {
      alert('Login failed. Check your email and password.');
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center text-green-700">Restaurant Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
