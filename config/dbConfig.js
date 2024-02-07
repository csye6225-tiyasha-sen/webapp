import Sequelize from "sequelize";
import { userModelFunction } from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();

export const sequelize = new Sequelize(
  process.env.PSQL_DATABASE,
  process.env.PSQL_USERNAME,
  process.env.PSQL_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.userModel = userModelFunction(sequelize, Sequelize);

db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Resynchronizing done!");
  })
  .catch((error) => {
    console.error("Error synchronizing database!", error);
  });

export default db;
