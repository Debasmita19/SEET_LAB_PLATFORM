const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const permit = require('../middleware/roleMiddleware');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Get all users (Admin)
router.get('/', authMiddleware, permit('Admin'), userController.getAllUsers);


module.exports = router;
