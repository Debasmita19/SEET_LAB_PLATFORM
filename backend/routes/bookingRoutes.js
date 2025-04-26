const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');
const permit = require('../middleware/roleMiddleware');

// Book an event (User/Student)
router.post('/:id/book', authMiddleware, permit('User', 'Tutor', 'Admin'), bookingController.bookEvent);

// Get logged-in user's bookings
router.get('/my-bookings', authMiddleware, bookingController.getMyBookings);

module.exports = router;
