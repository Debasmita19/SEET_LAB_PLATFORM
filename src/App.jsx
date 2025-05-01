import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import ChooseRole from "./component/ChooseRole";
import AdminLogin from "./component/AdminLogin";
import AdminSignup from "./component/AdminSignup";
import AdminDashboard from "./component/AdminDashboard";  // ✅ new import
import InstructorDashboard from "./component/InstructorDashboard";
import UserLogin from "./component/UserLogin";
import UserSignup from "./component/UserSignup";
import InstructorLogin from "./component/InstructorLogin";
import InstructorSignup from "./component/InstructorSignup";
import UserDashboard from "./component/UserDashboard";

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
        <Route path="/admin/dashboard" element={<AdminDashboard />} /> {/* ✅ New Route */}

        {/* User */}
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/signup" element={<UserSignup />} />
        <Route path="/user/dashboard" element={<UserDashboard/>} />

        {/* Instructor */}
        <Route path="/instructor/login" element={<InstructorLogin />} />
        <Route path="/instructor/signup" element={<InstructorSignup />} />
        <Route path ="/instructor/dashboard" element={<InstructorDashboard/> }/>
      </Routes>
    </Router>
  );
}

export default App;
