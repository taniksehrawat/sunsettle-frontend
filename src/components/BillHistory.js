import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

export default function BillHistory() {

  const [bills, setBills] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    loadBills();
  }, []);

  // Load all client bills
  const loadBills = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/client/bills`, {
        headers: { Authorization: "Bearer " + token },
      });
      setBills(res.data);
    } catch (err) {
      alert("Failed to load bill history");
    }
  };

  // Download invoice PDF
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
      alert("Failed to download invoice");
    }
  };

  return (
    <div style={{ marginTop: 30 }}>
      <h2>Bill History</h2>

      {bills.length === 0 && <p>No bills found.</p>}

      {bills.length > 0 && (
        <table border="1" style={{ width: "100%", marginTop: 20 }}>
          <thead>
            <tr>
              <th>Site</th>
              <th>Month</th>
              <th>Export (kWh)</th>
              <th>Charge (₹)</th>
              <th>GST (₹)</th>
              <th>Total (₹)</th>
              <th>Download</th>
            </tr>
          </thead>

          <tbody>
            {bills.map((b, index) => (
              <tr key={index}>
                <td>{b.siteName}</td>
                <td>{b.month}</td>
                <td>{b.exportKwh}</td>
                <td>{b.energyCharge}</td>
                <td>{b.gst18}</td>
                <td>{b.totalPayable}</td>

                <td>
                  <button
                    onClick={() => downloadPdf(b.siteId, b.monthNumber, b.year)}
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
