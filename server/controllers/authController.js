import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });
    if (password.length < 6)
      return res.status(400).json({ message: "Password must be at least 6 characters" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already registered" });

    const user = await User.create({ name, email, password });
    res.status(201).json({
      token: generateToken(user._id),
      user: { _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin, avatar: user.avatar },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    if (user.googleId && !user.password)
      return res.status(401).json({ message: "This account uses Google Sign-In. Please login with Google." });

    if (!(await user.matchPassword(password)))
      return res.status(401).json({ message: "Invalid email or password" });

    res.json({
      token: generateToken(user._id),
      user: { _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin, avatar: user.avatar },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const googleAuth = async (req, res) => {
  const { googleUser } = req.body;
  try {
    if (!googleUser?.email)
      return res.status(400).json({ message: "Invalid Google data" });

    const { name, email, picture, sub: googleId } = googleUser;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, googleId, avatar: picture });
    } else {
      if (!user.googleId) user.googleId = googleId;
      user.avatar = picture;
      await user.save();
    }

    res.json({
      token: generateToken(user._id),
      user: { _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin, avatar: user.avatar },
    });
  } catch (err) {
    res.status(401).json({ message: "Google authentication failed: " + err.message });
  }
};
