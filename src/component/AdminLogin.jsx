import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAdminLogin = (e) => {
    e.preventDefault();
    console.log("Admin login:", { username, password });

    
    const dummyEmail = "admin@example.com";
    const dummyPassword = "admin123";

    if (username === dummyEmail && password === dummyPassword) {
      
      localStorage.setItem("isAdminLoggedIn", "true");
      localStorage.setItem("adminEmail", username);

      
      navigate("/admin/dashboard");
    } else {
      alert("Invalid username or password!"); 
    }
  };

  return (
    <div className="h-screen w-full flex flex-col md:flex-row">
     
      <div className="md:w-1/2 h-full bg-blue-600 flex flex-col items-center justify-center p-8">
        <h2 className="text-white text-3xl font-bold mb-6">Admin Portal</h2>
        <button className="bg-white text-blue-600 w-64 py-2 rounded-full mb-4 shadow hover:bg-gray-100 transition">
          Sign in with Google
        </button>
        <button className="bg-white text-blue-600 w-64 py-2 rounded-full shadow hover:bg-gray-100 transition">
          Sign in with Facebook
        </button>
      </div>

      
      <div className="md:w-1/2 h-full flex items-center justify-center bg-white">
        <form
          onSubmit={handleAdminLogin}
          className="w-full max-w-sm p-8 shadow-lg rounded"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin Login</h2>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              placeholder="admin@example.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mb-3">
            Sign In
          </button>

          <div className="flex justify-between text-sm">
            <Link to="/choose-role?action=login" className="text-blue-600 hover:underline">
              Switch Role
            </Link>
            <Link to="/admin/signup" className="text-blue-600 hover:underline">
              Need an Admin Account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
