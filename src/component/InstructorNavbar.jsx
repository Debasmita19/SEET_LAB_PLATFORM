// src/components/InstructorNavbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import purdueLogo from "../assets/pfw.jpg";

function InstructorNavbar() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    setEmail(storedEmail);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    navigate("/instructor/login");
  };

  return (
    <nav className="bg-orange-600 text-white shadow px-6 py-3 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <img src={purdueLogo} alt="PFW Logo" className="h-10 rounded" />
        <h1 className="font-bold text-xl tracking-wide">Instructor Portal</h1>
      </div>
      <div className="flex gap-6 items-center">
        <Link to="/instructor/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/instructor/profile" className="hover:underline">Profile</Link>
        <button
          onClick={handleLogout}
          className="bg-white text-orange-600 px-3 py-1 rounded hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default InstructorNavbar;
