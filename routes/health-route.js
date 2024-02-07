import express, { Router } from "express";
const router = express.Router();
import * as healthController from "../controllers/health-controller.js";

router.route("/healthz").get(healthController.health.checkDatabaseConnection);

export default router;
