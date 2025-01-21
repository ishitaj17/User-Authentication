const app = require("./app"); // Import the app from app.js

// Use the PORT from the .env file or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
