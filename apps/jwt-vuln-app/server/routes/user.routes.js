const express = require("express");
const { authMiddleware } = require("../auth");

const router = express.Router();

router.get("/whoami", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
