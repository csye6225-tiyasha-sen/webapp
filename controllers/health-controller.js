import db from "../config/dbConfig.js";
import logger from "../config/logger.js";
//const logger = new Logger();

export const health = {
  async checkDatabaseConnection(req, res) {
    res.header("Cache-Control", "no-cache");
    if (
      req.headers["content-length"] > 0 ||
      Object.keys(req.query).length != 0 ||
      (res.headers && res.headers["content-length"] > 0)
    ) {
      logger.error("Please provide a valid format!");
      return res.status(400).end();
    }
    try {
      await db.sequelize.authenticate();
      logger.info("Database authenticated!");
      res.status(200).end();
    } catch (error) {
      logger.error("Error in connecting database!");
      res.status(503).end();
      //console.error(`errors: ${error}`);
    }
  },
};
