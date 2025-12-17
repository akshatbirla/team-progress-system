const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();

// ================== MIDDLEWARE ==================
app.use(cors());
app.use(express.json());

// ================== MODELS ==================
const User = require("./models/User");
const Task = require("./models/Task");

// ================== AUTH MIDDLEWARE ==================
const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// ================== TEST ROUTE ==================
app.get("/", (req, res) => {
  res.send("Team Progress API running 🚀");
});

// ================== AUTH ROUTES ==================

// REGISTER
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    return res.json({
      message: "User registered successfully",
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Registration failed" });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Login failed" });
  }
});

// ================== TASK ROUTES (PROTECTED) ==================

// GET TASKS
app.get("/tasks", auth, async (req, res) => {
  try {
    const tasks = await Task.find();
    return res.json(tasks);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to fetch tasks" });
  }
});

// CREATE TASK
app.post("/tasks", auth, async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    return res.json(task);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to create task" });
  }
});

// UPDATE TASK
app.put("/tasks/:id", auth, async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.json(updatedTask);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to update task" });
  }
});

// DELETE TASK
app.delete("/tasks/:id", auth, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    return res.json({
      message: "Task deleted successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to delete task" });
  }
});

// ================== DB CONNECT ==================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((err) => console.log(err));
