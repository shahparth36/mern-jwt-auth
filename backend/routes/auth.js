const express = require('express');
const router = express.Router();

const { register, authenticate } = require('../controllers/auth.controller');

router.post('/register', register);

router.post('/login', authenticate);

module.exports = router;
