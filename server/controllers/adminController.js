const {
  User,
  Course,
  Enrollment,
  EvaluationQuiz,
  Notification,
  PrerequisiteQuiz,
  Rating,
  Category,
} = require("../models");
const { Op } = require("sequelize");

const adminController = {
  async getAdminDashboard(req, res) {
    try {
      const admin = await User.findByPk(req.userId);
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
      res.json(admin);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching admin dashboard", error });
    }
  },
  async getCategories(req, res) {
    try {
      const categories = await Category.findAll({
        attributes: ["id", "name"],
      });
      res.json(categories);
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Error fetching categories", error });
    }
  },

  async getEnrollments(req, res) {
    try {
      const enrollments = await Enrollment.findAll({
        include: [
          {
            model: User,
            as: "student",
            attributes: ["id", "firstName", "lastName", "email"],
          },
          {
            model: Course,
            as: "course",
            attributes: ["id", "title"],
          },
        ],
      });

      res.json(enrollments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching enrollments", error });
    }
  },

  async removeCoachFromCourse(req, res) {
    try {
      const courseId = req.params.id;

      const course = await Course.findByPk(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      if (!course.coachId) {
        return res
          .status(400)
          .json({ message: "Course has no assigned coach" });
      }

      course.coachId = null;
      await course.save();

      res.json({ message: "Coach removed from the course successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error removing coach from course", error });
    }
  },

  async assignCourseToCoach(req, res) {
    try {
      const courseId = req.params.courseId;
      const coachId = req.body.coachId;

      const course = await Course.findByPk(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      const coach = await User.findByPk(coachId);
      if (!coach) {
        return res.status(404).json({ message: "Coach not found" });
      }

      course.coachId = coachId;
      await course.save();

      res.json({ message: "Course assigned to coach successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error assigning course to coach", error });
    }
  },

  async getCoachList(req, res) {
    try {
      const coaches = await User.findAll({
        where: { role: "coach" },
        attributes: ["id", "firstName", "lastName", "email"],
      });
      res.json(coaches);
    } catch (error) {
      res.status(500).json({ message: "Error fetching coach list", error });
    }
  },

  async getCourseList(req, res) {
    try {
      const courses = await Course.findAll({
        attributes: [
          "id",
          "title",
          "description",
          "startDate",
          "endDate",
          "maxStudents",
          "isOnline",
          "location",
          "link",
          "categoryId",
          "coachId",
        ],
      });
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: "Error fetching course list", error });
    }
  },

  async getEnrolledStudents(req, res) {
    try {
      const courseId = req.params.courseId;

      const course = await Course.findByPk(courseId, {
        include: [
          {
            model: User,
            as: "students",
            attributes: ["id", "firstName", "lastName", "email"],
            through: { attributes: ["evaluationQuizScore"] },
          },
        ],
      });

      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      res.json(course.students);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching enrolled students", error });
    }
  },

  async addCourse(req, res) {
    try {
      const {
        title,
        description,
        startDate,
        endDate,
        maxStudents,
        isOnline,
        location,
        link,
        CategoryId,
        coachId,
      } = req.body;

      const category = await Category.findByPk(CategoryId);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      const coach = await User.findByPk(coachId);
      if (!coach) {
        return res.status(404).json({ message: "Coach not found" });
      }

      const course = await Course.create({
        title,
        description,
        startDate,
        endDate,
        maxStudents,
        isOnline,
        location,
        link,

        CategoryId,
        coachId,
      });

      res.status(201).json(course);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error adding course", error });
    }
  },

  async updateCourse(req, res) {
    try {
      const courseId = req.params.courseId;
      const { title, description, startDate, duration, categoryId, coachId } =
        req.body;

      const course = await Course.findByPk(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      const coach = await User.findByPk(coachId);
      if (!coach) {
        return res.status(404).json({ message: "Coach not found" });
      }

      course.title = title;
      course.description = description;
      course.startDate = startDate;
      course.duration = duration;
      course.categoryId = categoryId;
      course.coachId = coachId;
      await course.save();

      res.json({ message: "Course updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error updating course", error });
    }
  },
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
  async addCategory(req, res) {
    try {
      const { name } = req.body;

      const category = await Category.create({ name });

      res.status(201).json(category);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error adding category", error });
    }
  },

  async deleteCourse(req, res) {
    try {
      const courseId = req.params.courseId;

      const course = await Course.findByPk(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      await course.destroy();
      res.json({ message: "Course deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting course", error });
    }
  },
  async getCourse(req, res) {
    try {
      const courseId = req.params.id;
      const course = await Course.findByPk(courseId);

      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      res.json(course);
    } catch (error) {
      res.status(500).json({ message: "Error fetching course", error });
    }
  },

  async getAllStudents(req, res) {
    try {
      const students = await User.findAll({
        where: { role: "student" },
        attributes: ["id", "firstName", "lastName", "email"],
      });
      res.json(students);
    } catch (error) {
      res.status(500).json({ message: "Error fetching students", error });
    }
  },

  async acceptEnrollment(req, res) {
    try {
      const enrollmentId = req.params.id;
      const enrollment = await Enrollment.findByPk(enrollmentId);

      if (!enrollment) {
        return res.status(404).json({ message: "Enrollment not found" });
      }

      enrollment.status = "accepted";
      await enrollment.save();

      res.json({ message: "Enrollment accepted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error accepting enrollment", error });
    }
  },

  async declineEnrollment(req, res) {
    try {
      const enrollmentId = req.params.id;
      const enrollment = await Enrollment.findByPk(enrollmentId);

      if (!enrollment) {
        return res.status(404).json({ message: "Enrollment not found" });
      }

      enrollment.status = "declined";
      await enrollment.save();

      res.json({ message: "Enrollment declined successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error declining enrollment", error });
    }
  },

  async getCourseRatings(req, res) {
    try {
      // Fetch the course ratings from the database (assuming you have a Rating model)
      const ratings = await Rating.findAll();

      // Return the ratings as a JSON response
      res.json(ratings);
    } catch (error) {
      res.status(500).json({ message: "Error fetching course ratings", error });
    }
  },

  async updateAdminSettings(req, res) {
    try {
      const { password, newPassword, photo } = req.body;
      const admin = await User.findByPk(req.userId);

      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }

      if (password && newPassword) {
        const validPassword = await admin.verifyPassword(password);
        if (!validPassword) {
          return res
            .status(400)
            .json({ message: "Current password is incorrect" });
        }
        admin.password = newPassword;
      }

      if (photo) {
        admin.photo = photo;
      }

      await admin.save();
      res.json({ message: "Settings updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error updating settings", error });
    }
  },
};

module.exports = adminController;
