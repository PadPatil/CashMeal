const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');

// Generate a random 8-digit account number
function generateAccountNumber() {
  return Math.floor(Math.random() * 90000000) + 10000000;
}

router.post('/register', async (req, res) => {
  const {
    name,
    email,
    password,
    address,
    dietary,
    budget,
    time
  } = req.body;

  if (!name || !email || !password || !address) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const accountNumber = generateAccountNumber();

  db.run(
    `INSERT INTO Customers (
      AccountNumber,
      CustomerName,
      CustomerEmail,
      CustomerPassword,
      CustomerAddress,
      DietaryRestrictions,
      Budget,
      TimeLimit
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      accountNumber,
      name,
      email,
      hashedPassword,
      address,
      dietary || '',
      budget || null,
      time || null
    ],
    function (err) {
      if (err) {
        console.error('DB Error:', err.message);
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ accountNumber });
    }
  );
});

module.exports = router;
