const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const session = require('express-session');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({ secret: 'seetlabsecret', resave: false, saveUninitialized: true }));

const DB_FILE = './database.json';

function readDB() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ appointments: [], users: [{ username: 'admin', password: 'admin123' }] }, null, 2));
  }
  return JSON.parse(fs.readFileSync(DB_FILE));
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

function renderHTML(name) {
  return fs.readFileSync(path.join(__dirname, 'templates', name), 'utf8');
}

app.get('/', (req, res) => res.send(renderHTML('home.html')));
app.get('/about', (req, res) => res.send(renderHTML('about.html')));
app.get('/contact', (req, res) => res.send(renderHTML('contact.html')));
app.get('/schedule', (req, res) => res.send(renderHTML('schedule.html')));
app.get('/calendar', (req, res) => res.send(renderHTML('calendar.html')));

app.get('/login', (req, res) => res.send(renderHTML('login.html')));
app.post('/login', (req, res) => {
  const db = readDB();
  const { username, password } = req.body;
  const user = db.users.find(u => u.username === username && u.password === password);
  if (user) {
    req.session.loggedIn = true;
    res.redirect('/admin');
  } else {
    res.redirect('/login');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

app.post('/schedule', (req, res) => {
  const db = readDB();
  const { name, email, event, date, time } = req.body;
  db.appointments.push({ id: Date.now(), name, email, event, date, time, status: 'Pending' });
  writeDB(db);

  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587, // Use 465 for SSL
      secure: false, // Set to true for port 465
      auth: {
        user: 'Seetlabproject@gmail.com',
        //app password
        pass: 'hacp line pscm hdoi'
      }
    });

    let mailOptions = {
      from: 'Seetlabproject@gmail.com',
      to: email,
      subject: 'Appointment Scheduled',
      text: `Hi ${name}, your appointment for '${event}' is received and pending confirmation.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.log(error);
      else console.log('Email sent: ' + info.response);
    });
  } catch (err) {
    console.log('Email sending failed.');
  }

  res.redirect('/');
});

app.get('/admin', (req, res) => {
  if (!req.session.loggedIn) return res.redirect('/login');
  res.send(renderHTML('admin.html'));
});

app.get('/data', (req, res) => {
  const db = readDB();
  res.json(db.appointments);
});

app.get('/update/:id/:status', (req, res) => {
  if (!req.session.loggedIn) return res.redirect('/login');
  const db = readDB();
  const appt = db.appointments.find(a => a.id == req.params.id);
  if (appt) appt.status = req.params.status;
  writeDB(db);
  res.redirect('/admin');
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
