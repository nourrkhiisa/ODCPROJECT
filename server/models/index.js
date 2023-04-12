const User = require("./User");
const Category = require("./Category");
const Course = require("./Course");
const Enrollment = require("./Enrollment");
const EvaluationQuiz = require("./EvaluationQuiz");
const Notification = require("./Notification");
const PrerequisiteQuiz = require("./PrerequisiteQuiz");
const Rating = require("./Rating");
const RatingQuiz = require("./RatingQuiz");

User.belongsToMany(Course, { through: Enrollment });
Course.belongsToMany(User, { through: Enrollment });

Course.belongsTo(Category);
Category.hasMany(Course);

module.exports = {
  User,
  Category,
  Course,
  Enrollment,
  EvaluationQuiz,
  Notification,
  PrerequisiteQuiz,
  Rating,
  RatingQuiz,
};
