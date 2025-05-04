// src/components/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import AdminSidebar from './AdminSidebar';

function AdminDashboard() {
  const navigate = useNavigate();
  const [adminEmail, setAdminEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const authEmail = localStorage.getItem("userEmail");
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");

    if (!token || role !== "Admin") {
      navigate("/admin/login");
      return;
    }

    if (authEmail) {
      setAdminEmail(authEmail);
    }

    fetchUsersAndEvents();
  }, []);

  const fetchUsersAndEvents = async () => {
    try {
      const usersRes = await API.get("/users");
      const eventsRes = await API.get("/events");
      setUsers(usersRes.data);
      setEvents(eventsRes.data);
    } catch (error) {
      console.error("Failed to load data", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/admin/login');
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  const instructorCount = users.filter(u => u.role === "Instructor").length;
  const studentCount = users.filter(u => u.role === "User").length;
  const eventCount = events.length;

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 bg-gray-100 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
            <p className="text-sm text-gray-500">Logged in as: {adminEmail}</p>
          </div>
          <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded shadow">
            Logout
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-blue-600 text-white p-6 rounded-lg shadow hover:shadow-md cursor-pointer" onClick={() => navigateTo("/admin/manage-users?role=Instructor")}>  
            <h3 className="text-lg font-bold">Total Instructors</h3>
            <p className="text-2xl font-semibold mt-2">{instructorCount}</p>
          </div>
          <div className="bg-green-600 text-white p-6 rounded-lg shadow hover:shadow-md cursor-pointer" onClick={() => navigateTo("/admin/manage-users?role=User")}>  
            <h3 className="text-lg font-bold">Total Students</h3>
            <p className="text-2xl font-semibold mt-2">{studentCount}</p>
          </div>
          <div className="bg-purple-600 text-white p-6 rounded-lg shadow hover:shadow-md cursor-pointer" onClick={() => navigateTo("/admin/manage-events")}>  
            <h3 className="text-lg font-bold">Total Events</h3>
            <p className="text-2xl font-semibold mt-2">{eventCount}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div onClick={() => navigateTo("/admin/manage-users?role=User")} className="bg-blue-100 border border-blue-300 p-6 rounded-lg shadow hover:bg-blue-200 cursor-pointer">
            <h4 className="text-lg font-bold text-blue-800">Manage Users</h4>
            <p className="text-sm text-blue-700 mt-2">View and manage student accounts.</p>
          </div>
          <div onClick={() => navigateTo("/admin/manage-users?role=Instructor")} className="bg-blue-100 border border-blue-300 p-6 rounded-lg shadow hover:bg-blue-200 cursor-pointer">
            <h4 className="text-lg font-bold text-blue-800">Manage Instructors</h4>
            <p className="text-sm text-blue-700 mt-2">Filter by instructors only.</p>
          </div>
          <div onClick={() => navigateTo("/admin/manage-events")} className="bg-purple-100 border border-purple-300 p-6 rounded-lg shadow hover:bg-purple-200 cursor-pointer">
            <h4 className="text-lg font-bold text-purple-800">Manage Events</h4>
            <p className="text-sm text-purple-700 mt-2">Edit, approve, or remove events.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
