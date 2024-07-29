const route = require("express").Router();
const USER = require("../Models/user-auth-schema");
const auth = require("../Middlewares/auth-middleware");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//=======================createUser====================

exports.createUser = async function (req, res, next) {
  try {
    if (!req.body.username || !req.body.password) {
      throw new Error("Please Enter Valid Field");
    }
    req.body.password = await bcrypt.hash(req.body.password, 10);
    // console.log(req.body);
    const data = await USER.create(req.body);
    res.status(201).json({
      data: { status: "Successful", message: "User SucessFully Added", data },
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

//=======================login====================

exports.loginUser = async function (req, res, next) {
  console.log("reqBody", req.body);
  try {
    const checkUser = await USER.findOne({ username: req.body.username });

    if (!checkUser) {
      throw new Error("User not found");
    }
    console.log("req?.body:", req?.body);
    const checkPass = await bcrypt.compare(
      req.body.password,
      checkUser.password,
      (err, result) => {
        if (err) {
          throw new Error(err || "Password is Wrong");
        }
      }
    );

    var token = jwt.sign(
      { id: checkUser._id },
      process.env.JWT_PRIVATE_KEY ||
        `my-32-character-ultra-secure-and-ultra-long-secret`
    );

    res.status(200).json({
      data: {
        status: "Successful",
        message: "Login SucessFully",
        _id: checkUser?._id,
        token,
        username: checkUser?.username,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};
