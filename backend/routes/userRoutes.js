const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const permit = require('../middleware/roleMiddleware');

// Admin: Update user role
router.put('/:id/role', authMiddleware, permit('Admin'), userController.updateUserRole);


// Get logged-in user profile
router.get('/me', authMiddleware, userController.getMyProfile);

// Change own password
router.put('/me/password', authMiddleware, userController.changeMyPassword);

// Admin changes any user’s password
router.put('/:id/password', authMiddleware, permit('Admin'), userController.adminChangePassword);


module.exports = router;
