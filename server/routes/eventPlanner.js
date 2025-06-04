const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = 'your-super-secret-key'; // Move to env in prod

// Register
router.post('/register', async (req, res) => {
  const {
    EventPlannerName,
    EventAdress,
    EventPlannerEmail,
    EventPlannerPassword,
    DietaryRestrictions,
    Budget,
    TimeLimit,
    EventTime
  } = req.body;
  const hashed = await bcrypt.hash(EventPlannerPassword, 10);

  db.run(`
  INSERT INTO EventPlanner (
    EventPlannerName,
    EventAdress,
    EventPlannerEmail,
    EventPlannerPassword,
    DietaryRestrictions,
    Budget,
    TimeLimit,
    EventTime
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  [
    EventPlannerName,
    EventAdress,
    EventPlannerEmail,
    hashed,
    DietaryRestrictions || null,
    Budget || null,
    TimeLimit || null,
    EventTime || null
  ],
  function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID });
  }
 );
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.get(`SELECT * FROM EventPlanner WHERE EventPlannerEmail = ?`, [email], async (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(401).json({ error: 'Invalid email' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1h' });
    res.json({ token, restaurantId: user.id });
  });
});

module.exports = router;
