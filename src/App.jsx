// ./App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import ChooseRole from "./component/ChooseRole";
import AdminLogin from "./component/AdminLogin";
import AdminSignup from "./component/AdminSignup";
import AdminDashboard from "./component/AdminDashboard";
import InstructorDashboard from "./component/InstructorDashboard";
import UserLogin from "./component/UserLogin";
import UserSignup from "./component/UserSignup";
import UserProfile from "./component/UserProfile";
import InstructorProfile from "./component/InstructorProfile";
import InstructorLogin from "./component/InstructorLogin";
import InstructorSignup from "./component/InstructorSignup";
import UserDashboard from "./component/UserDashboard";
import ProtectedRoute from "./component/ProtectedRoute";
import Unauthorized from "./component/Unauthorized"; // Add this page separately

function App() {
  return (
    <Router>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Choose Role */}
        <Route path="/choose-role" element={<ChooseRole />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="Admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* User */}
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/signup" element={<UserSignup />} />
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute role="User">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/profile"
          element={
            <ProtectedRoute role="User">
              <UserProfile />
            </ProtectedRoute>
          }
        />

        {/* Instructor */}
        <Route path="/instructor/login" element={<InstructorLogin />} />
        <Route path="/instructor/signup" element={<InstructorSignup />} />
        <Route
          path="/instructor/dashboard"
          element={
            <ProtectedRoute role="Instructor">
              <InstructorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/profile"
          element={
            <ProtectedRoute role="Instructor">
              <InstructorProfile />
            </ProtectedRoute>
          }
        />

<Route
          path="/user/dashboard"
          element={
            <ProtectedRoute role="User">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/profile"
          element={
            <ProtectedRoute role="User">
              <UserProfile />
            </ProtectedRoute>
          }
        />

        {/* Unauthorized Page */}
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </Router>
  );
}

export default App;
