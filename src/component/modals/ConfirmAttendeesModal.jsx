
// src/components/modals/ConfirmAttendeesModal.jsx
import { useEffect, useState } from "react";
import API from "../../utils/api";

function ConfirmAttendeesModal({ event, onClose }) {
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    fetchAttendees();
  }, []);

  const fetchAttendees = async () => {
    try {
      const res = await API.get(`/events/${event._id}`);
      setAttendees(res.data.confirmedAttendees || []);
    } catch (err) {
      console.error("Failed to load attendees");
    }
  };

  const confirmAttendee = async (userId) => {
    try {
      await API.put(`/events/${event._id}/confirm-attendee/${userId}`);
      fetchAttendees();
    } catch (err) {
      alert("Error confirming attendee");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl">
        <h2 className="text-xl font-bold text-indigo-700 mb-4">
          Confirm Attendees - {event.title}
        </h2>

        {attendees.length === 0 ? (
          <p className="text-gray-600">No attendees registered yet.</p>
        ) : (
          <ul className="space-y-3 max-h-64 overflow-y-auto">
            {attendees.map((attendee) => (
              <li key={attendee._id} className="flex justify-between items-center p-2 bg-gray-50 border rounded">
                <div>
                  <p className="font-medium text-gray-800">{attendee.name}</p>
                  <p className="text-sm text-gray-500">{attendee.email}</p>
                </div>
                <button
                  onClick={() => confirmAttendee(attendee._id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                >
                  Confirm
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-100">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmAttendeesModal;
