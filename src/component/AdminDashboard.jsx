import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminDashboard() {
  const navigate = useNavigate();
  const [adminEmail, setAdminEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
    const email = localStorage.getItem("adminEmail");

    if (!isLoggedIn) {
      navigate("/admin/login");
    }
    if (email) {
      setAdminEmail(email);
    }

    
    setUsers([
      { id: 1, name: "User 1", email: "user1@example.com" },
      { id: 2, name: "User 2", email: "user2@example.com" },
      { id: 3, name: "User 3", email: "user3@example.com" },
    ]);

   
    setNotifications([
      { id: 1, message: "New user signed up: John Doe", date: "2025-04-28" },
      { id: 2, message: "New event scheduled: Tech Summit", date: "2025-05-01" },
    ]);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    localStorage.removeItem("adminEmail");
    navigate('/admin/login');
  };

  const handleUserClick = (userId) => {
    setSelectedUser(selectedUser === userId ? null : userId);
  };

  const handleUpdate = async (userId) => {
    alert(`Update user ${userId}`);
    await sendNotificationEmail(
      "User Updated",
      `Admin updated details of User ID: ${userId}`
    );
  };

  const handleDelete = async (userId) => {
    alert(`Delete user ${userId}`);
    await sendNotificationEmail(
      "User Deleted",
      `Admin deleted User ID: ${userId}`
    );
  };

  
  const sendNotificationEmail = async (subject, message) => {
    try {
      await axios.post('http://localhost:5000/api/notify', {
        subject,
        message,
      });
      console.log('Notification email sent successfully!');
    } catch (error) {
      console.error('Failed to send notification email', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      
      <div className="w-64 bg-blue-700 text-white flex flex-col">
        <div className="text-3xl font-bold p-6 border-b border-blue-500">
          Admin Panel
        </div>
        <nav className="flex flex-col p-4 gap-4 text-lg">
          <a href="#" className="hover:bg-blue-600 p-2 rounded">Dashboard</a>
          <a href="#" className="hover:bg-blue-600 p-2 rounded">Manage Users</a>
          <a href="#" className="hover:bg-blue-600 p-2 rounded">Notifications</a>
          <a href="#" className="hover:bg-blue-600 p-2 rounded">Settings</a>
        </nav>
      </div>

      
      <div className="flex-1 flex flex-col">
        
        <div className="bg-white shadow-md p-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            {adminEmail && (
              <p className="text-sm text-gray-600">Welcome, {adminEmail}</p>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Side - Users and Notifications */}
          <div className="col-span-2 flex flex-col gap-6">
            {/* Manage Users Section */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Manage Users</h2>
              <div className="flex flex-col gap-4">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className={`p-4 border rounded-lg ${selectedUser === user.id ? 'bg-blue-100' : 'bg-gray-100'}`}
                  >
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => handleUserClick(user.id)}
                    >
                      <div>
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-sm text-gray-600">{user.email}</div>
                      </div>
                      <div className="text-blue-600 font-bold text-lg">{selectedUser === user.id ? "-" : "+"}</div>
                    </div>

                    {selectedUser === user.id && (
                      <div className="flex gap-4 mt-4">
                        <button
                          onClick={() => handleUpdate(user.id)}
                          className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Notifications</h2>
              <ul className="space-y-4">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <li key={notification.id} className="p-4 bg-gray-100 rounded shadow">
                      <div className="font-medium">{notification.message}</div>
                      <div className="text-xs text-gray-500">{notification.date}</div>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500">No notifications yet.</p>
                )}
              </ul>
            </div>
          </div>

          
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Events</h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-100 rounded">
                <h3 className="font-semibold">Tech Meetup</h3>
                <p className="text-sm text-gray-600">March 30, 2025</p>
              </div>
              <div className="p-4 bg-blue-100 rounded">
                <h3 className="font-semibold">Workshop: AI in Healthcare</h3>
                <p className="text-sm text-gray-600">April 5, 2025</p>
              </div>
              <div className="p-4 bg-blue-100 rounded">
                <h3 className="font-semibold">Annual Hackathon</h3>
                <p className="text-sm text-gray-600">April 15-16, 2025</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
