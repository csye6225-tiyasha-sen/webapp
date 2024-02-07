import express, { Router } from "express";
const router = express.Router();
import * as healthController from "../controllers/health-controller.js";

router.route("/healthz").get(healthController.health.checkDatabaseConnection);

router.all("/healthz", (req, res) => {
  if (req.method != "GET") res.status(405).end();
});

export default router;
