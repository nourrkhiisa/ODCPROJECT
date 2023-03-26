const Course = require("../models/Course");
const User = require("../models/User");
const { Op } = require("sequelize");

async function getAdminCalendar() {
  const courses = await Course.findAll({
    include: [
      {
        model: User,
        as: "coach",
        attributes: ["id", "firstName", "lastName"],
      },
    ],
    order: [["date", "ASC"]],
  });
  return courses;
}

async function getCoachCalendar(coachId) {
  const courses = await Course.findAll({
    where: { coachId },
    order: [["date", "ASC"]],
  });
  return courses;
}

module.exports = {
  getAdminCalendar,
  getCoachCalendar,
};
