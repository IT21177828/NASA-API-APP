const express = require("express");
const userController = require("../controllers/userController.js");

const userRoutes = express.Router();

userRoutes.get(
  "/all",
  userController.verifyToken,
  userController.getAllUsers
);
userRoutes.get("/user/:id", userController.verifyToken, userController.getUser);
userRoutes.get(
  "/refresh",
  userController.getRefreshToken,
  userController.getUser
);
userRoutes.post("/signup", userController.signup);
userRoutes.post("/login", userController.login);
userRoutes.post("/logout", userController.verifyToken, userController.logout);

module.exports = userRoutes;