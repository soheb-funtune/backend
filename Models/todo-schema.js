const mongoose = require("mongoose");

// Create a schema and model for todos
const todoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  completed: { type: Boolean, default: false },
  username: { type: String, required: true },
  email: { type: String, required: true },
});
module.exports = mongoose.model("Todo", todoSchema);
