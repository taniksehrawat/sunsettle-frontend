import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

export default function AdminSitesPage() {
  const [sites, setSites] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    loadSites();
  }, []);

  const loadSites = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/admin/sites`, {
        headers: { Authorization: "Bearer " + token },
      });

      setSites(res.data);

    } catch (err) {
      alert("Failed to load sites");
    }
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h2>All Sites</h2>

      {sites.length === 0 && <p>No sites found.</p>}

      {sites.length > 0 && (
        <table
          border="1"
          style={{
            width: "100%",
            marginTop: 20,
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th>Site Name</th>
              <th>Client</th>
              <th>Location</th>
              <th>Capacity (kW)</th>
            </tr>
          </thead>

          <tbody>
            {sites.map((s) => (
              <tr key={s.id}>
                <td>{s.siteName}</td>
                <td>{s.client?.name}</td>
                <td>{s.location}</td>
                <td>{s.capacityKw}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
