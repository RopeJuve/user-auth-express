import bcrypt from "bcrypt";
import User from "../models/User.model.js";

export const login = async (req, res) => {
  res.redirect("/admin");
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
    });
    await user.save();
    res.redirect("/login");
  } catch (error) {
    console.log(error);
    res.redirect("/register");
  }
};
