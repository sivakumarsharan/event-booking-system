const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateToken = require("../middlewares/validateToken");

//User Registration
router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).json({ message: "User Already Exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    await User.create(req.body);
    return res.status(200).json({ message: "User Registered Successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//User Login
router.post("/login", async (req, res) => {
  try {
    //check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }
    //check password is correct
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password,
    );
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    //create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);
    
    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    
    return res.status(200).json({ token, message: "Login Successfull" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//User Logout
router.post("/logout", (req, res) => {
  try {
    // Clear the cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    
    return res.status(200).json({ message: "Logout Successful" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//Get Current User
router.get("/current-user", validateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    return res
      .status(200)
      .json({ data: user, message: "User Fetched Successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Get All Users (Admin only)
router.get("/get-all-users", validateToken, async (req, res) => {
  try {
    // Optional: Add admin check
    // if (!req.user.isAdmin) {
    //   return res.status(403).json({ message: "Access denied. Admin only." });
    // }

    const users = await User.find()
      .select("-password") // Exclude password field
      .sort({ createdAt: -1 }); // Latest users first

    return res.status(200).json({ 
      data: users,
      message: "Users fetched successfully" 
    });
  } catch (error) {
    console.error("Get all users error:", error);
    return res.status(500).json({ message: error.message });
  }
});

// Update User (Admin only)
router.put("/update-user/:id", validateToken, async (req, res) => {
  try {
    const { name, email, isAdmin } = req.body;
    
    // Don't allow password update through this endpoint
    const updateData = { name, email, isAdmin };
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ 
      data: user,
      message: "User updated successfully" 
    });
  } catch (error) {
    console.error("Update user error:", error);
    return res.status(500).json({ message: error.message });
  }
});

// Delete User (Admin only)
router.delete("/delete-user/:id", validateToken, async (req, res) => {
  try {
    // Prevent admin from deleting themselves
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ message: "You cannot delete your own account" });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;