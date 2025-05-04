// src/components/UserDashboard.jsx
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import API from "../utils/api";
import UserNavbar from "./UserNavbar";

function UserDashboard() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [bookedEvents, setBookedEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchEvents();
    fetchMyBookings();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await API.get("/events");
      setEvents(res.data);
      setFilteredEvents(res.data);
      const uniqueCategories = [
        "All",
        ...new Set(res.data.map((e) => e.category || "Other")),
      ];
      setCategories(uniqueCategories);
    } catch (err) {
      toast.error("Failed to fetch events");
    }
  };

  const fetchMyBookings = async () => {
    try {
      const res = await API.get("/booking/my-bookings");
      setBookedEvents(res.data);
    } catch (err) {
      toast.error("Could not fetch your bookings");
    }
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setCurrentPage(1);
    if (category === "All") setFilteredEvents(events);
    else setFilteredEvents(events.filter((ev) => ev.category === category));
  };

  const handleRegister = async (eventId) => {
    try {
      await API.post(`/booking/${eventId}/book`);
      toast.success("Registered successfully!");
      fetchMyBookings();
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
    }
  };

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <UserNavbar />
      <Toaster />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6">Explore Events</h1>

        <div className="flex items-center justify-between mb-6">
          <div>
            <label className="mr-2 text-sm font-medium">Filter by Category:</label>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="border px-3 py-2 rounded shadow-sm focus:ring focus:ring-indigo-300"
            >
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedEvents.length > 0 ? (
            paginatedEvents.map((event) => (
              <div
                key={event._id}
                className="bg-white p-5 rounded-xl shadow hover:shadow-lg border border-indigo-100"
              >
                <h2 className="text-xl font-bold text-indigo-800 mb-2">{event.title}</h2>
                <p className="text-sm text-gray-500 mb-1">
                  📅 {new Date(event.date).toLocaleDateString()} at ⏰ {event.time}
                </p>
                <p className="text-sm text-gray-600 mb-2">📍 {event.location}</p>
                <p className="text-sm text-gray-700 mb-3">{event.description}</p>
                <button
                  onClick={() => handleRegister(event._id)}
                  className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
                >
                  Register
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No events available at this time.</p>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 rounded border font-semibold transition ${
                  currentPage === index + 1
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-indigo-600 border-indigo-600 hover:bg-indigo-100"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-indigo-700 mb-6">My Bookings</h2>
          {bookedEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookedEvents.map((book) => (
                <div key={book._id} className="bg-white p-5 rounded-lg border shadow">
                  <h3 className="text-lg font-semibold text-indigo-700 mb-1">
                    {book.event?.title || "Untitled Event"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    📅 {new Date(book.event?.date).toLocaleDateString()} at ⏰ {book.event?.time}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">📍 {book.event?.location}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    Registered on: {new Date(book.bookedAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">You have not registered for any events yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
