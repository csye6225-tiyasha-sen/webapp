import express, { Router } from "express";
const userRouter = express.Router();
import { checkDbConn } from "../middleware/middleware.js";

import { authorization } from "../middleware/authorization.js";

import {
  userCreate,
  userGetByUsername,
  userUpdateByUsername,
} from "../controllers/user-controller.js";

userRouter.post("/user", checkDbConn, userCreate);

userRouter.get("/user/self", checkDbConn, authorization, userGetByUsername);

userRouter.put("/user/self", checkDbConn, authorization, userUpdateByUsername);

export default userRouter;
