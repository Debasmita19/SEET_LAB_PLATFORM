const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const eventRoutes = require('./routes/eventRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require('./routes/userRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to SEET LAB Activities and Events backend!' });
});

app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
