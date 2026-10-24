import "dotenv/config";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import uploadRoutes from "./routes/upload.routes.js";

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || "threadbase_secret";

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const users = [{ userId: 1, username: "ada", password: "password" }];
app.post("/auth/login", (req, res) => {
  const user = users.find(u => u.username === req.body.username && u.password === req.body.password);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  return res.json({ token: jwt.sign({ userId: user.userId }, JWT_SECRET, { expiresIn: "8h" }) });
});

app.use("/api", uploadRoutes);
app.use((err, req, res, next) => res.status(400).json({ error: err.message || "Upload failed" }));
app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
