const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

class Notification extends Model {}

Notification.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Notification",
    timestamps: true,
  }
);

Notification.belongsTo(User, { as: "recipient" });

module.exports = Notification;
