const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get("/", async (req, res) => {
  res.send(`
    <h1>Hello Docker!</h1>
    <p>My first Dockerized Node.js application.</p>
    <p>Container is running successfully!</p>
  `);
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Application is running",
  });
});

app.get("/db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      database: "Connected",
      time: result.rows[0].now,
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    res.status(500).json({
      database: "Disconnected",
      error: error.message,
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
