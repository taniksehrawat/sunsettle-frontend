import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import SiteDetailsPage from "./pages/SiteDetailsPage";

import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/login" element={<LoginPage />} />

        {/* ADMIN DASHBOARD (Protected) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* CLIENT DASHBOARD (Protected) */}
        <Route
          path="/client"
          element={
            <ProtectedRoute role="CLIENT">
              <ClientDashboard />
            </ProtectedRoute>
          }
        />

        {/* CLIENT SITE DETAILS PAGE (Protected) */}
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
