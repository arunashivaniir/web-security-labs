const express = require("express");
const { notes } = require("../db");
const { authMiddleware } = require("../auth");
const vuln = require("../vuln.config");

const router = express.Router();

// Create note (belongs to logged-in user)
router.post("/", authMiddleware, (req, res) => {
  const { content } = req.body;
  const note = {
    id: notes.length + 1,
    userId: req.user.id,
    content
  };
  notes.push(note);
  res.json({ message: "Note created", note });
});

// Get notes of a user
router.get("/:userId", authMiddleware, (req, res) => {
  const requestedUserId = parseInt(req.params.userId);

  // Vulnerable behavior: no ownership check
  if (!vuln.IDOR_ENABLED) {
    if (requestedUserId !== req.user.id) {
      return res.status(403).json({ error: "Forbidden" });
    }
  }

  const userNotes = notes.filter(n => n.userId === requestedUserId);
  res.json({ notes: userNotes });
});

module.exports = router;
