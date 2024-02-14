import mongoose from "mongoose";
import bcrypt from "bcrypt";
// import createError from "../utils/createError.js";
import jwt from "jsonwebtoken";
import User from "../mongoDB/Models/user.model.js";

export const registerController = async (req, res, next) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) {
      return res.status(500).send("all fields must be filled");
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(500).send("user already exists");
    }
    const hash = bcrypt.hashSync(password, 10);

    const usersData = await User.create({
      name,
      email,
      mobile,
      password: hash,
    });
    res.status(200).send("user has been created");
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(500).send("user not found");
    }

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect)
      return res.status(400).send("incorrect username or password");

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
      },
      process.env.JWT_SECRET
    );

    const { password, ...info } = user._doc;

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(info);
  } catch (error) {
    next(error);
  }
};

export const logoutController = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("user has been logged out");
};
