const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Course = require("./Course");
const User = require("./User");

class Rating extends Model {}

Rating.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Rating",
    timestamps: false,
  }
);

Rating.belongsTo(Course);
Rating.belongsTo(User, { as: "student" });

module.exports = Rating;
