const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticateToken = require('../authenticateToken');

// POST /api/orders
router.post('/', (req, res) => {
  const { account_number, restaurant_id, items } = req.body;


  if (!account_number || !restaurant_id || !items) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  // Compute total cost and time (example logic)
  const itemIds = items.map(i => i.id);
  const placeholders = itemIds.map(() => '?').join(',');
  db.all(`SELECT id, price, prep_time FROM MenuItems WHERE id IN (${placeholders})`, itemIds, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    let total_cost = 0;
    let total_time = 0;
    rows.forEach(row => {
      const qty = items.find(i => i.id === row.id)?.quantity || 1;
      total_cost += row.price * qty;
      total_time += row.prep_time * qty;
    });

    const itemsText = items.map(i => `${i.id}:${i.quantity}`).join(',');
    console.log('Login response:', res.data);

    db.run(
      `INSERT INTO Orders (account_number, restaurant_id, items, total_cost, total_time)
       VALUES (?, ?, ?, ?, ?)`,
      [account_number, restaurant_id, itemsText, total_cost, total_time],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, order_id: this.lastID });
      }
    );
  });
});

module.exports = router;
