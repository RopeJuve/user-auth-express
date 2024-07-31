import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import bodyParser from "body-parser";
import authRouter from "./routes/authRouter.js";
import cors from "cors";
import "./strategies/passport.js";

dotenv.config();
const PORT = process.env.PORT || 8080;

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    exposedHeaders: ['authorization'],
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to the Login App");
});
app.use("/api", authRouter);

app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });
