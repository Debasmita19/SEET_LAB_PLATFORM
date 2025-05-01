import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function InstructorLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleInstructorLogin = (e) => {
    e.preventDefault();
    console.log("Instructor login:", { username, password });

    const dummyEmail = "instructor@example.com";
    const dummyPassword = "instructor123";

    if (username === dummyEmail && password === dummyPassword) {
      localStorage.setItem("isInstructorLoggedIn", "true");
      localStorage.setItem("instructorEmail", username);

      navigate("/instructor/dashboard");
    } else {
      alert("Invalid instructor credentials!");
    }
  };

  return (
    <div className="h-screen w-full flex flex-col md:flex-row">
      {/* LEFT COLUMN */}
      <div className="md:w-1/2 h-full bg-orange-600 flex flex-col items-center justify-center p-8">
        <h2 className="text-white text-3xl font-bold mb-6">Instructor Portal</h2>
        <button className="bg-white text-orange-600 w-64 py-2 rounded-full mb-4 shadow hover:bg-gray-100 transition">
          Sign in with Google
        </button>
        <button className="bg-white text-orange-600 w-64 py-2 rounded-full shadow hover:bg-gray-100 transition">
          Sign in with Facebook
        </button>
      </div>

      {/* RIGHT COLUMN */}
      <div className="md:w-1/2 h-full flex items-center justify-center bg-white">
        <form onSubmit={handleInstructorLogin} className="w-full max-w-sm p-8 shadow-lg rounded">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Instructor Login</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Username</label>
            <input
              type="text"
              placeholder="instructor@example.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <button className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition mb-3">
            Sign In
          </button>
          <div className="flex justify-between text-sm">
            <Link to="/choose-role?action=login" className="text-orange-600 hover:underline">
              Switch Role
            </Link>
            <Link to="/instructor/signup" className="text-orange-600 hover:underline">
              Need an Instructor Account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InstructorLogin;
