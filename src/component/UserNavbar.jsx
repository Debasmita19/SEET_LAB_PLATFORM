// src/components/UserNavbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function UserNavbar() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (!storedEmail) navigate("/user/login");
    else setEmail(storedEmail);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    navigate("/user/login");
  };

  return (
    <nav className="w-full bg-indigo-700 text-white px-6 py-3 shadow-md flex justify-between items-center">
      <div className="text-lg font-bold">SEET LAB</div>
      <div className="flex items-center gap-6 text-sm">
        <Link to="/user/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <Link to="/user/profile" className="hover:underline">
          My Profile
        </Link>
        <span className="text-gray-300 hidden md:inline">{email}</span>
        <button onClick={handleLogout} className="bg-white text-indigo-700 px-3 py-1 rounded hover:bg-gray-100">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default UserNavbar;
