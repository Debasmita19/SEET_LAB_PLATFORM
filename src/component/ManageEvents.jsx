// src/pages/ManageEvents.jsx
import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import AdminSidebar from './AdminSidebar';

function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await API.get('/events');
      setEvents(res.data);
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  const handleOpenModal = async (event) => {
    try {
      const eventDetails = await API.get(`/events/${event._id}`);
      const attendeeRes = await API.get(`/booking/event/${event._id}/bookings`);
      setSelectedEvent({
        ...eventDetails.data,
        bookings: attendeeRes.data.bookings || [],
      });
      setModalOpen(true);
    } catch (error) {
      console.error("Error loading event details or attendees", error);
    }
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setModalOpen(false);
  };

  const handleSaveChanges = async () => {
    try {
      await API.put(`/events/${selectedEvent._id}`, selectedEvent);
      fetchEvents();
      handleCloseModal();
    } catch (err) {
      console.error('Error updating event:', err);
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 bg-gray-100 p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Manage Events</h1>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Title</th>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Attendees</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id}>
                <td className="py-2 px-4 border">{event.title}</td>
                <td className="py-2 px-4 border">{new Date(event.date).toLocaleDateString()}</td>
                <td className="py-2 px-4 border">{event.confirmedAttendees?.length || 0}</td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => handleOpenModal(event)}
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
        {modalOpen && selectedEvent && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md overflow-y-auto max-h-[90vh]">
              <h2 className="text-lg font-bold mb-4">Edit Event</h2>

              <label className="block mb-2">Title:
                <input type="text" className="w-full border px-3 py-2 rounded" value={selectedEvent.title || ''} onChange={(e) => setSelectedEvent({ ...selectedEvent, title: e.target.value })} />
              </label>

              <label className="block mb-2">Description:
                <textarea className="w-full border px-3 py-2 rounded" value={selectedEvent.description || ''} onChange={(e) => setSelectedEvent({ ...selectedEvent, description: e.target.value })} />
              </label>

              <label className="block mb-2">Category:
                <input type="text" className="w-full border px-3 py-2 rounded" value={selectedEvent.category || ''} onChange={(e) => setSelectedEvent({ ...selectedEvent, category: e.target.value })} />
              </label>

              <label className="block mb-2">Tags (comma separated):
                <input type="text" className="w-full border px-3 py-2 rounded" value={selectedEvent.tags?.join(', ') || ''} onChange={(e) => setSelectedEvent({ ...selectedEvent, tags: e.target.value.split(',').map(tag => tag.trim()) })} />
              </label>

              <label className="block mb-2">Date:
                <input type="date" className="w-full border px-3 py-2 rounded" value={selectedEvent.date ? selectedEvent.date.split('T')[0] : ''} onChange={(e) => setSelectedEvent({ ...selectedEvent, date: e.target.value })} />
              </label>

              <label className="block mb-2">Time:
                <input type="time" className="w-full border px-3 py-2 rounded" value={selectedEvent.time || ''} onChange={(e) => setSelectedEvent({ ...selectedEvent, time: e.target.value })} />
              </label>

              <label className="block mb-2">Location:
                <input type="text" className="w-full border px-3 py-2 rounded" value={selectedEvent.location || ''} onChange={(e) => setSelectedEvent({ ...selectedEvent, location: e.target.value })} />
              </label>

              <label className="block mb-2">Banner Image URL:
                <input type="text" className="w-full border px-3 py-2 rounded" value={selectedEvent.bannerImage || ''} onChange={(e) => setSelectedEvent({ ...selectedEvent, bannerImage: e.target.value })} />
              </label>

              <label className="block mb-2">Capacity:
                <input type="number" className="w-full border px-3 py-2 rounded" value={selectedEvent.capacity || 0} onChange={(e) => setSelectedEvent({ ...selectedEvent, capacity: parseInt(e.target.value, 10) })} />
              </label>

              <label className="block mb-4">Status:
                <select className="w-full border px-3 py-2 rounded" value={selectedEvent.status || 'Upcoming'} onChange={(e) => setSelectedEvent({ ...selectedEvent, status: e.target.value })}>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </label>

              <h3 className="text-lg font-bold mt-4 mb-2">Attendees</h3>
              {selectedEvent.bookings && selectedEvent.bookings.length > 0 ? (
                <ul className="divide-y">
                  {selectedEvent.bookings.map((booking) => (
                    <li key={booking._id} className="py-2">
                      <p className="text-sm font-medium">{booking.student.name}</p>
                      <p className="text-xs text-gray-500">{booking.student.email}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-600">No attendees registered yet.</p>
              )}

              <div className="flex justify-end gap-2 mt-6">
                <button onClick={handleCloseModal} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                <button onClick={handleSaveChanges} className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default ManageEvents;
