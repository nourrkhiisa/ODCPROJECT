const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

class Attendance extends Model {}

Attendance.init(
  {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Attendance",
    timestamps: false,
  }
);

module.exports = Attendance;
