const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticateToken = require('../authenticateToken');

router.get('/:restaurantId', (req, res) => {
  const { restaurantId } = req.params;
  db.all('SELECT * FROM MenuItems WHERE restaurant_id = ?', [restaurantId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.post('/', authenticateToken, (req, res) => {
  console.log("🛂 Authenticated user:", req.user);
  console.log("📦 Received body:", req.body);

  let { name, price, prep_time, restrictions, restaurant_id} = req.body;

  // if (!restaurant_id || !name || !price) {
  //   return res.status(400).json({ error: 'Missing required fields' });
  // }

  restaurant_id = req.user.id;

  db.run(
    `INSERT INTO MenuItems (name, price, prep_time, restrictions, restaurant_id)
     VALUES (?, ?, ?, ?, ?)`,
    [name, price, prep_time, restrictions, restaurant_id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});
router.put('/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { name, price, prep_time, restrictions } = req.body;

  const sql = `
    UPDATE MenuItems
    SET name = ?, price = ?, prep_time = ?, restrictions = ?
    WHERE id = ? AND restaurant_id = ?
  `;

  const params = [name, price, prep_time, restrictions, id, req.user.id];

  db.run(sql, params, function (err) {
    if (err) {
      console.error('❌ DB error:', err.message);
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(403).json({ error: 'Unauthorized or item not found' });
    }

    res.json({ success: true, updatedId: id });
  });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.run(`DELETE FROM MenuItems WHERE id = ?`, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Menu item not found' });
    res.status(200).json({ message: 'Deleted successfully' });
  });
});

module.exports = router;