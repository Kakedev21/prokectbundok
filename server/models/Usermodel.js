const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username Required"],
      unique: [true, "username already used"],
    },
    email: {
      type: String,
      required: [true, "Email Required"],
      unique: [true, "Email already used"],
    },
    password: {
      type: String,
      required: [true, "Email Required"],
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
