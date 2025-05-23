// src/components/modals/EditEventModal.jsx
import { useState, useEffect } from "react";
import API from "../../utils/api";
import { toast } from "react-toastify";

function EditEventModal({ event, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
    tags: "",
    capacity: 100,
  });

  useEffect(() => {
    if (event && Object.keys(event).length > 0) {
      // Editing existing event
      setFormData({
        title: event.title || "",
        description: event.description || "",
        date: event.date?.slice(0, 10) || "",
        time: event.time || "",
        location: event.location || "",
        category: event.category || "",
        tags: event.tags?.join(", ") || "",
        capacity: event.capacity || 100,
      });
    } else {
      // Creating new event
      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        category: "",
        tags: "",
        capacity: 100,
      });
    }
  }, [event]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedEvent = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    try {
      if (event && event._id) {
        await API.put(`/events/${event._id}`, updatedEvent);
        toast.success("Event updated successfully!");
      } else {
        await API.post("/events", updatedEvent);
        toast.success("Event created successfully!");
      }

      onUpdate(); // Refresh events
      onClose();  // Close modal
    } catch (error) {
      console.error("Save failed", error);
      toast.error("Failed to save the event. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-lg relative p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-orange-700">
            {event && event._id ? "Edit Event" : "Create Event"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-xl font-bold"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required className="w-full border px-4 py-2 rounded" />
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required rows="3" className="w-full border px-4 py-2 rounded" />
          <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full border px-4 py-2 rounded" />
          <input type="time" name="time" value={formData.time} onChange={handleChange} required className="w-full border px-4 py-2 rounded" />
          <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" required className="w-full border px-4 py-2 rounded" />
          <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="w-full border px-4 py-2 rounded" />
          <input name="tags" value={formData.tags} onChange={handleChange} placeholder="Tags (comma separated)" className="w-full border px-4 py-2 rounded" />
          <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} placeholder="Capacity" className="w-full border px-4 py-2 rounded" />

          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEventModal;
