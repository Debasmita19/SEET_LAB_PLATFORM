import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function ChooseRole() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // e.g. "login" or "signup"
  const action = queryParams.get("action") || "login";

  const [role, setRole] = useState("admin");

  const handleSubmit = (e) => {
    e.preventDefault();
    // e.g. if role=admin and action=login -> /admin/login
    navigate(`/${role}/${action}`);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Choose Your Role
        </h2>
        <label className="block mb-2 text-gray-700">Role:</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full mb-4 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="instructor">Instructor</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Proceed
        </button>
      </form>
    </div>
  );
}

export default ChooseRole;
