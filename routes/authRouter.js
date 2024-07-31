import express from "express";
import passport from "passport";
import { login, loginWithToken, logout, register } from "../controllers/AuthControllers.js";
import { jwtSingToken, jwtVerifyToken } from "../middlewares/jwtMiddleware.js";

const authRouter = express.Router();

authRouter.get("/", (req, res) => {
  res.send("Welcome to the Login App");
})


authRouter.post(
  "/connect",
  passport.authenticate("local", { failureMessage: true }),
  jwtSingToken,
  login
);
authRouter.get('/auth/user', jwtVerifyToken, loginWithToken)
authRouter.post("/register", register);
authRouter.post("/logout", logout);

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  jwtSingToken,
  jwtVerifyToken,
  loginWithToken
);

export default authRouter;
