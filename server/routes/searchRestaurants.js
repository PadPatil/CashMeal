const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  let { dietary = '', budget = 9999, time = 9999 } = req.query;

  const budgetNum = parseFloat(budget);
  const timeNum = parseInt(time);

  const requestedRestrictions = dietary
    .split(',')
    .map(r => r.trim().toLowerCase())
    .filter(Boolean);

  const sql = `
    SELECT Restaurants.id AS restaurant_id, Restaurants.name AS restaurant_name,
           MenuItems.id AS item_id, MenuItems.name AS item_name,
           MenuItems.price, MenuItems.prep_time, MenuItems.restrictions
    FROM Restaurants
    JOIN MenuItems ON MenuItems.restaurant_id = Restaurants.id
    WHERE MenuItems.price <= ? AND MenuItems.prep_time <= ?
  `;

  db.all(sql, [budgetNum, timeNum], (err, rows) => {
    if (err) {
      console.error("❌ SQL Error:", err.message);
      return res.status(500).json({ error: err.message });
    }

    const restaurantMap = {};

    rows.forEach(row => {
      const itemRestrictions = row.restrictions
        ? row.restrictions.toLowerCase().split(',').map(r => r.trim())
        : [];

      const matchesAll = requestedRestrictions.every(r => itemRestrictions.includes(r));

      if (!matchesAll) return;

      if (!restaurantMap[row.restaurant_id]) {
        restaurantMap[row.restaurant_id] = {
          id: row.restaurant_id,
          name: row.restaurant_name,
          menu: []
        };
      }

      restaurantMap[row.restaurant_id].menu.push({
        id: row.item_id,
        name: row.item_name,
        price: row.price,
        prep_time: row.prep_time,
        restrictions: row.restrictions
      });
    });

    const results = Object.values(restaurantMap);
    res.json(results);
  });
});

module.exports = router;
