import React from "react";
import API from "../../utils/api";
import { toast } from "react-toastify";

const DeleteModal = ({ event, onClose, onDelete }) => {
  // Return nothing if event is not defined
  if (!event || !event._id) return null;

  const handleDelete = async () => {
    try {
      await API.delete(`/events/${event._id}`);
      toast.success("Event deleted successfully!");
      onDelete(); // Refresh the list
      onClose();  // Close the modal
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete the event.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-red-600 mb-4">Delete Event</h2>
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete the event{" "}
          <span className="font-semibold">{event.title}</span>?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
