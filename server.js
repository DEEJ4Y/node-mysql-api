require("dotenv").config();
const express = require("express");
const db = require("./loaders/db");
const initRoutes = require("./loaders/routes");

const app = express();

// Connect to database and initialize tables
db.connectDB();
db.initTables();

// Parse JSON body requests
app.use(express.json());

// Initialize routes
initRoutes(app);

// Fallback response
app.use("*", (req, res) => {
  res.status(200).json({
    success: false,
    message: "Server is up and running. Check your endpoint.",
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}.`));
