const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Course = require("./Course");

class EvaluationQuiz extends Model {}

EvaluationQuiz.init(
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
    modelName: "EvaluationQuiz",
    timestamps: false,
  }
);

EvaluationQuiz.belongsTo(Course);

module.exports = EvaluationQuiz;
