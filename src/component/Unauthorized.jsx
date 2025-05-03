// src/component/Unauthorized.jsx
function Unauthorized() {
    return (
      <div className="h-screen flex items-center justify-center bg-red-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-700">You are not authorized to access this page.</p>
          <p className="text-sm text-gray-500 mt-2">Please log out and sign in with correct credentials.</p>
        </div>
      </div>
    );
  }
  
  export default Unauthorized;
  