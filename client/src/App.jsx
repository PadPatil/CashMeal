import './index.css'; // or './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RegisterRestaurant from './pages/RegisterRestaurant';
import RegisterCustomer from './pages/RegisterCustomer';
import DashboardRestaurant from './pages/DashboardRestaurant';
import Login from './pages/Login'; 
import LoginCustomer from './pages/LoginCustomer';
import DashboardCustomer from './pages/DashboardCustomer';

import RegisterEventPlanner from './pages/RegisterEventPlanner';
import LoginEventPlanner from './pages/LoginEventPlanner';
import DashboardEventPlanner from './pages/DashboardEventPlanner';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register/restaurant" element={<RegisterRestaurant />} />
        <Route path="/register/customer" element={<RegisterCustomer />} />
        <Route path="/dashboard/restaurant" element={<DashboardRestaurant />} />

        <Route path="/login" element={<Login />} /> 
        <Route path="/login/customer" element={<LoginCustomer />} />
        <Route path="/dashboard/customer" element={<DashboardCustomer/>} />
        <Route path='register/eventplanner' element={<RegisterEventPlanner />} />
        <Route path='/login/eventplanner' element={<LoginEventPlanner />} />
        <Route path='/dashboard/eventplanner' element={<DashboardEventPlanner />} />
      </Routes>
    </Router>
  );
}

export default App;
