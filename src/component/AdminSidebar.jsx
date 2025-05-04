// src/components/AdminSidebar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminSidebar() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <aside className="w-64 bg-gray-900 text-white p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <nav className="space-y-4">
        <button onClick={() => handleNavigate("/admin/dashboard")} className="block w-full text-left hover:text-orange-400">Dashboard</button>
        <button onClick={() => handleNavigate("/admin/manage-users?role=User")} className="block w-full text-left hover:text-orange-400">Manage Users</button>
        <button onClick={() => handleNavigate("/admin/manage-users?role=Instructor")} className="block w-full text-left hover:text-orange-400">Manage Instructors</button>
        <button onClick={() => handleNavigate("/admin/manage-events")} className="block w-full text-left hover:text-orange-400">Manage Events</button>
      </nav>
    </aside>
  );
}

export default AdminSidebar;
