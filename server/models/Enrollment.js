const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Course = require("./Course");
const User = require("./User");

class Enrollment extends Model {}

Enrollment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "accepted", "declined"),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Enrollment",
    timestamps: false,
  }
);

Enrollment.belongsTo(Course);
Enrollment.belongsTo(User, { as: "student" });

module.exports = Enrollment;
