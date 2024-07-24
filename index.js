// mongodb+srv://Soheb:soheb1999@cluster0.cbtaqjr.mongodb.net/academix-blog?retryWrites=true&w=majority

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  // mongodb+srv://<username>:<password>@cluster0.cbtaqjr.mongodb.net/<dbname>?retryWrites=true&w=majority
  .connect(
    "mongodb+srv://soheb:soheb1999@cluster0.cbtaqjr.mongodb.net/academix-blog?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// Create a schema and model for todos
const todoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  completed: { type: Boolean, default: false },
  username: { type: String, required: true },
  email: { type: String, required: true },
});

const Todo = mongoose.model("Todo", todoSchema);

// Create a new todo
app.post("/todos", async (req, res) => {
  const todo = new Todo({
    task: req.body.task,
    completed: req.body.completed,
    username: req.body.username,
    email: req.body.email,
  });

  try {
    const result = await todo.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Get all todos
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.send(todos);
});

// Get a specific todo by id
app.get("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo)
      return res.status(404).send("The todo with the given ID was not found.");
    res.send(todo);
  } catch (err) {
    res.status(400).send("Invalid ID");
  }
});

// Update a todo by id
app.put("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        task: req.body.task,
        completed: req.body.completed,
        username: req.body.username,
        email: req.body.email,
      },
      { new: true, runValidators: true }
    );

    if (!todo)
      return res.status(404).send("The todo with the given ID was not found.");
    res.send(todo);
  } catch (err) {
    res.status(400).send("Invalid ID");
  }
});

// Delete a todo by id
app.delete("/todos/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    // if (!todo)
    return res.status(200).send("Item is Deleted Successfully");
    // res.send(todo);
  } catch (err) {
    res.status(400).send("Invalid ID");
  }
});

app.listen(port, () => {
  console.log(`Todo app listening at http://localhost:${port}`);
});
