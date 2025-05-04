// src/pages/InstructorProfile.jsx
import { useState, useEffect } from "react";
import API from "../utils/api";
import InstructorNavbar from "./InstructorNavbar";
import { toast, Toaster } from "react-hot-toast";

function InstructorProfile() {
  const [profile, setProfile] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/users/me");
      setProfile(res.data);
    } catch (err) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      return toast.error("New password must be at least 6 characters.");
    }

    if (!currentPassword) {
      return toast.error("Please enter your current password.");
    }

    try {
      await API.put("/users/me/password", {
        currentPassword,
        newPassword,
      });
      toast.success("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change password");
    }
  };

  if (loading) return <p className="p-6 text-gray-600">Loading profile...</p>;

  return (
    <div className="min-h-screen bg-orange-50">
      <InstructorNavbar />
      <Toaster position="top-center" />
      <div className="max-w-3xl mx-auto mt-10 bg-white shadow p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-orange-700 mb-4">Instructor Profile</h2>
        {profile ? (
          <div className="space-y-4">
            <p><span className="font-medium">Name:</span> {profile.name}</p>
            <p><span className="font-medium">Email:</span> {profile.email}</p>
            <p><span className="font-medium">Role:</span> {profile.role}</p>

            <form onSubmit={handlePasswordChange} className="mt-6 space-y-4">
              <label className="block font-medium">Change Password</label>
              <input
                type="password"
                placeholder="Current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
              />
              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
              />
              <button
                type="submit"
                className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
              >
                Update Password
              </button>
            </form>
          </div>
        ) : (
          <p className="text-red-600">Profile could not be loaded.</p>
        )}
      </div>
    </div>
  );
}

export default InstructorProfile;
