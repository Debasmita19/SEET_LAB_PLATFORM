import { Link } from "react-router-dom";

function Layout({ children }) {
  return (
    <div>
      <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">SEET LAB PLATFORM</Link>
        </div>
        <div className="flex gap-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/signup" className="hover:underline">Signup</Link>
        </div>
      </nav>
      <div className="p-4">{children}</div>
    </div>
  );
}

export default Layout;
