const {
  User,
  Course,
  EvaluationQuiz,
  PrerequisiteQuiz,
  Notification,
  Enrollment,
  Attendance,
} = require("../models");
const { Op } = require("sequelize");

const coachController = {
  async getCurrentUser(req, res) {
    try {
      const user = await User.findByPk(req.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Error fetching current user", error });
    }
  },
  async getCoachProfile(req, res) {
    try {
      const coach = await User.findByPk(req.userId);
      if (!coach) {
        return res.status(404).json({ message: "Coach not found" });
      }
      res.json(coach);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving coach profile", error });
    }
  },

  async getAssignedCourses(req, res) {
    console.log("getAssignedCourses called"); // Add this line
    try {
      const coachId = req.params.coachId;
      console.log("coachId:", coachId); // Add this line
      const courses = await Course.findAll({
        where: {
          coachId: coachId,
        },
      });
      res.status(200).json(courses);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error fetching assigned courses" });
    }
  },
  async getCourseDetails(req, res) {
    try {
      console.log("getCourseDetails called"); // Add this line
      const courseId = req.params.id;
      const course = await Course.findByPk(courseId, {
        include: [{ model: User, as: "coach" }],
      });

      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      // Calculate the number of days between two dates
      function calculateDaysBetween(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const timeDifference = Math.abs(end.getTime() - start.getTime());
        const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        return days;
      }

      // Calculate the number of days in the course
      const daysInCourse = calculateDaysBetween(
        course.startDate,
        course.endDate
      );
      console.log("Duration of the course:", daysInCourse);

      // Add daysInCourse to the course object
      course.setDataValue("daysInCourse", daysInCourse);

      res.json(course);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Error retrieving course details", error });
    }
  },
  async updateCourseOutline(req, res) {
    try {
      const courseId = req.params.id;
      const { outline } = req.body;

      const course = await Course.findByPk(courseId);

      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      if (course.coachId !== req.userId) {
        return res
          .status(403)
          .json({ message: "Not authorized to modify this course" });
      }

      course.outline = outline;
      await course.save();

      res.json(course);
    } catch (error) {
      res.status(500).json({ message: "Error updating course outline", error });
    }
  },

  async createEvaluationQuiz(req, res) {
    try {
      console.log(req.params);
      const courseId = req.params.id; // Change this line
      const { questions } = req.body;

      const course = await Course.findByPk(courseId);

      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      if (course.coachId !== req.userId) {
        return res
          .status(403)
          .json({ message: "Not authorized to modify this course" });
      }

      const evaluationQuiz = await EvaluationQuiz.create({
        CourseId: course.id,
        questions,
      });

      res.status(201).json(evaluationQuiz);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating evaluation quiz", error });
    }
  },
  async getCalendar(req, res) {
    try {
      const courses = await Course.findAll({ where: { coachId: req.userId } });
      const calendarEvents = courses.map((course) => {
        return {
          title: course.name,
          start: course.startDate,
          end: course.endDate,
          courseId: course.id,
        };
      });

      res.json(calendarEvents);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving calendar events", error });
    }
  },

  async createPrerequisiteQuiz(req, res) {
    try {
      const courseId = req.params.id;
      const { questions } = req.body;

      const course = await Course.findByPk(courseId);

      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      if (course.coachId !== req.userId) {
        return res
          .status(403)
          .json({ message: "Not authorized to modify this course" });
      }

      const prerequisiteQuiz = await PrerequisiteQuiz.create({
        courseId,
        questions,
      });

      res.status(201).json(prerequisiteQuiz);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating prerequisite quiz", error });
    }
  },

  async updateEvaluationQuiz(req, res) {
    try {
      const courseId = req.params.id;
      const { questions } = req.body;

      const course = await Course.findByPk(courseId);

      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      if (course.coachId !== req.userId) {
        return res
          .status(403)
          .json({ message: "Not authorized to modify this course" });
      }

      const evaluationQuiz = await EvaluationQuiz.findOne({
        where: { courseId },
      });

      if (!evaluationQuiz) {
        return res.status(404).json({ message: "Evaluation quiz not found" });
      }
      evaluationQuiz.questions = questions;
      await evaluationQuiz.save();

      res.json(evaluationQuiz);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating evaluation quiz", error });
    }
  },

  async deleteEvaluationQuiz(req, res) {
    try {
      const courseId = req.params.id;
      const course = await Course.findByPk(courseId);

      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      if (course.coachId !== req.userId) {
        return res
          .status(403)
          .json({ message: "Not authorized to modify this course" });
      }

      const evaluationQuiz = await EvaluationQuiz.findOne({
        where: { courseId },
      });

      if (!evaluationQuiz) {
        return res.status(404).json({ message: "Evaluation quiz not found" });
      }

      await evaluationQuiz.destroy();

      res.json({ message: "Evaluation quiz deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting evaluation quiz", error });
    }
  },
  async getStudentsForAssignedCourses(req, res) {
    try {
      const coachId = req.params.coachId;
      const courses = await Course.findAll({
        where: {
          coachId: coachId,
        },
      });
      // console.log("Assigned courses:", courses);

      const assignedCourseIds = courses.map((course) => course.id);

      console.log("Assigned course IDs:", assignedCourseIds);

      const enrollments = await Enrollment.findAll({
        where: {
          CourseId: {
            [Op.in]: assignedCourseIds,
          },
        },
      });

      const studentIds = enrollments.map((enrollment) => enrollment.studentId);

      const students = await User.findAll({
        where: {
          id: {
            [Op.in]: studentIds,
          },
        },
        attributes: ["id", "firstName", "lastName"],
      });

      // console.log("Fetched students:", students);

      res.status(200).json(students);
    } catch (error) {
      console.error("Error fetching students for assigned courses:", error);
      res.status(500).json({ error: error.message });
    }
  },

  async getStudentsForCourse(req, res) {
    try {
      const courseId = req.params.id;
      const course = await Course.findByPk(courseId);

      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      if (course.coachId !== req.userId) {
        return res.status(403).json({
          message: "Not authorized to view students for this course",
        });
      }

      const enrollments = await Enrollment.findAll({
        where: {
          courseId: courseId,
        },
      });

      const studentIds = enrollments.map((enrollment) => enrollment.studentId);

      const students = await User.findAll({
        where: {
          id: {
            [Op.in]: studentIds,
          },
        },
        attributes: ["id", "firstName", "lastName"],
      });

      res.json(students);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching students for the course",
        error,
      });
    }
  },

  async markAttendance(req, res) {
    try {
      const courseId = req.params.id;
      const { studentId, date, status } = req.body;

      const course = await Course.findByPk(courseId);

      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      if (course.coachId !== req.userId) {
        return res.status(403).json({
          message: "Not authorized to mark attendance for this course",
        });
      }

      const attendance = await Attendance.findOne({
        where: {
          courseId: courseId,
          studentId: studentId,
          date: date,
        },
      });

      if (attendance) {
        // Update existing attendance record
        attendance.status = status;
        await attendance.save();
      } else {
        // Create a new attendance record
        await Attendance.create({
          courseId: courseId,
          studentId: studentId,
          date: date,
          status: status,
        });
      }

      res.status(201).json({ message: "Attendance marked successfully" });
    } catch (error) {
      res.status(500).json({
        message: "Error marking attendance",
        error,
      });
    }
  },

  async updateCoachProfile(req, res) {
    try {
      const { password, photo } = req.body;
      const coach = await User.findByPk(req.userId);

      if (!coach) {
        return res.status(404).json({ message: "Coach not found" });
      }

      if (password) {
        coach.password = password;
      }
      if (photo) {
        coach.photo = photo;
      }

      await coach.save();
      res.json(coach);
    } catch (error) {
      res.status(500).json({ message: "Error updating coach profile", error });
    }
  },

  async requestPrerequisiteQuizCreation(req, res) {
    try {
      const courseId = req.params.id;
      const { message } = req.body;

      const course = await Course.findByPk(courseId);

      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      if (course.coachId !== req.userId) {
        return res.status(403).json({
          message:
            "Not authorized to request a prerequisite quiz for this course",
        });
      }

      const notification = await Notification.create({
        type: "PREREQUISITE_QUIZ_REQUEST",
        senderId: req.userId,
        message,
      });

      res.status(201).json(notification);
    } catch (error) {
      res.status(500).json({
        message: "Error requesting prerequisite quiz creation",
        error,
      });
    }
  },
};

module.exports = coachController;
