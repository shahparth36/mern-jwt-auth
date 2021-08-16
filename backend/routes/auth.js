const express = require("express");
const router = express.Router();

const {
  register,
  authenticate,
  verifyRefreshToken,
  getNewToken,
} = require("../controllers/auth.controller");

router.post("/register", register);

router.post("/login", authenticate);

router.post("/refresh-token", verifyRefreshToken);

router.post("/new-tokens", getNewToken);

module.exports = router;
