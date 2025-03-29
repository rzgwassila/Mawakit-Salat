//         IMPORTS
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

//      ENVIRONMENT SETUP
dotenv.config(); // Load environment variables from .env file into process.env

//      EXPRESS APP SETUP
const app = express(); // Create Express application instance
const PORT = process.env.PORT || 5000; // Get port from .env or default to 5000

//       MIDDLEWARE
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // For parsing JSON request bodies

//       API ROUTES
app.get("/api/prayer-times", async (req, res) => {
  try {
    const { city, country } = req.query;

    // Get today's date in DD-MM-YYYY format
    const today = new Date();
    const date = `${today.getDate()}-${
      today.getMonth() + 1
    }-${today.getFullYear()}`;

    const response = await axios.get(
      `http://api.aladhan.com/v1/timingsByCity/${date}`,
      {
        params: {
          city: city,
          country: country,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching prayer times:", error);
    res.status(500).json({ error: "Failed to fetch prayer times" });
  }
});

//      SERVER STARTUP
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
