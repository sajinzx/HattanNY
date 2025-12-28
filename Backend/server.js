const express = require("express");
const cors = require("cors");

const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();
const PORT = 3000;

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api", dashboardRoutes);

// health check
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
