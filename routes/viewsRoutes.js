import express from "express";
import passport from "passport";
import { login, register } from "../controllers/AuthControllers.js";
import {
  adminPage,
  registerPage,
  loginPage,
} from "../controllers/viewsControllers.js";

const viewsRouter = express.Router();

viewsRouter.post(
  "/connect",
  passport.authenticate("local", { failureRedirect: "/login" }),
  login
);
viewsRouter.post("/register", register);

viewsRouter.get("/login", loginPage);
viewsRouter.get("/register", registerPage);
viewsRouter.get("/admin", adminPage);

export default viewsRouter;
