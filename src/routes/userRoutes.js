const { Router } = require("express");
const {
  register,
  login,
  getUserDetails,
  updateUser,
  deactivateUser,
} = require("../controllers/userController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, getUserDetails);
router.put("/profile", authMiddleware, updateUser);
router.delete("/deactivate", authMiddleware, deactivateUser);

module.exports = router;
