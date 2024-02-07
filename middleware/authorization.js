import db from "../config/dbConfig.js";
import bcrypt from "bcrypt";

const User = db.userModel;

export const authorization = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // To validate if authorization header is present
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return res.status(401).send();
  }
  const base64Credential = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credential, "base64").toString("ascii");
  const [username, password] = credentials.split(":");

  const user = await User.findOne({
    where: { username },
  });
  if (!user) {
    return res.status(401).send();
  }

  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) {
    return res.status(401).send();
  }

  req.user = user;
  next();
};
