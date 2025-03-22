const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./db/db"); // Import DB connection
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(bodyParser.json());
app.use("/users", userRoutes);

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
