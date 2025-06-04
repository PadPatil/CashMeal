const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = 'your-super-secret-key'; // Replace with env var in prod

router.post('/login-customer', (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM Customers WHERE CustomerEmail = ?', [email], async (err, customer) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!customer) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, customer.CustomerPassword);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: customer.AccountNumber, email: customer.CustomerEmail }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, id: customer.AccountNumber, name: customer.CustomerName });
  });
});

module.exports = router;
