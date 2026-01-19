const express = require("express");
const { users, notes } = require("../db");
const { authMiddleware } = require("../auth");
const vuln = require("../vuln.config");

const router = express.Router();

router.get("/dashboard", authMiddleware, (req, res) => {
  if (!vuln.ADMIN_CHECK_MISSING) {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Admins only" });
    }
  }

  res.json({
    message: "Admin dashboard",
    usersCount: users.length,
    notesCount: notes.length,
    sampleUsers: users.map(u => ({ id: u.id, email: u.email, role: u.role }))
  });
});

module.exports = router;
