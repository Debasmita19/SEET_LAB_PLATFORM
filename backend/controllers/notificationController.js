const Notification = require('../models/Notification');
const User = require('../models/User');
const { sendEmail } = require('../utils/emailService');

// Admin: Resend an existing notification
exports.resendNotification = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the notification by ID
    const original = await Notification.findById(id);
    if (!original) {
      return res.status(404).json({ message: 'Notification not found.' });
    }

    const recipient = await User.findById(original.recipient);
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient user not found.' });
    }

    // Re-create and save a new notification
    const newNotification = new Notification({
      recipient: recipient._id,
      title: original.title,
      message: original.message,
      method: original.method
    });

    await newNotification.save();

    // Resend email if the method is email
    if (original.method === 'email') {
      await sendEmail(recipient.email, original.title, original.message);
    }

    return res.status(200).json({
      message: 'Notification resent successfully.',
      notification: newNotification
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error while resending notification.',
      error: error.message
    });
  }
};


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
