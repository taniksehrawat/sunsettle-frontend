import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

import EnergyGraph from "../components/EnergyGraph";
import BillHistory from "../components/BillHistory";

export default function ClientDashboard() {

  const [sites, setSites] = useState([]);
  const [selectedSite, setSelectedSite] = useState("");
  const [showGraph, setShowGraph] = useState(false);
  const [showBills, setShowBills] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadMySites();
  }, []);

  // Fetch logged-in client's sites
  const loadMySites = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/client/my-sites`, {
        headers: { Authorization: "Bearer " + token },
      });
      setSites(res.data);
    } catch (err) {
      alert("Failed to load sites");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Client Dashboard</h1>

      {/* ------------------ SITE LIST ------------------ */}
      <h2>My Sites</h2>

      <div style={{ marginBottom: 20 }}>
        {sites.length === 0 && <p>No sites found.</p>}

        {sites.map((s) => (
          <div
            key={s.id}
            onClick={() => (window.location.href = `/client/site/${s.id}`)}
            style={{
              padding: 12,
              marginBottom: 10,
              border: "1px solid #ccc",
              borderRadius: 5,
              backgroundColor: "#f7f7f7",
              cursor: "pointer",
            }}
          >
            <b>{s.siteName}</b> — {s.location}
            <br />
            <small>Click to view details →</small>
          </div>
        ))}
      </div>

      {/* ------------------ ENERGY GRAPH ------------------ */}
      <h2>Energy Summary</h2>

      <select
        style={{ width: "100%", padding: 8 }}
        onChange={(e) => setSelectedSite(e.target.value)}
      >
        <option value="">Select Site</option>
        {sites.map((s) => (
          <option key={s.id} value={s.id}>
            {s.siteName} — {s.location}
          </option>
        ))}
      </select>

      <br /><br />

      <button
        onClick={() => setShowGraph(!showGraph)}
        disabled={!selectedSite}
      >
        {showGraph ? "Hide Graph" : "Show Energy Graph"}
      </button>

      {showGraph && selectedSite && (
        <EnergyGraph siteId={selectedSite} />
      )}

      <br /><br />

      {/* ------------------ BILL HISTORY ------------------ */}
      <button
        onClick={() => setShowBills(!showBills)}
        style={{ marginTop: 20 }}
      >
        {showBills ? "Hide Bill History" : "View Bill History"}
      </button>

      {showBills && <BillHistory />}
    </div>
  );
}
