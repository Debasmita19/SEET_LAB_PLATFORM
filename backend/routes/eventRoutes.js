const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');
const permit = require('../middleware/roleMiddleware');

// Create event (Instructor only)
router.post(
  '/',
  authMiddleware,
  permit('Tutor', 'Admin'),
  eventController.createEvent
);

// Get all events (Public)
router.get('/', eventController.getAllEvents);

// Get single event by ID (Public)
router.get('/:id', eventController.getEventById);

module.exports = router;
