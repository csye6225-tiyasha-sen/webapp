import express, { Router } from "express";
const router = express.Router();
import * as healthController from "../controllers/health-controller.js";

router.get("/", healthController.health.checkDatabaseConnection);

export default router;
