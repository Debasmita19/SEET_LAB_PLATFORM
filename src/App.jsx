import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import ChooseRole from "./component/ChooseRole";
import AdminLogin from "./component/AdminLogin";
import AdminSignup from "./component/AdminSignup";
import UserLogin from "./component/UserLogin";
import UserSignup from "./component/UserSignup";
import InstructorLogin from "./component/InstructorLogin";
import InstructorSignup from "./component/InstructorSignup";

function App() {
  return (
    <Router>
      <Routes>
        {/* 1. Home */}
        <Route path="/" element={<Home />} />

        {/* 2. Choose Role Page */}
        <Route path="/choose-role" element={<ChooseRole />} />

        {/* 3. Admin Pages */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />

        {/* 4. User Pages */}
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/signup" element={<UserSignup />} />

        {/* 5. Instructor Pages */}
        <Route path="/instructor/login" element={<InstructorLogin />} />
        <Route path="/instructor/signup" element={<InstructorSignup />} />
      </Routes>
    </Router>
  );
}

export default App;
