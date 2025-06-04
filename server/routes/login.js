const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // import bcrypt
const db = require('../db'); // adjust path if needed

const JWT_SECRET = 'your-super-secret-key'; // ideally use env vars
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM Restaurants WHERE email = ?', [email], async (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, row.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: row.id, email: row.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, id: row.id, name: row.name });
  });
});

module.exports = router;
