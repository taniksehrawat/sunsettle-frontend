import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import AdminDashboard from "./pages/AdminDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import SiteDetailsPage from "./pages/SiteDetailsPage";




function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirect "/" → "/login" */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* LOGIN */}
        <Route path="/login" element={<LoginPage />} />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* CLIENT DASHBOARD */}
        <Route
          path="/client"
          element={
            <ProtectedRoute role="CLIENT">
              <ClientDashboard />
            </ProtectedRoute>
          }
        />

        {/* CLIENT SITE DETAILS */}
        <Route
          path="/client/site/:siteId"
          element={
            <ProtectedRoute role="CLIENT">
              <SiteDetailsPage />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
