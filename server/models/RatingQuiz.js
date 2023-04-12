const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

class RatingQuiz extends Model {}

RatingQuiz.init(
  {
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Courses", // Make sure this matches the name of your Course table
        key: "id",
      },
    },
    questions: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    ratings: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    studentIds: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "RatingQuiz",
    timestamps: true,
  }
);

const Course = require("./Course"); // Add this line
// RatingQuiz.belongsTo(Course, {
//   foreignKey: "courseId",
//   as: "course",
// });

module.exports = RatingQuiz;
