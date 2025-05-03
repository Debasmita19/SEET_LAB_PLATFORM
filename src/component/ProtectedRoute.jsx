// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { getAuth } from "../utils/auth";

function ProtectedRoute({ children, role }) {
  const auth = getAuth();

  if (!auth) {
    return <Navigate to="/choose-role?action=login" replace />;
  }

  if (role && auth.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default ProtectedRoute;
