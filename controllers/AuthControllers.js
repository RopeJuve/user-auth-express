import bcrypt from "bcrypt";
import User from "../models/User.model.js";

export const login = (req, res) => {
  res.status(200).json({ message: "Logged in successfully" });
};
export const loginWithToken = (req, res) => {
  const { user } = req; 
  res.status(200).json({ user});
};
export const register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      googleId: null,
    });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  req.logout();
  res.status(200).json({ message: "Logged out successfully" });
};
