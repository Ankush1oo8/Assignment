const mongoose = require("mongoose");
const User = require("../models/User");

mongoose.connect("mongodb://localhost:27017/usersDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const demoUsers = [
  { name: "John Doe", email: "john@example.com", age: 28 },
  { name: "Jane Smith", email: "jane@example.com", age: 24 },
  { name: "Mike Johnson", email: "mike@example.com", age: 30 },
];

const seedDatabase = async () => {
  try {
    await User.deleteMany({});
    await User.insertMany(demoUsers);
    console.log("Database initialized with demo data.");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDatabase();
