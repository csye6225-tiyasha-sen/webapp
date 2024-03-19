import winston from "winston";

const { combine, timestamp, label, json } = winston.format;
const CATEGORY = "logger";

const logger = winston.createLogger({
  level: "debug",
  format: combine(
    label({ label: CATEGORY }),
    timestamp({
      format: "YYYY-MM-DDTHH:mm:ss.SSSZ",
    }),
    json()
  ),
  transports: [
    new winston.transports.File({
      filename: "/var/log/webapp/myapp.log",
    }),
    new winston.transports.Console(),
  ],
});

export default logger;
