const express = require('express');
const router = express.Router();
const db = require('../db'); // your SQLite or DB connection

router.get('/', (req, res) => {
  let { dietary = '', budget = 9999, time = 9999 } = req.query;

  const budgetNum = parseFloat(budget);
  const timeNum = parseInt(time);

  // Split and sanitize dietary restrictions
  const restrictions = dietary
    .split(',')
    .map(r => r.trim())
    .filter(r => r.length > 0);

  // Start building query
  let sql = `
    SELECT DISTINCT Restaurants.id, Restaurants.name
    FROM Restaurants
    JOIN MenuItems ON MenuItems.restaurant_id = Restaurants.id
    WHERE MenuItems.price <= ? AND MenuItems.prep_time <= ?
  `;

  const params = [budgetNum, timeNum];

  // Add one LIKE clause for each restriction
  restrictions.forEach(restriction => {
    sql += ` AND MenuItems.restrictions LIKE ?`;
    params.push(`%${restriction}%`);
  });

  console.log("🔍 Search SQL:", sql);
  console.log("🧪 Params:", params);

  db.all(sql, params, (err, rows) => {
    if (err) {
      console.error("❌ SQL Error:", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

module.exports = router;
