import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const jwtSingToken = (req, res, next) => {
  const { user } = req;
  if (!user) return res.status(401).redirect("/login");

  try {
    const token = jwt.sign(
      {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
      process.env.SECRET,
      { expiresIn: "1h" }
    );
    res.cookie("token", token,);
    next();
  } catch (error) {
    console.log(error);
  }
};

export const jwtVerifyToken = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).redirect("/login");

  try {
    const user = jwt.verify(token, process.env.SECRET);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).redirect("/login");
  }
};
