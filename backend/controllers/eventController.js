const Event = require('../models/Event');

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
    return res.status(201).json({ message: 'Event created successfully.', event: newEvent });
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
