import winston from "winston";

const { combine, timestamp, label, printf } = winston.format;
const CATEGORY = "logger";

const customFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: "debug",
  format: combine(
    label({ label: CATEGORY }),
    timestamp({
      format: "YYYY-MM-DDTHH:mm:ss.SSSZ",
    }),
    customFormat
  ),
  transports: [
    new winston.transports.File({
      filename: "/var/log/webapp/myapp.log",
    }),
    new winston.transports.Console(),
  ],
});

export default logger;
