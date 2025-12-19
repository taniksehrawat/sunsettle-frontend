import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

export default function AddSiteForm({ clients }) {

  const [clientId, setClientId] = useState("");
  const [siteName, setSiteName] = useState("");
  const [location, setLocation] = useState("");
  const [capacityKw, setCapacityKw] = useState("");

  const token = localStorage.getItem("token"); // 🔥 MISSING PIECE

  const addSite = async () => {

    if (!clientId || !siteName || !location || !capacityKw) {
      alert("❗ Fill all fields");
      return;
    }

    try {
      await axios.post(
        `${API_BASE_URL}/admin/site/${clientId}`,
        {
          siteName,
          location,
          capacityKw: Number(capacityKw),
        },
        {
          headers: {
            Authorization: "Bearer " + token, // 🔥 FIX
            "Content-Type": "application/json",
          },
        }
      );

      alert("✅ Site added successfully");

      // reset
      setClientId("");
      setSiteName("");
      setLocation("");
      setCapacityKw("");

    } catch (err) {
      console.error(err);
      alert("❌ Failed to add site");
    }
  };

  return (
    <div>
      <h3>Add Site</h3>

      <select value={clientId} onChange={e => setClientId(e.target.value)}>
        <option value="">Select Client</option>
        {clients.map(c => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <input
        placeholder="Site Name"
        value={siteName}
        onChange={e => setSiteName(e.target.value)}
      />

      <input
        placeholder="Location"
        value={location}
        onChange={e => setLocation(e.target.value)}
      />

      <input
        placeholder="Capacity (kW)"
        type="number"
        value={capacityKw}
        onChange={e => setCapacityKw(e.target.value)}
      />

      <button onClick={addSite}>Add Site</button>
    </div>
  );
}
