const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  phone: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  isActive: { type: Boolean, default: true },
  answeredQuestions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  ],
});

module.exports = mongoose.model("User", userSchema);
