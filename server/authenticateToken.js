const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your-super-secret-key'; // Should match exactly what you used to sign the token

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

jwt.verify(token, JWT_SECRET, (err, user) => {
  if (err) {
    console.error("JWT verification error:", err);
    return res.sendStatus(403); // Forbidden
  }
  console.log("🔓 Decoded JWT payload:", user);
  req.user = user;
  next();
});
}

module.exports = authenticateToken;
