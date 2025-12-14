import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";   // ✅ USE CONFIG

export default function BillGeneratorForm({ clients }) {

  const [selectedClient, setSelectedClient] = useState("");
  const [sites, setSites] = useState([]);
  const [selectedSite, setSelectedSite] = useState("");

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [billData, setBillData] = useState(null);

  const token = localStorage.getItem("token");

  // Load sites of selected client
  const loadSites = async (clientId) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/admin/sites`, {
        headers: { Authorization: "Bearer " + token },
      });

      const filtered = res.data.filter((s) => s.client.id === Number(clientId));
      setSites(filtered);

    } catch (err) {
      console.error(err);
      alert("Failed to load sites");
    }
  };

  // Generate bill (JSON)
  const generateBill = async () => {
    if (!selectedSite || !month || !year) {
      alert("⚠️ Please select site, month, and year");
      return;
    }

    try {
      const res = await axios.get(
        `${API_BASE_URL}/admin/bill/${selectedSite}?month=${month}&year=${year}`,
        { headers: { Authorization: "Bearer " + token } }
      );

      setBillData(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to generate bill");
    }
  };

  // Download PDF invoice
  const downloadPdf = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/admin/invoice/pdf/${selectedSite}?month=${month}&year=${year}`,
        {
          headers: { Authorization: "Bearer " + token },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([res.data], { type: "application/pdf" })
      );

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice_${year}_${month}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

    } catch (err) {
      console.error(err);
      alert("Failed to download PDF");
    }
  };

  return (
    <div style={{ padding: 20, border: "1px solid #ccc", marginTop: 20 }}>
      <h3>Generate Monthly Bill</h3>

      {/* Select Client */}
      <select
        style={{ width: "100%", padding: 8 }}
        onChange={(e) => {
          setSelectedClient(e.target.value);
          loadSites(e.target.value);
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

      {/* Month */}
      <input
        placeholder="Month (1-12)"
        type="number"
        min="1"
        max="12"
        style={{ width: "100%", padding: 8 }}
        onChange={(e) => setMonth(e.target.value)}
      />

      <br /><br />

      {/* Year */}
      <input
        placeholder="Year (e.g. 2025)"
        type="number"
        style={{ width: "100%", padding: 8 }}
        onChange={(e) => setYear(e.target.value)}
      />

      <br /><br />

      <button onClick={generateBill}>Generate Bill</button>

      {/* Bill Summary + PDF Button */}
      {billData && (
        <div
          style={{
            marginTop: 20,
            padding: 20,
            border: "1px solid #aaa",
            borderRadius: 5,
          }}
        >
          <h3>Bill Summary</h3>

          <p><b>Month:</b> {billData.month}</p>
          <p><b>Export kWh:</b> {billData.exportKwh}</p>
          <p><b>Tariff:</b> ₹{billData.tariff}/kWh</p>
          <p><b>Energy Charge:</b> ₹{billData.energyCharge}</p>
          <p><b>GST (18%):</b> ₹{billData.gst18}</p>

          <h3>Total Payable: ₹{billData.totalPayable}</h3>

          <button onClick={downloadPdf} style={{ marginTop: 15 }}>
            📄 Download PDF Invoice
          </button>
        </div>
      )}
    </div>
  );
}
