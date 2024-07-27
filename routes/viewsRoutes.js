import express from "express";
import { jwtVerifyToken } from "../middlewares/jwtMiddleware.js";
import {
  adminPage,
  registerPage,
  loginPage,
} from "../controllers/viewsControllers.js";

const viewsRouter = express.Router();

//views
viewsRouter.get("/login", loginPage);
viewsRouter.get("/register", registerPage);
viewsRouter.get("/admin", jwtVerifyToken, adminPage);

export default viewsRouter;
