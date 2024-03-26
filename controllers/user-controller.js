import { v1 as uuidv1 } from "uuid";
import db from "../config/dbConfig.js";
//import { checkRoutes } from "./middleware/middleware.js";
import logger from "../config/logger.js";
import bcrypt from "bcrypt";
import publishMessage from "../config/pubsub.js";

const User = db.userModel;

export const userCreate = async (req, res) => {
  logger.debug("Inside user creation.");
  if (Object.keys(req.query).length != 0) {
    logger.error("The URL is not valid!");
    return res.status(400).send();
  }
  if (req.body.id || req.body.account_created || req.body.account_updated) {
    logger.error("The fields provided are not allowed!");
    return res.status(400).send();
  }
  res.header("Cache-Control", "no-cache");
  try {
    if (
      !req.body.first_name ||
      !req.body.last_name ||
      !req.body.username ||
      !req.body.password
    ) {
      return res.status(400).send();
    }

    const validateEmail =
      /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$/;
    if (!validateEmail.test(req.body.username)) {
      logger.warn("Please use a valid email");
      logger.error("Please use a valid email");
      return res.status(400).send(
        json({
          message:
            "Enter your Email ID in correct format. Example: abc@test.com",
        })
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = User.build({
      id: uuidv1(),
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: hashedPassword,
      username: req.body.username,
    });

    const userRes = await user.save();
    const userData = {
      id: userRes.id,
      first_name: userRes.first_name,
      last_name: userRes.last_name,
      username: userRes.username,
      account_created: userRes.account_created,
      account_updated: userRes.account_updated,
    };
    const token = uuidv1();
    logger.info("Token::::", token);
    const userPublish = {
      username: userRes.username,
      tokenGenerated: token,
      PSQL_DATABASE: process.env.PSQL_DATABASE,
      PSQL_USERNAME: process.env.PSQL_USERNAME,
      PSQL_PASSWORD: process.env.PSQL_PASSWORD,
      PSQL_HOSTNAME: process.env.PSQL_HOSTNAME,
    };
    await publishMessage(userPublish);
    //const userr = await User.create(info);
    logger.info("User " + userRes.username + " created successfully!");
    res.status(201).send(userData);
  } catch (err) {
    logger.error(err.message);
    res.status(400).send();
  }

  logger.debug("Exit of user creation.");
};

export const userGetByUsername = async (req, res, next) => {
  logger.debug("Inside user get functionality.");
  const userAttri = await getUsername(req.user.username);
  if (Object.keys(req.query).length != 0 || req.headers["content-length"] > 0) {
    return res.status(400).end();
  }
  if (userAttri) {
    if (!userAttri.verifiedFlag) {
      return res.status(400).send();
    }
    logger.info(
      "User " + userAttri.dataValues.username + " updated successfully!"
    );
    res.status(200).send({
      id: userAttri.dataValues.id,
      first_name: userAttri.dataValues.first_name,
      last_name: userAttri.dataValues.last_name,
      username: userAttri.dataValues.username,
      account_created: userAttri.dataValues.account_created,
      account_updated: userAttri.dataValues.account_updated,
    });
  } else {
    logger.error("The user details cannot be fetched due to wrong information");
    res.status(400).send();
  }
};

export const userUpdateByUsername = async (req, res, next) => {
  logger.debug("Inside user update funtionality.");
  if (Object.keys(req.query).length != 0) {
    return res.status(400).end();
  }
  if (!req.body.first_name || !req.body.last_name || !req.body.password) {
    logger.error("Invalid request body");
    logger.warn("Enter all the required fields!");
    return res.status(400).send({
      message: "Enter all the required fields!",
    });
  }

  try {
    const userAttri = await getUsername(req.user.username);
    if (!userAttri.verifiedFlag) {
      return res.status(400).send();
    }
    if (req.body.username) {
      logger.warn("Update of User Id is not allowed!");
      return res.status(400).send({
        message: "Update of User Id is not allowed!",
      });
    }
    if (req.body.id || req.body.account_created || req.body.account_updated) {
      return res.status(400).send();
    }

    const resultUpdate = await User.update(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: await bcrypt.hash(req.body.password, 10),
      },
      { where: { username: req.user.username } }
    );

    if (resultUpdate[0] > 0) {
      res.status(204).send();
    } else {
      res.status(400).send();
    }
  } catch (err) {
    logger.error(err.message);
    res.status(400).send();
  }
  logger.debug("Exit of user update funtionality.");
};

export const verifyToken = async (req, res) => {
  const token = req.query.tokenValue;
  try {
    //const newEmail = decoded.email;
    const userObject = await User.findOne({
      where: { tokenGenerated: token },
    });
    const tokenTime = userObject.emailSentTime;
    console.log("tokenTime", tokenTime);
    const currentTime = new Date().getTime();
    console.log("currentTime", currentTime);
    const tokenExpiry = 2 * 60 * 1000;
    const tokenExpirationTime = new Date(tokenTime.getTime() + tokenExpiry);
    console.log("tokenExpirationTime", tokenExpirationTime);

    if (userObject.tokenGenerated != token) {
      throw new Error("Token does not match with email id");
    }
    if (currentTime > tokenExpirationTime) {
      // Token has expired
      throw new Error("Token has expired");
    }
    await User.update(
      { verifiedFlag: true },
      { where: { tokenGenerated: token } }
    );
    return res.status(200).send("Email verifified successfully");
  } catch (error) {
    console.log(error);
    return res.status(400).send("Email verification failed,link is invalid!");
  }
};

async function getUsername(username) {
  return User.findOne({ where: { username: username } });
}
