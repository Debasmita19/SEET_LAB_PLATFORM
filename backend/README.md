# SEET LAB Activities & Events – Backend

This is the backend server for the SEET LAB platform, built with **Express.js**, **MongoDB**, and **JWT-based role authentication**. It supports event creation, student bookings, admin-level notifications, attendee confirmations, password management, and email alerts.

---

## 🚀 Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Role-Based Authorization
- Nodemailer (for SMTP email)
- REST API structure

---

## 💠 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/<your-username>/seet-lab-backend.git
cd seet-lab-backend
npm install
```

### 2. Create `.env` File

Use `.env.example` as a template:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/seetlab
JWT_SECRET=your_jwt_secret
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_email_app_password
```

> Use a Gmail **App Password** if using Gmail SMTP.

### 3. Run the Server

```bash
node index.js
# OR for dev
npx nodemon index.js
```

---

## 🧹 API Overview

### 🔐 Authentication (By Shreshta)

| Method | Endpoint             | Access | Description              |
|--------|----------------------|--------|--------------------------|
| POST   | `/api/auth/signup`   | Public | Register a new user      |
| POST   | `/api/auth/login`    | Public | Login and receive token  |

---

### 👥 User Management (By Shreshta)

| Method | Endpoint                   | Access  | Description                          |
|--------|----------------------------|---------|--------------------------------------|
| PUT    | `/api/users/:id/role`      | Admin   | Update user role                     |
| GET    | `/api/users/me`            | User    | View own profile                     |
| PUT    | `/api/users/me/password`   | User    | Change own password                  |
| PUT    | `/api/users/:id/password`  | Admin   | Admin resets any user's password     |
| GET    | `/api/users`               | Admin   | View all registered users            |

---

### 🗕 Event APIs (By Chaitra)

| Method | Endpoint                              | Access           | Description                                |
|--------|----------------------------------------|------------------|--------------------------------------------|
| POST   | `/api/events`                          | Tutor/Admin      | Create a new event                         |
| GET    | `/api/events`                          | Public           | View all events                            |
| GET    | `/api/events/:id`                      | Public           | View specific event                        |
| PUT    | `/api/events/:id`                      | Admin/Instructor | Edit event details                         |
| PUT    | `/api/events/:id/confirm-attendee/:userId` | Admin/Instructor | Confirm a student's attendance         |

---

### 🎟 Booking APIs (By Chaitra)

| Method | Endpoint                         | Access   | Description                             |
|--------|----------------------------------|----------|-----------------------------------------|
| POST   | `/api/events/:id/book`           | User     | Book an event                           |
| GET    | `/api/events/my-bookings`        | User     | View own bookings                       |
| GET    | `/api/events/event/:id/bookings` | Admin/Tutor | View attendees for a specific event |

---

### 📣 Notification APIs (By Shreshta)

| Method | Endpoint                         | Access  | Description                                 |
|--------|----------------------------------|---------|---------------------------------------------|
| POST   | `/api/notifications`             | Admin   | Send in-app or email notifications          |
| GET    | `/api/notifications`             | User    | View personal notifications                 |
| POST   | `/api/notifications/:id/resend`  | Admin   | Resend a previously sent notification       |

---

## 🗂 Folder Structure

```
seet-lab-backend/
├── controllers/          # All business logic
├── middleware/           # Auth & role checks
├── models/               # Mongoose schemas
├── routes/               # Route definitions
├── utils/                # Helpers (e.g. emailService)
├── .env.example
├── index.js
```

---

## 🧪 Test Users

You can use `POST /signup` to create users with default role `User`. To create Admin or Tutor, use the **role update route**:

```http
PUT /api/users/<user_id>/role
Authorization: Bearer <admin_token>
Body: { "role": "Admin" }
```

---

## 📨 Email Configuration

Emails are sent via Gmail SMTP. Use an App Password from [Google Security](https://myaccount.google.com/apppasswords) and store in `.env`.

---

## 👩‍💻 Contributors

| Name      | Responsibilities                            |
|-----------|---------------------------------------------|
| Chaitra   | Events, Bookings, Attendee Management       |
| Shreshta  | Auth, User Admin Tools, Notifications       |

---

## 📜 License

MIT License – you are free to use and adapt.

