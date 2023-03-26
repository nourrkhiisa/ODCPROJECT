const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Category = require("./Category");
const User = require("./User");

class Course extends Model {}

Course.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    maxStudents: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isOnline: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Course",
    timestamps: false,
  }
);

Course.belongsTo(Category);
Course.belongsTo(User, { as: "coach" });

module.exports = Course;
