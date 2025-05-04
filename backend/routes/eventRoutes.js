const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');
const permit = require('../middleware/roleMiddleware');

// Create event (Instructor only)
router.post(
  '/',
  authMiddleware,
  permit('Instructor', 'Admin'),
  eventController.createEvent
);

// Get all events (Public)
router.get('/', eventController.getAllEvents);
// Get events created by the logged-in instructor
router.get(
  '/my',
  authMiddleware,
  permit('Instructor'),
  eventController.getMyEvents
);

// Get single event by ID (Public)
router.get('/:id', eventController.getEventById);

// Edit event details (Admin or the instructor who created it)
router.put('/:id', authMiddleware, permit('Admin', 'Instructor'), eventController.updateEvent);

// Delete event (Admin or the instructor who created it)
router.delete(
  '/:id',
  authMiddleware,
  permit('Instructor', 'Admin'),
  eventController.deleteEvent
);

// Confirm attendee for an event
router.put('/:id/confirm-attendee/:userId', authMiddleware, permit('Instructor', 'Admin'), eventController.confirmAttendee);


module.exports = router;
