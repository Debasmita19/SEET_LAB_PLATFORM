const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');
const permit = require('../middleware/roleMiddleware');

// Book an event (User/Student)
router.post('/:id/book', authMiddleware, permit('User', 'Tutor', 'Admin'), bookingController.bookEvent);

// Get logged-in user's bookings
router.get('/my-bookings', authMiddleware, bookingController.getMyBookings);

// View all bookings for a specific event
router.get('/event/:id/bookings', authMiddleware, permit('Tutor', 'Admin'), bookingController.getEventBookings);

module.exports = router;
