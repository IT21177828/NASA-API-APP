const express = require("express");
const connectDB = require("./db/conn.js").connectDB;
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes.js");

const app = express();
const PORT = process.env.PORT || 8080;

connectDB();
exports.app = app;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: ["http://localhost:3000"] }));
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  // we need to call next in order to proceed with the application.
  next();
});

app.use("/api/v1/users", userRoutes);

app.listen(PORT, () => {
  console.log(`\nServer is running on port: ${PORT} 🔥`);
});
