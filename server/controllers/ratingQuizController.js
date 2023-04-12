// controllers/ratingQuizController.js
const RatingQuiz = require("../models/RatingQuiz");
const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

exports.createRatingQuiz = async (req, res) => {
  const { courseId } = req.params;
  const { questions } = req.body;

  try {
    // Fetch the course
    const course = await Course.findByPk(courseId);
    if (!course) {
      res.status(404).json({ message: "Course not found" });
      return;
    }

    // Fetch enrolled students
    const enrolledStudents = await Enrollment.findAll({
      where: { courseId },
      attributes: ["studentId"],
    });

    // Extract studentIds from enrolled students
    const studentIds = enrolledStudents.map(
      (enrollment) => enrollment.studentId
    );

    const ratingQuiz = new RatingQuiz({
      courseId,
      questions,
      studentIds, // Add studentIds to the rating quiz
    });

    await ratingQuiz.save();

    res.status(201).json({
      message: "Rating quiz created successfully",
      ratingQuiz,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error creating rating quiz",
      error: error.message,
    });
  }
};
exports.submitRatingQuiz = async (req, res) => {
  const { courseId } = req.params;
  const { studentId, ratings } = req.body;

  try {
    const ratingQuiz = await RatingQuiz.findOne({ courseId });

    if (!ratingQuiz) {
      res.status(404).json({ message: "Rating quiz not found" });
      return;
    }

    // Add studentId while creating the new rating object
    ratingQuiz.ratings.push({ studentId, ratings });
    await ratingQuiz.save();

    const course = await Course.findById(courseId);
    const totalRatings = ratingQuiz.ratings.length;
    const updatedRating =
      ratingQuiz.ratings.reduce((total, current) => {
        return (
          total +
          current.ratings.reduce((a, b) => a + b, 0) / current.ratings.length
        );
      }, 0) / totalRatings;

    course.rating = updatedRating;
    await course.save();

    res.status(200).json({ message: "Rating quiz submitted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error submitting rating quiz",
      error: error.message,
    });
  }
};
