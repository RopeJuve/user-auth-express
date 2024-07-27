import express from "express";
import passport from "passport";
import { login, logout, register } from "../controllers/AuthControllers.js";
import { jwtSingToken, jwtVerifyToken } from "../middlewares/jwtMiddleware.js";
import {
  adminPage,
  registerPage,
  loginPage,
} from "../controllers/viewsControllers.js";

const viewsRouter = express.Router();

viewsRouter.post(
  "/connect",
  passport.authenticate("local", { failureRedirect: "/login" }),
  jwtSingToken,
  login
);
viewsRouter.post("/register", register);
viewsRouter.post("/logout", logout);

viewsRouter.get("/login", loginPage);
viewsRouter.get("/register", registerPage);
viewsRouter.get("/admin",jwtVerifyToken, adminPage);

export default viewsRouter;
