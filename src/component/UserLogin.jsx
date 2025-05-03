// src/components/UserLogin.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import purdueLogo from "../assets/pfw.jpg";
import Navbar from "./Navbar";
import API from "../utils/api";
import { getAuth } from "../utils/auth";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    if (auth) {
      if (auth.role === "Admin") navigate("/admin/dashboard");
      else if (auth.role === "Instructor") navigate("/instructor/dashboard");
      else navigate("/user/dashboard");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userRole", user.role);
      navigate("/user/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)]">
        <div className="md:w-1/2 bg-gradient-to-br from-yellow-100 to-white flex flex-col items-center justify-center p-10 relative overflow-hidden">
          <div
            className="absolute opacity-10 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${purdueLogo})` }}
          ></div>
          <img src={purdueLogo} alt="Purdue Logo" className="w-52 mb-6 relative z-10" />
          <h2 className="text-3xl font-bold text-gray-800 text-center relative z-10">
            SEET LAB Login
          </h2>
          <p className="mt-4 text-gray-700 text-center text-sm max-w-xs relative z-10">
            Access your personalized learning and events dashboard.
          </p>
        </div>

        <div className="md:w-1/2 flex items-center justify-center p-10 bg-white">
          <form
            onSubmit={handleLogin}
            className="w-full max-w-md bg-white p-8 shadow-xl rounded-lg border"
          >
            <h2 className="text-2xl font-bold mb-6 text-indigo-700">User Login</h2>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mb-4 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mb-6 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition shadow"
            >
              Sign In
            </button>
            <div className="mt-4 text-sm flex justify-between">
              <Link to="/choose-role?action=login" className="text-indigo-600 hover:underline">
                Switch Role
              </Link>
              <Link to="/user/signup" className="text-indigo-600 hover:underline">
                Need a User Account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
