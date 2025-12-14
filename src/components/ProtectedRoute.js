import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // ❌ Not logged in → redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Role mismatch → redirect to login
  if (role && userRole !== role) {
    return <Navigate to="/login" replace />;
  }

  // ✅ All good → allow access
  return children;
}
