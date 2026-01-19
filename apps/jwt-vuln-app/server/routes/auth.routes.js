const express = require("express");
const bcrypt = require("bcrypt");
const { users } = require("../db");
const { signToken } = require("../auth");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Missing fields" });

  const exists = users.find(u => u.email === email);
  if (exists) return res.status(409).json({ error: "User exists" });

  const hash = await bcrypt.hash(password, 10);
  const newUser = {
    id: users.length + 1,
    email,
    passwordHash: hash,
    role: "user"
  };
  users.push(newUser);

  res.json({ message: "Registered", id: newUser.id });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const token = signToken({ id: user.id, email: user.email, role: user.role });
  res.json({ message: "Logged in", token });
});

module.exports = router;
