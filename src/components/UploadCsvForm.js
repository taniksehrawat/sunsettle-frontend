import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";   // ✅ USE CONFIGURED BASE URL

export default function UploadCsvForm({ clients }) {
  const [selectedClient, setSelectedClient] = useState("");
  const [sites, setSites] = useState([]);
  const [selectedSite, setSelectedSite] = useState("");
  const [file, setFile] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch sites for selected client
  const loadSites = async (clientId) => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/admin/sites`,     // ✅ UPDATED URL
        {
          headers: { Authorization: "Bearer " + token }
        }
      );

      // Filter sites belonging to this client
      const clientSites = res.data.filter(
        (site) => site.client.id === Number(clientId)
      );

      setSites(clientSites);
    } catch (err) {
      console.error(err);
      alert("Failed to load client sites");
    }
  };

  // Upload CSV
  const handleUpload = async () => {
    if (!file || !selectedSite) {
      alert("⚠️ Please select a site and upload CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(
        `${API_BASE_URL}/admin/meter/upload/${selectedSite}`, // ✅ UPDATED URL
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("✅ CSV Uploaded Successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ CSV Upload Failed");
    }
  };

  return (
    <div style={{ padding: 20, marginTop: 20, border: "1px solid #ccc", borderRadius: 6 }}>
      <h3>Upload Meter CSV</h3>

      {/* Select Client */}
      <select
        style={{ width: "100%", padding: 8 }}
        onChange={(e) => {
          setSelectedClient(e.target.value);
          setSelectedSite("");        // reset site
          loadSites(e.target.value);  // load related sites
        }}
      >
        <option value="">Select Client</option>
        {clients.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name} — {c.companyName}
          </option>
        ))}
      </select>

      <br /><br />

      {/* Select Site */}
      <select
        style={{ width: "100%", padding: 8 }}
        value={selectedSite}
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

      {/* CSV File Input */}
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button
        onClick={handleUpload}
        style={{ padding: "10px 20px", cursor: "pointer" }}
      >
        Upload CSV
      </button>
    </div>
  );
}
