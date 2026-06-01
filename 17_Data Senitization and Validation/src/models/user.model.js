const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minLength: 3,
      maxLength: 50,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      minLength: 3,
      maxLength: 50,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      min: 14,
      max: 70,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default: "This is a default URL",
    },
  },
  { timestamps: true },
);

// getJWT
userSchema.methods.getJWT = function () {
  const ans = jwt.sign(
    { _id: this._id, email: this.email },
    process.env.JWT_KEY,
    {
      expiresIn: "1d",
    },
  );
  return ans;
};

// verify password
userSchema.methods.verifyPassword = async function (userPassword) {
  const ans = await bcrypt.compare(userPassword, this.password);
  return ans;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
