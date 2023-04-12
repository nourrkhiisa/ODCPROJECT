const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const authMiddleware = require("../middleware/auth");

router.use(authMiddleware.auth);
router.use(authMiddleware.checkRole("student"));

// Student profile
router.get("/profile", studentController.getStudentProfile);
// Get quiz for a specific course
router.get("/courses/:id/quiz", studentController.getQuizForCourse);
router.post("/course/:id/quiz-rating", studentController.submitQuizRating);

// Available courses
router.get("/courses", studentController.getCourses);

// Enrolled courses
router.get("/enrolled-courses", studentController.getEnrolledCourses);

// Course details
router.get("/courses/:id", studentController.getCourseDetails);

// Enroll in a course
router.post("/courses/:id/enroll", studentController.enrollInCourse);

// Complete evaluation quiz
router.post(
  "/courses/:id/evaluation-quiz",
  studentController.completeCourseEvaluation
);

// Rate a course and leave a comment
router.post("/courses/:id/rate", studentController.rateCourse);

// Update student settings
router.put("/settings", studentController.updateStudentProfile);

module.exports = router;
