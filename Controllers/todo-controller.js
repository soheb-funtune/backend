const Todo = require("../Models/todo-schema");

// Create a new todo

exports.createPost = async function (req, res) {
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
};

// Get all todos
exports.getAllPosts = async function (req, res) {
  const todos = await Todo.find();
  res.send(todos);
};

// Get a specific todo by id
exports.getSinglePost = async function (req, res) {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo)
      return res.status(404).send("The todo with the given ID was not found.");
    res.send(todo);
  } catch (err) {
    res.status(400).send("Invalid ID");
  }
};

// Update a todo by id
exports.updatePost = async function (req, res) {
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
};

// Delete a todo by id
exports.deletePost = async function (req, res) {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    // if (!todo)
    return res.status(200).send("Item is Deleted Successfully");
    // res.send(todo);
  } catch (err) {
    res.status(400).send("Invalid ID");
  }
};
