const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/auth");
const ratingQuizController = require("../controllers/ratingQuizController");
// router.use(authMiddleware.auth);
// router.use(authMiddleware.checkRole("admin"));
router.get("/categories", adminController.getCategories);
// Add this line in adminRoutes
router.post("/students", adminController.addStudent);

// Admin dashboard
router.get("/dashboard", adminController.getAdminDashboard);
router.post("/categories", adminController.addCategory);
router.get("/me", adminController.getCurrentUser);
// Courses
router.post("/courses", adminController.addCourse);
router.get("/courses", adminController.getCourseList);
router.get("/courses/:id", adminController.getCourse);
router.put("/courses/:id", adminController.updateCourse);
router.delete("/courses/:id", adminController.deleteCourse);

// Course assignments
router.post("/courses/:id/assign-coach", adminController.assignCourseToCoach);
router.put("/courses/:id/remove-coach", adminController.removeCoachFromCourse);

// Enrollments
router.get("/enrollments", adminController.getEnrollments);
router.put("/enrollments/:id/accept", adminController.acceptEnrollment);
router.put("/enrollments/:id/decline", adminController.declineEnrollment);

// Coaches
router.get("/coachs", adminController.getCoachList);

// Students
router.get("/students", adminController.getAllStudents);

router.post(
  "/courses/:courseId/rating-quiz",
  ratingQuizController.createRatingQuiz
);
router.post(
  "/courses/:courseId/rating-quiz/submit",
  ratingQuizController.submitRatingQuiz
);

// Course ratings
router.get("/course-ratings", adminController.getCourseRatings);

module.exports = router;
