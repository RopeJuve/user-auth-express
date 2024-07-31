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
    res.setHeader("Authorization", `Bearer ${token}`);
    req.token = token;
    next();
  } catch (error) {
    console.log(error);
  }
};

export const jwtVerifyToken = (req, res, next) => {
 
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  const token = authHeader.split(' ')[1];
  try {
    const user = jwt.verify(token, process.env.SECRET);
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).redirect("/login");
  }
};
