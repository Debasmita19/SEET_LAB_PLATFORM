// src/pages/ManageUsers.jsx
import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import AdminSidebar from './AdminSidebar';
import { useSearchParams } from 'react-router-dom';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [filterRole, setFilterRole] = useState('All');
// inside ManageUsers component
const [searchParams] = useSearchParams();
const roleFromQuery = searchParams.get("role");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (roleFromQuery) setFilterRole(roleFromQuery);
  }, [roleFromQuery]);

  const fetchUsers = async () => {
    try {
      const res = await API.get('/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const handleOpenModal = async (user) => {
    try {
      const res = await API.get(`/users/${user._id}`);
      setSelectedUser(res.data);
      setModalOpen(true);
    } catch (err) {
      console.error('Error fetching user details:', err);
    }
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setModalOpen(false);
  };

  const handleSaveChanges = async () => {
    try {
      await API.put(`/users/${selectedUser._id}`, selectedUser);
      fetchUsers();
      handleCloseModal();
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  const filteredUsers =
    filterRole === 'All' ? users : users.filter((user) => user.role === filterRole);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 bg-gray-100 p-8 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Manage Users</h1>
          <select
            className="border px-3 py-2 rounded"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="All">All</option>
            <option value="User">Students</option>
            <option value="Instructor">Instructors</option>
            <option value="Admin">Admins</option>
          </select>
        </div>

        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Role</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td className="py-2 px-4 border">{user.name}</td>
                <td className="py-2 px-4 border">{user.email}</td>
                <td className="py-2 px-4 border">{user.role}</td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => handleOpenModal(user)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal */}
        {modalOpen && selectedUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
              <h2 className="text-lg font-bold mb-4">Edit User</h2>
              <label className="block mb-2">
                Name:
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                />
              </label>
              <label className="block mb-2">
                Email:
                <input
                  type="email"
                  className="w-full border px-3 py-2 rounded"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                />
              </label>
              <label className="block mb-4">
                Role:
                <select
                  className="w-full border px-3 py-2 rounded"
                  value={selectedUser.role}
                  onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                >
                  <option value="User">Student</option>
                  <option value="Instructor">Instructor</option>
                  <option value="Admin">Admin</option>
                </select>
              </label>
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleCloseModal}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveChanges}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default ManageUsers;
