import express from "express";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import mongoose from "mongoose";
import { registerValidator } from "./validations/auth.js";
import { validationResult } from "express-validator";

import UserModel from "./models/user.js";

mongoose
  .connect(
    "mongodb+srv://ermonindima:dimka228@cluster0.jntabwu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("connected to db"))
  .catch((err) => console.log("db error", err));

const app = express();

app.use(express.json());

app.post("/auth/register", registerValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }


  const password = req.body.password;

  const salt = await bcryptjs.genSalt(10);
  const passwordHash = await bcryptjs.hash(password, salt);

  const doc = new UserModel({
    email: req.body.email,
    fullname: req.body.fullName,
    avatarUrl: req.body.avatarUrl,
    passwordHash,
  });

  const user = await doc.save();


  res.json(user);
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server is running on port 4444");
});
