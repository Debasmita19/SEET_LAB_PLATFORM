import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast"; 

function UserDashboard() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    
    setEvents([
      { id: 1, name: "AI Conference", date: "2025-05-20", description: "A grand AI event about artificial intelligence and future tech." },
      { id: 2, name: "Startup Meetup", date: "2025-06-15", description: "Meet startups, investors, and mentors to grow your ideas." },
    ]);

    
    const email = localStorage.getItem("userEmail") || "User123";
    setUserEmail(email);
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowRegisterForm(false);
  };

  const handleRegisterClick = () => {
    setShowRegisterForm(true);
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    const newRegistration = {
      eventId: selectedEvent.id,
      eventName: selectedEvent.name,
      userName: registrationData.name,
      userEmail: registrationData.email,
      userPhone: registrationData.phone,
    };
    setRegisteredEvents([...registeredEvents, newRegistration]);
    toast.success(`Successfully registered for ${selectedEvent.name}!`);
    setShowRegisterForm(false);
    setRegistrationData({ name: "", email: "", phone: "" });
  };

  const handleCancelRegistration = (eventId) => {
    const updated = registeredEvents.filter(reg => reg.eventId !== eventId);
    setRegisteredEvents(updated);
    toast.error(`Registration cancelled.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      
      <Toaster position="top-center" reverseOrder={false} />

    
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-indigo-700 mb-2">Welcome, {userEmail}!</h1>
          <p className="text-gray-600">Ready to explore and register for amazing events?</p>
        </div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="User Avatar"
          className="w-16 h-16 object-cover"
        />
      </div>

      <div className="flex gap-8">
       
        <div className="w-1/4 space-y-6">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Upcoming Events</h2>
          <ul className="space-y-4">
            {events
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map(event => (
                <li
                  key={event.id}
                  className="p-4 bg-white rounded-lg shadow hover:shadow-xl hover:scale-105 transition cursor-pointer"
                  onClick={() => handleEventClick(event)}
                >
                  <h3 className="text-lg font-semibold text-indigo-600">{event.name}</h3>
                  <p className="text-sm text-gray-500">{event.date}</p>
                </li>
              ))}
          </ul>
        </div>

        
        <div className="flex-1 space-y-8 overflow-y-auto">
         
          {selectedEvent ? (
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold text-indigo-700 mb-2">{selectedEvent.name}</h2>
              <p className="text-gray-500 mb-2">{selectedEvent.date}</p>
              <p className="text-gray-700 mb-4">{selectedEvent.description}</p>
              <button
                onClick={handleRegisterClick}
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg transition"
              >
                Register
              </button>

             
              {showRegisterForm && (
                <form onSubmit={handleRegistrationSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Name</label>
                    <input
                      type="text"
                      value={registrationData.name}
                      onChange={(e) => setRegistrationData({ ...registrationData, name: e.target.value })}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Email</label>
                    <input
                      type="email"
                      value={registrationData.email}
                      onChange={(e) => setRegistrationData({ ...registrationData, email: e.target.value })}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Phone</label>
                    <input
                      type="tel"
                      value={registrationData.phone}
                      onChange={(e) => setRegistrationData({ ...registrationData, phone: e.target.value })}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg transition"
                  >
                    Submit Registration
                  </button>
                </form>
              )}
            </div>
          ) : (
            <div className="text-xl text-gray-600">Please select an event to view details.</div>
          )}

          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">My Registered Events</h2>
            {registeredEvents.length > 0 ? (
              <ul className="space-y-4">
                {registeredEvents.map((reg, index) => (
                  <li
                    key={index}
                    className="p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 flex justify-between items-center transition"
                  >
                    <div>
                      <h3 className="font-semibold text-indigo-600">{reg.eventName}</h3>
                      <p className="text-gray-500 text-sm">Registered as: {reg.userName}</p>
                      <p className="text-gray-500 text-sm">Email: {reg.userEmail}</p>
                      <p className="text-gray-500 text-sm">Phone: {reg.userPhone}</p>
                    </div>
                    <button
                      onClick={() => handleCancelRegistration(reg.eventId)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-lg transition"
                    >
                      Cancel
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">You have not registered for any events yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
