// src/components/UserProfile.jsx
import { useState, useEffect } from "react";
import { getAuth } from "../utils/auth";
import API from "../utils/api";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import UserNavbar from "./UserNavbar";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/users/me");
        setUser(res.data);
      } catch (err) {
        toast.error("Failed to fetch user profile");
      }
    };
    fetchUser();
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }
  
    try {
      await API.put("/users/me/password", {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });
      toast.success("Password updated successfully!");
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Password update failed");
    }
  };  

  return (
    <div className="min-h-screen bg-gray-50">
      <UserNavbar />
      <Toaster position="top-center" />
      <div className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6">My Profile</h1>

        {user && (
          <div className="bg-white p-6 rounded shadow mb-10">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        )}

        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Change Password</h2>
        <form onSubmit={handlePasswordChange} className="bg-white p-6 rounded shadow space-y-4">
          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserProfile;
