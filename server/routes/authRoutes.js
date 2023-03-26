const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/auth");
router.get("/me", authMiddleware.auth, authController.getCurrentUser);

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
module.exports = router;
