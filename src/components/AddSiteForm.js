import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";   // ✅ USE BASE URL

export default function AddSiteForm({ clients }) {
  const [clientId, setClientId] = useState("");
  const [siteName, setSiteName] = useState("");
  const [location, setLocation] = useState("");
  const [capacityKw, setCapacityKw] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async () => {

    if (!clientId || !siteName || !location || !capacityKw) {
      alert("❗ Please fill all fields");
      return;
    }

    try {
      await axios.post(
        `${API_BASE_URL}/admin/site/${clientId}`,   // ✅ UPDATED URL
        {
          siteName,
          location,
          capacityKw: Number(capacityKw),
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      alert("✅ Site Added Successfully!");
      window.location.reload();

    } catch (err) {
      console.error(err);
      alert("❌ Failed to add site. Please check the details.");
    }
  };

  return (
    <div style={{ padding: 20, marginTop: 20, border: "1px solid #ccc", borderRadius: 6 }}>
      <h3>Add Site</h3>

      {/* Client Selector */}
      <select
        onChange={(e) => setClientId(e.target.value)}
        style={{ width: "100%", padding: 8 }}
      >
        <option value="">Select Client</option>

        {clients.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name} — {c.companyName}
          </option>
        ))}
      </select>

      <br /><br />

      <input
        placeholder="Site Name"
        onChange={(e) => setSiteName(e.target.value)}
        style={{ width: "100%", padding: 8 }}
      /><br /><br />

      <input
        placeholder="Location"
        onChange={(e) => setLocation(e.target.value)}
        style={{ width: "100%", padding: 8 }}
      /><br /><br />

      <input
        placeholder="Capacity (kW)"
        onChange={(e) => setCapacityKw(e.target.value)}
        type="number"
        style={{ width: "100%", padding: 8 }}
      /><br /><br />

      <button
        onClick={handleSubmit}
        style={{ padding: "10px 20px", cursor: "pointer" }}
      >
        Add Site
      </button>
    </div>
  );
}
