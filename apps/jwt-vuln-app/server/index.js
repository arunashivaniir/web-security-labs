const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const notesRoutes = require("./routes/notes.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "JWT CTF Lab running" });
});

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/notes", notesRoutes);
app.use("/admin", adminRoutes);

app.listen(3001, () => console.log("Server running on http://localhost:3001"));
