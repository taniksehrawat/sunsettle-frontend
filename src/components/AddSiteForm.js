import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

export default function AddSiteForm({ clients, onSiteAdded }) {

  const [clientId, setClientId] = useState("");
  const [siteName, setSiteName] = useState("");
  const [location, setLocation] = useState("");
  const [capacityKw, setCapacityKw] = useState("");

  const addSite = async () => {
    try {
      await axios.post(`${API_BASE_URL}/admin/site/${clientId}`, {
        siteName,
        location,
        capacityKw
      });

      alert("✅ Site added");
      onSiteAdded(); // refresh clients/sites
    } catch {
      alert("❌ Failed to add site");
    }
  };

  return (
    <div>
      <h3>Add Site</h3>

      <select onChange={(e) => setClientId(e.target.value)}>
        <option value="">Select Client</option>
        {clients.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <input placeholder="Site Name" onChange={(e) => setSiteName(e.target.value)} />
      <input placeholder="Location" onChange={(e) => setLocation(e.target.value)} />
      <input placeholder="Capacity" type="number" onChange={(e) => setCapacityKw(e.target.value)} />

      <button onClick={addSite}>Add Site</button>
    </div>
  );
}
