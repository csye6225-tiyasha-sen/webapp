import express, { Router } from "express";
const userRouter = express.Router();

import { authorization } from "../middleware/authorization.js";

import {
  userCreate,
  userGetByUsername,
  userUpdateByUsername,
} from "../controllers/user-controller.js";

userRouter.post("/user", userCreate);

userRouter.get("/user/self", authorization, userGetByUsername);

userRouter.put("/user/self", authorization, userUpdateByUsername);

export default userRouter;
