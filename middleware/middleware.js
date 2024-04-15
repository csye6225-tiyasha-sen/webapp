//const routesAllowed = ["/healthz", "/v1/user", "/v1/user/self"];
import db from "../config/dbConfig.js";

const routesAllowed = {
  "/healthz": ["GET"],
  "/v2/user": ["POST"],
  "/v2/user/self": ["PUT", "GET"],
  "/verifyUser": ["GET"],
};

export const checkReqMethods = (req, res, next) => {
  //console.log(`${req.method}`);
  if (req.method === "GET") {
    next();
  } else {
    return res.status(405).send();
  }
};

export const checkReqMethodsForUser = (req, res, next) => {
  //console.log(`${req.method}`);
  const allowedMethods = routesAllowed[req.path];
  console.log(`Request path: ${req.path}`);

  if (!allowedMethods) {
    console.log(`Request method: ${req.method}`);
    return res.status(404).send();
  }

  if (!allowedMethods.includes(req.method)) {
    return res.status(405).send();
  }

  return next();
};

export const checkDbConn = async (req, res, next) => {
  try {
    await db.sequelize.authenticate();
    next();
  } catch (err) {
    return res.status(503).send();
  }
};
