import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-100 to-pink-100">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-8 drop-shadow-lg">
        SEET LAB PLATFORM
      </h1>
      <div className="flex gap-6">
        {}
        <Link to="/choose-role?action=login">
          <button className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 shadow-lg">
            Login
          </button>
        </Link>
        {}
        <Link to="/choose-role?action=signup">
          <button className="px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300 shadow-lg">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
