import { DataTypes } from "sequelize";

export const userModelFunction = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        readOnly: true,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        writeOnly: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      account_created: {
        type: Sequelize.DATE,
        allowNull: false,
        readOnly: true,
      },
      account_updated: {
        type: Sequelize.DATE,
        allowNull: false,
        readOnly: true,
      },
      verifiedFlag: {
        type: Sequelize.BOOLEAN,
        alter: true,
        defaultValue: false,
      },
      tokenGenerated: {
        type: Sequelize.STRING,
        alter: true,
      },
      emailSentTime: {
        type: Sequelize.DATE,
        alter: true,
      },
    },
    {
      hooks: {
        beforeUpdate: (user, options) => {
          // Update the account_updated field before the user record is updated
          user.account_updated = new Date();
        },
      },

      createdAt: "account_created",
      updatedAt: "account_updated",
    }
  );
  return User;
};
