const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();

const db = require('./db');
const authenticateToken = require('./authenticateToken');

app.use(cors());
app.use(express.json());

// Routes
const restaurantRoutes = require('./routes/restaurants');
const customerRoutes = require('./routes/customers');
const menuRoutes = require('./routes/menus');

const loginRoutes = require('./routes/login');  // adjust path if needed
const loginCustomer = require('./routes/loginCustomer');

const eventPlannerRoutes = require('./routes/eventPlanner');


app.use('/api/restaurants', restaurantRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/menus', menuRoutes);


app.use('/api/login', loginRoutes);
app.use('/api/customers', loginCustomer);
app.use('/api/eventplanner', eventPlannerRoutes);


app.get('/ping', (req, res) => {
  res.send('Server is live!');
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
