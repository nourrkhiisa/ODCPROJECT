const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Course = require("./Course");

class PrerequisiteQuiz extends Model {}

PrerequisiteQuiz.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    questions: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "PrerequisiteQuiz",
    timestamps: false,
  }
);

PrerequisiteQuiz.belongsTo(Course);

module.exports = PrerequisiteQuiz;
