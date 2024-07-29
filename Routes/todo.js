const router = require("express").Router();
const todoController = require("./../Controllers/todo-controller");
const auth = require("./../Middlewares/auth-middleware");

router.get("/todos", todoController.getAllPosts);
router.get("/todos:id", todoController.getSinglePost);
router.post("/todos", todoController.createPost);
router.put("/todos:id", todoController.updatePost);
router.delete("/todos:id", todoController.deletePost);

module.exports = router;
