// mongodb+srv://Soheb:soheb1999@cluster0.cbtaqjr.mongodb.net/academix-blog?retryWrites=true&w=majority

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 8000;

const userRoutes = require("./Routes/users");
const todoRoutes = require("./Routes/todo");
const authMiddleware = require("./Middlewares/auth-middleware");

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  // mongodb+srv://<username>:<password>@cluster0.cbtaqjr.mongodb.net/<dbname>?retryWrites=true&w=majority
  .connect(
    process.env.MONGO_URL ||
      "mongodb+srv://soheb:soheb1999@cluster0.cbtaqjr.mongodb.net/academix-blog?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use("/user", userRoutes);
app.use("/api", authMiddleware, todoRoutes);

app.listen(port, () => {
  console.log(`Todo app listening at http://localhost:${port}`);
});
