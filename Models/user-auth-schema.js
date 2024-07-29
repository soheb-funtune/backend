const mongoose = require("mongoose");

// Create a schema and model for users
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("UserAuth", userSchema);
