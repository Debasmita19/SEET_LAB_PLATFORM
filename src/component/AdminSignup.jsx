import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 

function AdminSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const navigate = useNavigate(); 

  const handleAdminSignup = (e) => {
    e.preventDefault();
    console.log("Admin signup:", { email, password, confirm });

    if (password !== confirm) {
      alert("Passwords do not match!");
      return;
    }

    
    localStorage.setItem("isAdminLoggedIn", "true");
    localStorage.setItem("adminEmail", email); 

   
    navigate("/admin/dashboard");
  };

  return (
    <div className="h-screen w-full flex flex-col md:flex-row">
      
      <div className="md:w-1/2 h-full bg-green-600 flex flex-col items-center justify-center p-8">
        <h2 className="text-white text-3xl font-bold mb-6">Join Admin Portal</h2>
        <button className="bg-white text-green-600 w-64 py-2 rounded-full mb-4 shadow hover:bg-gray-100 transition">
          Sign Up with Google
        </button>
        <button className="bg-white text-green-600 w-64 py-2 rounded-full shadow hover:bg-gray-100 transition">
          Sign Up with Facebook
        </button>
      </div>

      
      <div className="md:w-1/2 h-full flex items-center justify-center bg-white">
        <form
          onSubmit={handleAdminSignup}
          className="w-full max-w-sm p-8 shadow-lg rounded"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin Signup</h2>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Confirm Password</label>
            <input
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              type="password"
              placeholder="••••••••"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition mb-3">
            Create Admin Account
          </button>

          <div className="flex justify-between text-sm">
            <Link to="/choose-role?action=signup" className="text-green-600 hover:underline">
              Switch Role
            </Link>
            <Link to="/admin/login" className="text-green-600 hover:underline">
              Already Admin?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminSignup;
