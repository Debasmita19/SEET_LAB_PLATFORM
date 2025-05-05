// src/components/InstructorDashboard.jsx
import { useState, useEffect } from "react";
import Navbar from "./InstructorNavbar";
import API from "../utils/api";
import EditEventModal from "./modals/EditEventModal";
import ConfirmAttendeesModal from "./modals/ConfirmAttendeesModal";
import DeleteModal from "./modals/DeleteModal";

function InstructorDashboard() {
  const [events, setEvents] = useState([]);
  const [editModalEvent, setEditModalEvent] = useState(null);
  const [confirmModalEvent, setConfirmModalEvent] = useState(null);
  const [deleteModalEvent, setDeleteModalEvent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await API.get("/events/my");
      setEvents(res.data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
      setError("Unable to fetch events.");
    }
  };

  const handleDelete = async (eventId) => {
    try {
      //await API.delete(`/events/${eventId}`);
      fetchEvents();
    } catch (err) {
      alert("Failed to delete event");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <Navbar />
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-orange-800">My Events</h2>
          <button
            onClick={() => setEditModalEvent({})}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg text-lg shadow"
          >
            + Create Event
          </button>
        </div>

        {error ? (
          <p className="text-red-600 font-medium">{error}</p>
        ) : events.length === 0 ? (
          <p className="text-gray-600">No events created yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 relative"
              >
                <h3 className="text-2xl font-semibold text-orange-700 mb-1">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  📅 {new Date(event.date).toLocaleDateString()} at ⏰ {event.time}
                </p>
                <p className="text-sm text-gray-500 mb-1">📍 {event.location}</p>
                <p className="text-sm text-gray-500 mb-2">
                  🏷️{" "}
                  <span className="bg-gray-200 rounded px-2 py-0.5 text-xs">
                    {event.category}
                  </span>
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {event.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 mt-2">
                  <button
                    onClick={() => setEditModalEvent(event)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => setConfirmModalEvent(event)}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-1.5 rounded-md text-sm"
                  >
                    ✅ Confirm
                  </button>
                  <button
                    onClick={() => setDeleteModalEvent(event)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md text-sm"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {editModalEvent !== null && (
          <EditEventModal
            event={editModalEvent}
            onClose={() => setEditModalEvent(null)}
            onUpdate={fetchEvents}
          />
        )}

        {confirmModalEvent && (
          <ConfirmAttendeesModal
            event={confirmModalEvent}
            onClose={() => setConfirmModalEvent(null)}
            onConfirm={fetchEvents}
          />
        )}

        {deleteModalEvent && (
          <DeleteModal
            event={deleteModalEvent}
            onClose={() => setDeleteModalEvent(null)}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}

export default InstructorDashboard;
