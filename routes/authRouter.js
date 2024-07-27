import express from "express";
import passport from "passport";
import { login, logout, register } from "../controllers/AuthControllers.js";
import { jwtSingToken } from "../middlewares/jwtMiddleware.js";

const authRouter = express.Router();

authRouter.post(
  "/connect",
  passport.authenticate("local", { failureRedirect: "/login" }),
  jwtSingToken,
  login
);
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
  login
);

export default authRouter;
