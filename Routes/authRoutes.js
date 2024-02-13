import express from "express";
const router = express.Router();
import {
  registerController,
  loginController,
} from "../Controllers/authControllers";

router.post("/register", registerController);
// router.post("/login", loginController);

module.exports = router;
