const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body.data;

  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User exists already, please login instead." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "Signed up successfully!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Signing up failed, please try again later." });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body.data;  
  try {
    // Input Validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find user by email
    const existingUser = await User.findOne({ email });

    // Check if user exists
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Validate password
    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const accessToken = jwt.sign(
      {
        UserInfo: {
          _id: existingUser._id,
          name: existingUser.name,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
      {
        UserInfo: {
          _id: existingUser._id,
          name: existingUser.name,
        },
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // Clear existing user cookies (optional)
    if (req.cookies[existingUser._id]) {
      res.clearCookie(String(existingUser._id));
    }

    // Set JWT token in a cookie
    res.cookie("jwt", refreshToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Success response
    res.status(200).json({
      message: "Logged in successfully!",
      user: existingUser,
      accessToken,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Logging in failed, please try again later." });
  }
};

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid token provided" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid Access Token." });
    }
    req.user = decoded;
    next();
  });
};

exports.getUser = async (req, res, next) => {
  const userId = req.params.id;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }

  try {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.getRefreshToken = (req, res, next) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.status(400).json({ message: "Unauthorized! Please Login" });
  }

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Forbidden! Invalied refresh token provided." });
      }

      const foundUser = await User.findById(decoded.UserInfo._id);

      if (!foundUser) {
        return res.status(404).json({
          message: "Unauthorized! you don't have access to this content.",
        });
      }

      const accessToken = jwt.sign(
        {
          UserInfo: {
            _id: foundUser._id,
            name: foundUser.name,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      res.json({ accessToken });
    }
  );
};

exports.logout = (req, res, next) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    // If no token is found, return 204 (No Content)
    return res.sendStatus(204);
  }

  res.clearCookie("jwt", { httpOnly: true, sameSite: "lax" });
  res.json({ message: "Logged out successfully" });
};

exports.getAllUsers = async (req, res, next) => {
  try {
    // Find all users and sort them by email
    const users = await User.find().sort("email");

    // Check if users are found
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    // Return the users
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);

    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
