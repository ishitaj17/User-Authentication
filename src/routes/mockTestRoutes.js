const { Router } = require("express");
const {
  addQuestion,
  getQuestions,
} = require("../controllers/mockTestController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = Router();

router.post("/questions", authMiddleware, addQuestion);
router.get("/questions", authMiddleware, getQuestions);

module.exports = router;
