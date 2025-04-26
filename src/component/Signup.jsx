import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Signup() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get("role"); // 'USER', 'ADMIN', 'INSTRUCTOR'

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("Signing up as role:", role);
    // add signup logic here
  };

  return (
    <div className="h-screen w-full flex flex-col md:flex-row">
      {/* LEFT COLUMN */}
      <div className="md:w-1/2 h-full bg-green-600 flex flex-col items-center justify-center p-8">
        <h2 className="text-white text-3xl font-bold mb-6">Join Us</h2>
        <button className="bg-white text-green-600 w-64 py-2 rounded-full mb-4 shadow hover:bg-gray-100 transition">
          Sign Up with Google
        </button>
        <button className="bg-white text-green-600 w-64 py-2 rounded-full shadow hover:bg-gray-100 transition">
          Sign Up with Facebook
        </button>
      </div>

      {/* RIGHT COLUMN */}
      <div className="md:w-1/2 h-full flex items-center justify-center bg-white relative">
        <div className="absolute top-4 right-4">
          <Link to="/login" className="text-green-600 hover:underline font-medium">
            Login
          </Link>
        </div>

        <form
          onSubmit={handleSignup}
          className="w-full max-w-sm p-8 shadow-lg rounded"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Register {role ? `as ${role}` : ""}
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <input
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-1" htmlFor="confirm">
              Confirm Password
            </label>
            <input
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              type="password"
              id="confirm"
              placeholder="••••••••"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition mb-3">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
