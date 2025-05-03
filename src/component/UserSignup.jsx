// src/components/UserSignup.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import purdueLogo from "../assets/pfw.jpg";
import Navbar from "./Navbar"; // Assuming you have a shared navbar
import API from "../utils/api";
import { getAuth } from "../utils/auth";

function UserSignup() {
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
      const res = await API.post("/auth/signup", { name, email, password, role:"User"});
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userRole", user.role);
      navigate("/user/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)]">
        <div className="md:w-1/2 bg-gray-100 flex flex-col items-center justify-center p-8">
          <img src={purdueLogo} alt="Purdue Logo" className="w-60 mb-6" />
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            SEET LAB Activities & Events Portal
          </h2>
          <p className="mt-4 text-gray-600 text-center text-sm max-w-xs">
            Join Purdue's interactive learning community.
          </p>
        </div>

        <div className="md:w-1/2 flex items-center justify-center p-10">
          <form
            onSubmit={handleSignup}
            className="w-full max-w-md bg-white p-8 shadow-md rounded"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">User Signup</h2>

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full mb-4 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mb-4 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mb-4 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              className="w-full mb-6 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
            >
              Create Account
            </button>
            <div className="mt-4 text-sm flex justify-between">
              <Link to="/choose-role?action=signup" className="text-indigo-600 hover:underline">
                Switch Role
              </Link>
              <Link to="/user/login" className="text-indigo-600 hover:underline">
                Already have an account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserSignup;
