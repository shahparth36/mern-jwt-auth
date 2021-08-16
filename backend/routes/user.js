const express = require("express");
const router = express.Router();

const { getUserById, getAllUsers } = require("../controllers/user.controller");

const authorize = require("../middleware/authorize");

router.get("/user", authorize(), getUserById);

router.get("/all-users", authorize(), getAllUsers);

module.exports = router;
