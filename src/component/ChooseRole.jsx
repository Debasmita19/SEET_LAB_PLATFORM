import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";
import { motion } from "framer-motion";

const ChooseRole = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const action = new URLSearchParams(search).get("action") || "login";
  const [role, setRole] = useState("admin");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/${role}/${action}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <motion.div
        className="flex flex-grow items-center justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-xl w-full max-w-sm text-center"
        >
          <h2 className="text-2xl font-bold mb-6 text-purple-700">
            Choose Your Role to {action}
          </h2>
          <label className="block mb-2 text-gray-600 text-left">Role:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full mb-6 border border-purple-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="instructor">Instructor</option>
          </select>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Proceed
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ChooseRole;
