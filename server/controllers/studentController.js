const {
  User,
  Course,
  Enrollment,
  Rating,
  Category,
  RatingQuiz,
} = require("../models");
const { Op } = require("sequelize");

const studentController = {
  async getStudentProfile(req, res) {
    try {
      const student = await User.findByPk(req.userId);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.json(student);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving student profile", error });
    }
  },

  async getCourses(req, res) {
    try {
      const category = req.query.category;
      const where = category ? { categoryId: category } : {};
      const courses = await Course.findAll({ where });
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving courses", error });
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
      res
        .status(500)
        .json({ message: "Error retrieving course details", error });
    }
  },

  async enrollInCourse(req, res) {
    try {
      const CourseId = req.params.id;
      const course = await Course.findByPk(CourseId);

      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      const existingEnrollment = await Enrollment.findOne({
        where: { studentId: req.userId, CourseId },
      });

      if (existingEnrollment) {
        return res
          .status(400)
          .json({ message: "You have already enrolled in this course" });
      }

      const newEnrollment = await Enrollment.create({
        studentId: req.userId,
        CourseId,
        status: "pending",
      });

      res.status(201).json(newEnrollment);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error enrolling in course", error });
    }
  },

  async completeCourseEvaluation(req, res) {
    try {
      const courseId = req.params.id;
      const { score, comment } = req.body;

      const course = await Course.findByPk(courseId);

      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      const existingRating = await Rating.findOne({
        where: { studentId: req.userId, courseId },
      });

      if (existingRating) {
        return res
          .status(400)
          .json({ message: "You have already completed the evaluation" });
      }

      const newRating = await Rating.create({
        studentId: req.userId,
        courseId,
        score,
        comment,
      });

      res.status(201).json(newRating);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error completing course evaluation", error });
    }
  },

  async updateStudentProfile(req, res) {
    try {
      const { password, photo } = req.body;
      const student = await User.findByPk(req.userId);

      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      if (password) {
        student.password = password;
      }
      if (photo) {
        student.photo = photo;
      }

      await student.save();
      res.json(student);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating student profile", error });
    }
  },
  async getQuizForCourse(req, res) {
    try {
      const courseId = req.params.id;
      const course = await Course.findByPk(courseId, {
        include: [
          {
            model: RatingQuiz,
            as: "ratingQuiz",
            where: { courseId },
            required: false,
          },
        ],
      });

      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      //  console.log("Fetched course:", course.get());
      // console.log("Fetched quizzes:", course.ratingQuiz);

      const quizzes = course.ratingQuiz || [];

      res.json(quizzes);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving quizzes for course", error });
    }
  },

  async submitQuizRating(req, res) {
    try {
      const courseId = req.params.id;
      const { rating } = req.body;

      const course = await Course.findByPk(courseId);

      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      const existingRating = await Rating.findOne({
        where: { studentId: req.userId, courseId },
      });

      if (existingRating) {
        return res
          .status(400)
          .json({ message: "You have already submitted a quiz rating" });
      }

      const newRating = await Rating.create({
        studentId: req.userId,
        CourseId: courseId,
        score: rating,
      });

      res.status(201).json(newRating);
    } catch (error) {
      res.status(500).json({ message: "Error submitting quiz rating", error });
    }
  },

  async getEnrolledCourses(req, res) {
    try {
      const enrolledCourses = await Enrollment.findAll({
        where: { studentId: req.userId },
        include: [
          {
            model: Course,
            include: [
              { model: Category },
              {
                model: RatingQuiz,
                as: "ratingQuiz",
              },
            ],
          },
        ],
      });

      const coursesWithQuiz = [];

      for (const enrollment of enrolledCourses) {
        const course = enrollment.Course;
        const courseId = course.id;
        const ratingQuiz = course.ratingQuiz || null;

        coursesWithQuiz.push({
          ...course.get(),
          ratingQuiz: ratingQuiz ? ratingQuiz.get() : null,
        });
      }

      res.json(coursesWithQuiz);
    } catch (error) {
      console.log("Error in getEnrolledCourses:", error);
      res
        .status(500)
        .json({ message: "Error retrieving enrolled courses", error });
    }
  },

  async rateCourse(req, res) {
    try {
      const courseId = req.params.id;
      const { score, comment } = req.body;

      const course = await Course.findByPk(courseId);

      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      const existingRating = await Rating.findOne({
        where: { studentId: req.userId, courseId },
      });

      if (existingRating) {
        return res
          .status(400)
          .json({ message: "You have already rated this course" });
      }

      const newRating = await Rating.create({
        studentId: req.userId,
        courseId,
        score,
        comment,
      });

      res.status(201).json(newRating);
    } catch (error) {
      res.status(500).json({ message: "Error rating course", error });
    }
  },

  async getCourseCategories(req, res) {
    try {
      const categories = await Category.findAll();
      res.json(categories);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving course categories", error });
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
};

module.exports = studentController;
