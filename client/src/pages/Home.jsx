// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <img src={logo} alt="Cashmeal Logo" className="w-48 h-auto mb-6" />
      <h1 className="text-4xl font-bold text-green-700 mb-4">Welcome to Cashmeal!</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-md text-center">
        Enter your dietary needs, budget, and time — we’ll find meals for you!
      </p>
      
      {/* Registration buttons */}
      <div className="flex gap-4 mb-6">
        <Link to="/register/customer" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
          I'm a Customer
        </Link>
        <Link to="/register/restaurant" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          I'm a Restaurant
        </Link>
      </div>

      {/* Login Button */}
      <Link to="/login" className="text-sm text-gray-700 underline hover:text-gray-900">
        Already have an account? Log in
      </Link>
    </div>
  );
}
