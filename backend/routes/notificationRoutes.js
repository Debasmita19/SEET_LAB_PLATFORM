const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authMiddleware = require('../middleware/authMiddleware');
const permit = require('../middleware/roleMiddleware');

// Admin sends a notification
router.post('/', authMiddleware, permit('Admin'), notificationController.sendNotification);

// User views their notifications
router.get('/', authMiddleware, notificationController.getMyNotifications);

module.exports = router;
