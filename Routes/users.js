const router = require("express").Router();
const userController = require("./../Controllers/user-controller");
const auth = require("./../Middlewares/auth-middleware");

//signup
router.post("/create-user", userController.createUser);
//login
router.post("/login-user", userController.loginUser);

module.exports = router;
