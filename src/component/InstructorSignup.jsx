// src/components/InstructorSignup.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import purdueLogo from "../assets/pfw.jpg";
import Navbar from "./Navbar";
import API from "../utils/api";
import { getAuth } from "../utils/auth";

function InstructorSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    if (auth) {
      if (auth.role === "Admin") navigate("/admin/dashboard");
      else if (auth.role === "Instructor") navigate("/instructor/dashboard");
      else navigate("/user/dashboard");
    }
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }
    try {
      const res = await API.post("/auth/signup", { name, email, password , role:"Instructor"});
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userRole", user.role);
      navigate("/instructor/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)]">
        <div className="md:w-1/2 bg-gradient-to-br from-orange-100 to-white flex flex-col items-center justify-center p-10 relative overflow-hidden">
          <div className="absolute opacity-10 w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${purdueLogo})` }}></div>
          <img src={purdueLogo} alt="Purdue Logo" className="w-52 mb-6 relative z-10" />
          <h2 className="text-3xl font-bold text-gray-800 text-center relative z-10">
            Instructor Registration
          </h2>
          <p className="mt-4 text-gray-700 text-center text-sm max-w-xs relative z-10">
            Sign up to manage your events and attendees.
          </p>
        </div>

        <div className="md:w-1/2 flex items-center justify-center p-10 bg-white">
          <form
            onSubmit={handleSignup}
            className="w-full max-w-md bg-white p-8 shadow-xl rounded-lg border"
          >
            <h2 className="text-2xl font-bold mb-6 text-orange-700">Instructor Signup</h2>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full mb-4 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mb-4 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mb-4 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              className="w-full mb-6 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition shadow"
            >
              Create Account
            </button>
            <div className="mt-4 text-sm flex justify-between">
              <Link to="/choose-role?action=signup" className="text-orange-600 hover:underline">
                Switch Role
              </Link>
              <Link to="/instructor/login" className="text-orange-600 hover:underline">
                Already have an account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default InstructorSignup;
