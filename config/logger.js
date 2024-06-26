import winston from "winston";
import dotenv from "dotenv";

dotenv.config();

const { combine, timestamp, label, json } = winston.format;
const CATEGORY = "logger";

const logger = winston.createLogger({
  level: "debug",
  format: combine(label({ label: CATEGORY }), timestamp(), json()),
  transports: [],
});
if (process.env.ENV_DEV === "dev") {
  logger.add(new winston.transports.Console());
} else {
  logger.add(
    new winston.transports.File({
      filename: "/var/log/webapp/myapp.log",
    })
  );
}
export default logger;
