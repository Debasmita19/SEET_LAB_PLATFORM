const Notification = require('../models/Notification');
const User = require('../models/User');
const { sendEmail } = require('../utils/emailService');

// Admin: Send a notification
exports.sendNotification = async (req, res) => {
  try {
    const { recipientId, title, message, method } = req.body;

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found.' });
    }

    const notification = new Notification({
      recipient: recipientId,
      title,
      message,
      method
    });

    await notification.save();

    if (method === 'email') {
      await sendEmail(recipient.email, title, message);
    }

    return res.status(201).json({ message: 'Notification sent.', notification });

  } catch (error) {
    return res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// Get all notifications for logged-in user
exports.getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user.id }).sort({ sentAt: -1 });
    return res.status(200).json(notifications);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching notifications.', error: error.message });
  }
};
