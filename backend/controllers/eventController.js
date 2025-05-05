const Event = require('../models/Event');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

// Create a new event (Instructor only)
exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, time, location, capacity } = req.body;

    if (!title || !description || !date || !time || !location) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newEvent = new Event({
      title,
      description,
      date,
      time,
      location,
      capacity,
      createdBy: req.user.id
    });

    await newEvent.save();

    // Notify all users via email
    const users = await User.find({ role: 'User' }).select('email');
    const emails = users.map(user => user.email);
    const text = `A new event "${title}" has been scheduled on ${date} at ${time} in ${location}.`;

    for (const email of emails) {
      await sendEmail(email, 'New Event Notification', text);
    }

    return res.status(201).json({ message: 'Event created and users notified.', event: newEvent });
  } catch (error) {
    return res.status(500).json({ message: 'Server error while creating event.', error: error.message });
  }
};

// Get all events (public)
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({ message: 'Server error while fetching events.', error: error.message });
  }
};

// Get event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }
    return res.status(200).json(event);
  } catch (error) {
    return res.status(500).json({ message: 'Server error while fetching event.', error: error.message });
  }
};

// Update event details
exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    if (req.user.role !== 'Admin' && event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to edit this event.' });
    }

    const updates = req.body;
    Object.assign(event, updates);
    await event.save();

    return res.status(200).json({ message: 'Event updated successfully.', event });
  } catch (error) {
    return res.status(500).json({ message: 'Server error while updating event.', error: error.message });
  }
};

exports.confirmAttendee = async (req, res) => {
  try {
    const { id: eventId, userId } = req.params;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    if (req.user.role !== 'Admin' && event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to confirm attendees.' });
    }

    if (event.confirmedAttendees.includes(userId)) {
      return res.status(400).json({ message: 'Attendee already confirmed.' });
    }

    event.confirmedAttendees.push(userId);
    await event.save();

    return res.status(200).json({ message: 'Attendee confirmed successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error while confirming attendee.', error: error.message });
  }
};

exports.getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.user.id }).sort({ date: 1 });
    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch your events.', error: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (
      req.user.role === 'Instructor' &&
      event.createdBy.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: 'Unauthorized to delete this event' });
    }

    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
