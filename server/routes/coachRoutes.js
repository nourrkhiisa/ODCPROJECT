const express = require("express");
const router = express.Router();
const coachController = require("../controllers/coachController");
const authMiddleware = require("../middleware/auth");

router.use(authMiddleware.auth);
router.use(authMiddleware.checkRole("coach"));

// Coach profile
router.get("/profile", coachController.getCoachProfile);
router.get("/:coachId/students", coachController.getStudentsForAssignedCourses);
router.get("/courses/:id/students", coachController.getStudentsForCourse);
router.post("/courses/:id/attendance", coachController.markAttendance);
router.get("/courses/:id", coachController.getCourseDetails);

// Coach's assigned trainings
router.get("/trainings/:coachId", coachController.getAssignedCourses);

// Coach's training calendar
router.get("/calendar", coachController.getCalendar);

// Manage evaluation quizzes
router.post(
  "/trainings/:id/evaluation-quiz",
  coachController.createEvaluationQuiz
);
router.put(
  "/trainings/:id/evaluation-quiz",
  coachController.updateEvaluationQuiz
);
router.delete(
  "/trainings/:id/evaluation-quiz",
  coachController.deleteEvaluationQuiz
);

// Prerequisite quiz requests
router.post(
  "/trainings/:id/prerequisite-quiz-request",
  coachController.requestPrerequisiteQuizCreation
);
router.post(
  "/trainings/:id/prerequisite-quiz",
  coachController.createPrerequisiteQuiz
);

// Update coach settings
router.put("/settings", coachController.updateCoachProfile);

module.exports = router;
