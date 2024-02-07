import { v1 as uuidv1 } from "uuid";
import db from "../config/dbConfig.js";
//import { checkRoutes } from "./middleware/middleware.js";

import bcrypt from "bcrypt";
const User = db.userModel;

export const userCreate = async (req, res) => {
  if (Object.keys(req.query).length != 0) {
    return res.status(400).end();
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
    //const userr = await User.create(info);
    res.status(201).send(userData);
  } catch (err) {
    console.error(err);
    res.status(400).send();
  }
};

export const userGetByUsername = async (req, res, next) => {
  const userAttri = await getUsername(req.user.username);
  if (Object.keys(req.query).length != 0) {
    return res.status(400).end();
  }
  if (userAttri) {
    res.status(200).send({
      id: userAttri.dataValues.id,
      first_name: userAttri.dataValues.first_name,
      last_name: userAttri.dataValues.last_name,
      username: userAttri.dataValues.username,
      account_created: userAttri.dataValues.account_created,
      account_updated: userAttri.dataValues.account_updated,
    });
  } else {
    res.status(400).send();
  }
};

export const userUpdateByUsername = async (req, res, next) => {
  if (Object.keys(req.query).length != 0) {
    return res.status(400).end();
  }
  if (!req.body.first_name || !req.body.last_name || !req.body.password) {
    return res.status(400).send({
      message: "Enter all the required fields!",
    });
  }

  try {
    if (req.body.username) {
      return res.status(400).send({
        message: "Update of User Id is not allowed!",
      });
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
    console.error("Error Updating the user", err);
    res.status(400).send();
  }
};

async function getUsername(username) {
  return User.findOne({ where: { username: username } });
}
