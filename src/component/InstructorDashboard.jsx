import { useState, useEffect } from "react";

function InstructorDashboard() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvent, setFilteredEvent] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false); 
  const [newEvent, setNewEvent] = useState({
    name: "",
    date: "",
    description: "",
  });
  const [editEventData, setEditEventData] = useState({
    id: null,
    name: "",
    date: "",
    description: "",
  });

  useEffect(() => {
    // Dummy events sorted by date ascending
    setEvents([
      { id: 1, name: "AI Conference", date: "2025-05-20", description: "A grand AI event." },
      { id: 2, name: "Startup Meetup", date: "2025-06-15", description: "Meet startups and investors." },
    ]);
  }, []);

  const handleSearch = () => {
    const found = events.find(event => 
      event.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvent(found || null);
    setShowEditForm(false); // Reset Edit Form when search happens
  };

  const handleCreateEvent = () => {
    setShowCreateForm(true);
    setShowEditForm(false);
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const newEventObj = {
      id: events.length + 1,
      name: newEvent.name,
      date: newEvent.date,
      description: newEvent.description,
    };
    setEvents([...events, newEventObj]);
    setShowCreateForm(false);
    setNewEvent({ name: "", date: "", description: "" });
  };

  const handleEditEvent = (event) => {
    setEditEventData(event); // Pre-fill event data
    setShowEditForm(true);
    setShowCreateForm(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedEvents = events.map(ev => 
      ev.id === editEventData.id ? editEventData : ev
    );
    setEvents(updatedEvents);
    setShowEditForm(false);
    setFilteredEvent(null);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Upcoming Events */}
      <div className="w-1/4 bg-white p-6 shadow-md overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
        <ul className="space-y-4">
          {events
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map(event => (
              <li key={event.id} className="border p-3 rounded">
                <h3 className="font-semibold">{event.name}</h3>
                <p className="text-sm text-gray-600">{event.date}</p>
              </li>
            ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Search Event */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Search Events</h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter event name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border px-4 py-2 rounded w-1/2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              onClick={handleSearch}
              className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 transition"
            >
              Search
            </button>
          </div>

          {/* If event found */}
          {filteredEvent && (
            <div className="mt-4 p-4 border rounded flex justify-between items-center bg-white shadow">
              <div>
                <h3 className="font-semibold">{filteredEvent.name}</h3>
                <p className="text-sm text-gray-600">{filteredEvent.date}</p>
              </div>
              <button
                onClick={() => handleEditEvent(filteredEvent)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        {/* Create Event */}
        <div className="mt-10">
          {!showCreateForm ? (
            <button
              onClick={handleCreateEvent}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded text-lg"
            >
              Create Event
            </button>
          ) : (
            <form onSubmit={handleCreateSubmit} className="bg-white shadow-md p-6 rounded-lg mt-6 space-y-4">
              <div>
                <label className="block text-gray-700 font-medium">Event Name</label>
                <input
                  type="text"
                  value={newEvent.name}
                  onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                  required
                  className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Date</label>
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  required
                  className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Description</label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  required
                  className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows="3"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded text-lg"
              >
                Create
              </button>
            </form>
          )}
        </div>

        {/* Edit Event */}
        {showEditForm && (
          <form onSubmit={handleEditSubmit} className="bg-white shadow-md p-6 rounded-lg mt-6 space-y-4">
            <h2 className="text-xl font-bold mb-4">Edit Event</h2>
            <div>
              <label className="block text-gray-700 font-medium">Event Name</label>
              <input
                type="text"
                value={editEventData.name}
                onChange={(e) => setEditEventData({ ...editEventData, name: e.target.value })}
                required
                className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Date</label>
              <input
                type="date"
                value={editEventData.date}
                onChange={(e) => setEditEventData({ ...editEventData, date: e.target.value })}
                required
                className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Description</label>
              <textarea
                value={editEventData.description}
                onChange={(e) => setEditEventData({ ...editEventData, description: e.target.value })}
                required
                className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded text-lg"
            >
              Save Changes
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default InstructorDashboard;
