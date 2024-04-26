const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

exports.signUp = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    mobile: req.body.mobile,
    password: hashPassword,
    role: req.body.role,
  });
  await newUser.save();
  return res.status(201).json({
    status: "success",
    message: "User Creation Success",
  });
};

exports.signIn = async (req, res) => {
  try {
    let username = await User.findOne({ email: req.body.email });
    if (!username) {
      return res.status(404).json({
        status: "fail",
        message: "User not found.",
      });
    }
    const isCheckPassword = await bcrypt.compare(
      req.body.password,
      username.password
    );
    if (!isCheckPassword) {
      return res.status(404).json({
        status: "fail",
        message: "Password incorrect!.",
      });
    }

    const token = jwt.sign({
      id: username.id,
      username:username.username,
      role: username.role,
      email: username.email,
      isEmail: username.isEmail,
      isActive: username.isActive,
    }, 
    process.env.JWT_TOKEN);

    return res.cookie("access_token", token, { httpOnly: true }).status(200).json({
      status: 200,
      message: "Login Success :)",
      data: token,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'fail',
      message: 'Login faild!!',
      error: error
    })
  }
};

exports.forgotPwd = async (req, res) => {};
exports.resetPwd = async (req, res) => {};

