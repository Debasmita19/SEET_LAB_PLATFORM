// ./components/Navbar.jsx
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="w-full bg-white shadow-md px-6 py-3 flex justify-between items-center">
    <h1 className="text-xl font-bold text-purple-700">SEET LAB</h1>
    <div className="space-x-4">
      <Link to="/" className="text-gray-700 hover:text-purple-700">Home</Link>
      <Link to="/choose-role?action=login" className="text-gray-700 hover:text-purple-700">Login</Link>
      <Link to="/choose-role?action=signup" className="text-gray-700 hover:text-purple-700">Sign Up</Link>
    </div>
  </nav>
);

export default Navbar;
