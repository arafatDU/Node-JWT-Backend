const mongoose = require("mongoose");

const userModelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
}, { timestamps: true });

const userModel = mongoose.model("User", userModelSchema);

module.exports = userModel;
