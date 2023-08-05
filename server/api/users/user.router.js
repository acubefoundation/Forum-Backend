// Import required modules and controllers
const router = require('express').Router();
const auth = require('../middleware/auth');
const { createUser, getUserById, login, postQuestion } = require('./user.controller');

// Route new user to be registered using createUser controller
router.post("/", createUser);

// Route existing user to be verified using auth middleware and getUserById
router.get("/", auth, getUserById);

// Route existing user to be logged in using login controller
router.post("/login", login);


module.exports = router;
