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
// GET all users (Admin only)
router.get('/', authMiddleware, permit('Admin'), userController.getAllUsers);

// GET user by ID
router.get('/:id', authMiddleware, permit('Admin'), userController.getUserById);

// PUT update user
router.put('/:id', authMiddleware, permit('Admin'), userController.updateUser);


module.exports = router;
