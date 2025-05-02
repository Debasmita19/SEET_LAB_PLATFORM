const Booking = require('../models/Booking');
const Event = require('../models/Event');
const User = require('../models/User');

// Book an event (Students only)
exports.bookEvent = async (req, res) => {
  try {
    const { id: eventId } = req.params;

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found.' });

    // Create booking
    const booking = new Booking({
      event: eventId,
      student: req.user.id
    });

    await booking.save();
    return res.status(201).json({ message: 'Booking successful.', booking });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'You have already booked this event.' });
    }
    return res.status(500).json({ message: 'Server error during booking.', error: error.message });
  }
};

// View my bookings (Student)
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ student: req.user.id })
      .populate('event')
      .sort({ bookedAt: -1 });

    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json({ message: 'Server error while fetching bookings.', error: error.message });
  }
};


// View all bookings for a specific event (Admin / Instructor)
exports.getEventBookings = async (req, res) => {
  try {
    const eventId = req.params.id;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    // Only allow access if user is Admin or event creator (Instructor)
    if (req.user.role !== 'Admin' && event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to view this event\'s attendees.' });
    }

    // Fetch all bookings for this event
    const bookings = await Booking.find({ event: eventId })
      .populate('student', 'name email role')
      .sort({ bookedAt: -1 });

    return res.status(200).json({
      eventTitle: event.title,
      totalBookings: bookings.length,
      bookings
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error while fetching attendees.', error: error.message });
  }
};
