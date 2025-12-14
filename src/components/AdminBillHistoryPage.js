import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

export default function AdminBillHistoryPage() {
  const [bills, setBills] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    loadAllBills();
  }, []);

  // Fetch all bills from backend
  const loadAllBills = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/admin/bills`, {
        headers: { Authorization: "Bearer " + token },
      });
      setBills(res.data);
    } catch (e) {
      alert("Failed to load bill history");
    }
  };

  // Download PDF
  const downloadPdf = async (siteId, month, year) => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/admin/invoice/pdf/${siteId}?month=${month}&year=${year}`,
        {
          headers: { Authorization: "Bearer " + token },
          responseType: "blob",
        }
      );

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice_${year}_${month}.pdf`;
      a.click();
    } catch (err) {
      alert("Failed to download PDF");
    }
  };

  return (
    <div style={{ marginTop: 30 }}>
      <h2>All Bills (Admin)</h2>

      {bills.length === 0 && <p>No bills found.</p>}

      {bills.length > 0 && (
        <table
          border="1"
          style={{ width: "100%", marginTop: 20, borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>Client</th>
              <th>Site</th>
              <th>Month</th>
              <th>Export (kWh)</th>
              <th>Energy Charge (₹)</th>
              <th>GST 18% (₹)</th>
              <th>Total (₹)</th>
              <th>PDF</th>
            </tr>
          </thead>

          <tbody>
            {bills.map((b, i) => (
              <tr key={i}>
                <td>{b.clientName}</td>
                <td>{b.siteName}</td>
                <td>{b.month}</td>
                <td>{b.exportKwh}</td>
                <td>{b.energyCharge}</td>
                <td>{b.gst18}</td>
                <td>{b.totalPayable}</td>
                <td>
                  <button
                    onClick={() =>
                      downloadPdf(b.siteId, b.monthNumber, b.year)
                    }
                  >
                    📄 PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
