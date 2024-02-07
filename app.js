import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/health-route.js";
import dotenv from "dotenv";
import { checkRoutes } from "./middleware/middleware.js";
import userRoutes from "./routes/user-routes.js";
import { checkReqMethods } from "./middleware/middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(checkRoutes);
app.use("/v1", userRoutes);

app.use("/healthz", checkReqMethods, routes);
dotenv.config();

export default app;
