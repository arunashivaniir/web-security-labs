const jwt = require("jsonwebtoken");
const vuln = require("./vuln.config");

const SECRET = vuln.WEAK_JWT_SECRET ? "12345" : "super_strong_secret_change_me";

function signToken(payload) {
  // if NO_TOKEN_EXPIRY enabled, no exp
  const options = vuln.NO_TOKEN_EXPIRY ? {} : { expiresIn: "15m" };
  return jwt.sign(payload, SECRET, options);
}

function authMiddleware(req, res, next) {
  let token = null;

  // Normal: Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  // Vulnerable: allow token in query string
  if (!token && vuln.JWT_IN_QUERY_ALLOWED && req.query.token) {
    token = req.query.token;
  }

  if (!token) {
    return res.status(401).json({ error: "Missing token" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = { signToken, authMiddleware };
