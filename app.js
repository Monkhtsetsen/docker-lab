const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const PORT = 3000;

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "dockerlab",
  password: process.env.DB_PASSWORD || "dockerlab_password",
  database: process.env.DB_NAME || "dockerlab_db",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
});

app.get("/", (req, res) => {
  res.send(`
    <h1>Hello Docker!</h1>
    <p>My first Dockerized Node.js application.</p>
    <p>Container is running successfully!</p>
    <p>Database: MySQL</p>
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
    const [rows] = await pool.query("SELECT NOW() AS db_time");

    res.json({
      database: "Connected",
      type: "MySQL",
      time: rows[0].db_time,
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
