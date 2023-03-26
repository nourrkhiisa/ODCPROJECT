const {
  User,
  Course,
  EvaluationQuiz,
  PrerequisiteQuiz,
  Notification,
} = require("../models");

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
      const courseId = req.params.id;
      const course = await Course.findByPk(courseId, {
        include: [{ model: User, as: "coach" }],
      });

      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

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
