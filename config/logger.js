import winston from "winston";
import { createLogger, format, transports } from "winston";
import appRoot from "app-root-path";

const { combine, timestamp, label, printf } = format;
const CATEGORY = "logger";

const customFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  level: "info",
  format: combine(
    label({ label: CATEGORY }),
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    customFormat
  ),
  transports: [
    new winston.transports.File({
      filename: "/var/log/webapp/myapp.log",
    }),
    new transports.Console(),
  ],
});

export default logger;
