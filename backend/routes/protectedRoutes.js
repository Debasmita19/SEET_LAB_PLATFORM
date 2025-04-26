const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const permit = require('../middleware/roleMiddleware');

router.get('/admin-dashboard', authMiddleware, permit('Admin'), (req, res) => {
  res.json({
    message: 'Welcome to the admin dashboard!',
    user: req.user
  });
});

router.get('/tutor-section', authMiddleware, permit('Tutor', 'Admin'), (req, res) => {
  res.json({
    message: 'Welcome to the tutor section!',
    user: req.user
  });
});

router.get('/user-profile', authMiddleware, (req, res) => {
  res.json({
    message: 'Welcome to your profile!',
    user: req.user
  });
});

module.exports = router;
