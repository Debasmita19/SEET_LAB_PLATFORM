const User = require('../models/User');

// Admin-only: Update a user's role
exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const { id } = req.params;

    const allowedRoles = ['User', 'Tutor', 'Admin'];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role provided.' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(200).json({
      message: 'User role updated successfully.',
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error.', error: error.message });
  }
};
