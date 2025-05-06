 SEET LAB PLATFORM 🎓

A full-stack web application that enables Instructors to create events, Students to register and view them, and Admins to manage users and activities. The platform uses MongoDb for data persistence, Express.js as the backend framework, and React.js for the frontend.

Features

 Instructor
- Create and manage events
- View own events
- Update or delete events they created

Student
- Register and login securely
- View all available events
- Register for events

Admin
- View and manage all users
- Edit or delete any event
- Assign roles to users
Tech Stack

| Layer             | Technology         |
|-------------      |--------------------|
| Frontend          | React.js, Tailwind CSS |
| Backend           | Node.js, Express.js |
| Database          | MongoDB Atlas       |
| Authentication    | JWT (JSON Web Tokens) |
| Password Security | bcrypt          |


Authentication & Authorization

- **bcrypt** is used to hash passwords before storing them in the database.
- **JWT** is used to sign and verify user sessions.
- Middleware ensures that:
  - Only authenticated users access protected routes.
  - Role-based access (Admin, Instructor, Student) is enforced.

CRUD Operations

Events
Create: `POST /api/events` → Instructors & Admin only
Read: 
  - `GET /api/events` → All users
  - `GET /api/events/:id` → Event details
  Update: `PUT /api/events/:id` → Instructors/Admin who created it
  Delete: `DELETE /api/events/:id` → Instructors/Admin

Users
Create: `POST /api/users/register` → New user signup
Read: `GET /api/users/me` → Authenticated user info
Update: `PUT /api/users/:id` → Admin only
Delete: `DELETE /api/users/:id` → Admin only

Setup Instructions

Backend

```bash
cd backend
npm install
npm run dev

Create a .env file with:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Frontend

cd frontend
npm install
npm run dev
# React + Vite

This project is licensed under the MIT License.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
