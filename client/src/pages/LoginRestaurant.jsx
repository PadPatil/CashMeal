import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginRestaurant = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/restaurants/login', { email, password });
      const { token, id } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('restaurantId', id);

      navigate('/dashboard');
    } catch (err) {
      alert('Login failed');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white p-4">
      <form onSubmit={handleLogin} className="bg-blue-50 p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-blue-700">Restaurant Login</h2>

        <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
        <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded" required />

        <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
        <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-3 py-2 border rounded" required />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginRestaurant;
