import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-pink-100 flex flex-col">
      <Navbar />
      <motion.div
        className="flex flex-col items-center justify-center flex-grow text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 drop-shadow-xl">
          Welcome to SEET LAB
        </h1>
        <p className="text-lg text-gray-700 mb-10 max-w-md">
          Discover, organize, and manage academic events with ease.
        </p>
        <div className="flex gap-6">
          <Link to="/choose-role?action=login">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 shadow-lg">
              Login
            </button>
          </Link>
          <Link to="/choose-role?action=signup">
            <button className="px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300 shadow-lg">
              Sign Up
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
