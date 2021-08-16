const express = require("express");
const router = express.Router();

const {
  register,
  authenticate,
  verifyRefreshToken,
  getNewToken,
  verifyUser,
} = require("../controllers/auth.controller");

const authorize = require("../middleware/authorize");

router.post("/register", register);

router.post("/login", authenticate);

router.post("/refresh-token", verifyRefreshToken);

router.post("/new-tokens", getNewToken);

router.post("/verify-user", authorize(), verifyUser);

module.exports = router;
