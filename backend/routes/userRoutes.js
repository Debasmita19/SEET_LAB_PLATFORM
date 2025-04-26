const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const permit = require('../middleware/roleMiddleware');

// Admin: Update user role
router.put('/:id/role', authMiddleware, permit('Admin'), userController.updateUserRole);

module.exports = router;
