import { useEffect, useState } from "react";
import API from "../../utils/api";

function ConfirmAttendeesModal({ event, onClose }) {
  const [attendees, setAttendees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAttendees();
  }, []);

  const fetchAttendees = async () => {
    try {
      const res = await API.get(`/booking/event/${event._id}/bookings`);
      setAttendees(res.data.bookings || []);
    } catch (err) {
      console.error("Failed to load attendees");
    }
  };

  const confirmAttendee = async (userId) => {
    try {
      await API.put(`/events/${event._id}/confirm-attendee/${userId}`);
      fetchAttendees();
    } catch (err) {
      const msg = err.response?.data?.message || "Error confirming attendee";
      alert(msg);
    }
  };

  const filtered = attendees.filter((att) =>
    att.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    att.student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 px-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-3xl shadow-xl max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-indigo-700">Confirm Attendees - {event.title}</h2>

        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring"
        />

        {filtered.length === 0 ? (
          <p className="text-gray-600">No matching attendees.</p>
        ) : (
          <table className="w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-2">Name</th>
                <th className="text-left px-4 py-2">Email</th>
                <th className="text-left px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((booking) => (
                <tr key={booking._id} className="border-t">
                  <td className="px-4 py-2">{booking.student.name}</td>
                  <td className="px-4 py-2">{booking.student.email}</td>
                  <td className="px-4 py-2">
                    {event.confirmedAttendees.includes(booking.student._id) ? (
                      <span className="text-green-600 font-medium">Confirmed</span>
                    ) : (
                      <button
                        onClick={() => confirmAttendee(booking.student._id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                      >
                        Confirm
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded border"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmAttendeesModal;
