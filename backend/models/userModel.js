const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const model = mongoose.model;

const userSchema = new Schema({
  // Name of the user (faculty or student or admin)
  name: {
    type: String,
    required: true,
  },
  // Email of the user
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // Password of the user
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  // Timestamp of user creation
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("User", userSchema);