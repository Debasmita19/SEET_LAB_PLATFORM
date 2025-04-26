import { useState } from "react";
import { Link } from "react-router-dom";

function InstructorSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleInstructorSignup = (e) => {
    e.preventDefault();
    console.log("Instructor signup:", { email, password, confirm });
    // Add instructor signup logic here
  };

  return (
    <div className="h-screen w-full flex flex-col md:flex-row">
      {/* LEFT COLUMN: Instructor Portal */}
      <div className="md:w-1/2 h-full bg-orange-600 flex flex-col items-center justify-center p-8">
        <h2 className="text-white text-3xl font-bold mb-6">Join Instructor Portal</h2>
        <button className="bg-white text-orange-600 w-64 py-2 rounded-full mb-4 shadow hover:bg-gray-100 transition">
          Sign Up with Google
        </button>
        <button className="bg-white text-orange-600 w-64 py-2 rounded-full shadow hover:bg-gray-100 transition">
          Sign Up with Facebook
        </button>
      </div>

      {/* RIGHT COLUMN: Signup Form */}
      <div className="md:w-1/2 h-full flex items-center justify-center bg-white">
        <form onSubmit={handleInstructorSignup} className="w-full max-w-sm p-8 shadow-lg rounded">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Instructor Signup</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="instructor@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <button className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition mb-3">
            Create Account
          </button>
          <div className="flex justify-between text-sm">
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
  );
}

export default InstructorSignup;
