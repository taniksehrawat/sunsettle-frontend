import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import SiteDetailsPage from "./pages/SiteDetailsPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Demo Routes */}
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Client View */}
        <Route path="/client/:clientId" element={<ClientDashboard />} />

        {/* Site Details */}
        <Route path="/site/:siteId" element={<SiteDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
