import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

export default function AddSiteForm({ clients }) {
  const [clientId, setClientId] = useState("");
  const [siteName, setSiteName] = useState("");
  const [location, setLocation] = useState("");
  const [capacityKw, setCapacityKw] = useState("");

  const handleSubmit = async () => {
    if (!clientId || !siteName || !location || !capacityKw) {
      alert("❗ Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/clients/${clientId}/sites`,
        {
          siteName: siteName,
          location: location,
          capacityKw: Number(capacityKw), // 🔥 MUST BE NUMBER
        }
      );

      console.log("Site added:", res.data);
      alert("✅ Site added successfully");

      window.location.reload();

    } catch (err) {
      console.error("Add site error:", err.response || err);
      alert("❌ Failed to add site");
    }
  };

  return (
    <div style={{ padding: 20, border: "1px solid #ccc", borderRadius: 6 }}>
      <h3>Add Site</h3>

      <select
        value={clientId}
        onChange={(e) => setClientId(e.target.value)}
        style={{ width: "100%", padding: 8 }}
      >
        <option value="">Select Client</option>
        {clients.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <br /><br />

      <input
        placeholder="Site Name"
        value={siteName}
        onChange={(e) => setSiteName(e.target.value)}
      /><br /><br />

      <input
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      /><br /><br />

      <input
        type="number"
        placeholder="Capacity (kW)"
        value={capacityKw}
        onChange={(e) => setCapacityKw(e.target.value)}
      /><br /><br />

      <button onClick={handleSubmit}>Add Site</button>
    </div>
  );
}
