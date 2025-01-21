const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Question = require("../models/Question");

exports.register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, phone });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const JWT_SECRET = process.env.JWT_SECRET;

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("JWT Library Imported:", jwt);
    console.log("JWT_SECRET in login:", process.env.JWT_SECRET);
    console.log("JWT_SECRET Used:", process.env.JWT_SECRET);

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    console.log("User ID:", user._id, "User Role:", user.role);

    const token = jwt.sign(
      { id: user._id, role: user.role }, // Payload
      "mysecretkey", // Hardcoded Secret Key
      { expiresIn: "1d" } // Options (expiration)
    );

    // const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    //   expiresIn: "1d",
    // });

    //   res.json({ token });
    // } catch (error) {
    //   res.status(500).json({ message: "Server error", error });
    // }
    return res.status(200).json({ token });
  } catch (error) {
    console.error("Login Error:", error.message); // Log the exact error
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone },
      { new: true }
    ).select("-password");
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
exports.deactivateUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { isActive: false });
    res.json({ message: "Account deactivated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.addQuestion = async (req, res) => {
  try {
    const { text, options, correctAnswer } = req.body;

    const question = new Question({ text, options, correctAnswer });
    await question.save();

    res.status(201).json({ message: "Question added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
exports.getQuestions = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const questions = await Question.find({
      _id: { $nin: user.answeredQuestions },
    }).limit(10);

    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
