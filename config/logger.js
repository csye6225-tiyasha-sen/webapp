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
  transports: [],
});
if (process.env.ENV_DEV === "dev") {
  logger.add(new transports.Console());
} else {
  logger.add(
    new transports.File({
      filename: "/var/log/webapp/myapp.log",
    })
  );
}
export default logger;
