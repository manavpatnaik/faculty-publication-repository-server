const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Faculty name is required"],
    trim: true,
    minlength: [3, "Name must contain atleast 3 characters"],
    maxlength: [20, "Name must contain atmost 20 characters"],
  },
  email: {
    type: String,
    required: [true, "Faculty email is required"],
    unique: [true, "That email is already in use"],
    trim: true,
    index: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be atleast 6 characters long"],
  },
  interests: {
    type: [String],
  },
  institution: {
    type: [String],
    required: [true, "Institution name is required"],
  },
  following: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Faculty",
    default: [],
  },
  bookmarks: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Publication",
    default: [],
  },
  visibility: {
    type: String,
    enum: ["PRIVATE", "PUBLIC"],
    default: "PUBLIC",
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER"
  }
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

UserSchema.methods.getSignedJwt = async function () {
  return await jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

UserSchema.methods.matchPassword = async function (password) {
  const doesMatch = await bcrypt.compare(password, this.password);
  return doesMatch;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
