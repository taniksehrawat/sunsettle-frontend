import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

export default function AdminInvoiceHistory() {

  const [invoices, setInvoices] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    loadInvoices();
  }, []);

  // Load all invoices
  const loadInvoices = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/admin/invoices`, {
        headers: { Authorization: "Bearer " + token }
      });
      setInvoices(res.data);
    } catch (err) {
      alert("Failed to load invoices");
    }
  };

  // Download PDF (FIXED URL)
  const downloadPdf = async (siteId, m, y) => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/admin/invoice/pdf/${siteId}?month=${m}&year=${y}`,
        {
          headers: { Authorization: "Bearer " + token },
          responseType: "blob"
        }
      );

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice_${y}_${m}.pdf`;
      a.click();

    } catch (err) {
      alert("Failed to download invoice");
    }
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h2>Admin — All Invoices</h2>

      {invoices.length === 0 && <p>No invoices yet.</p>}

      {invoices.length > 0 && (
        <table border="1" width="100%" style={{ marginTop: 20, borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Site</th>
              <th>Month</th>
              <th>Export (kWh)</th>
              <th>Energy Charge</th>
              <th>GST</th>
              <th>Total</th>
              <th>PDF</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((inv, i) => (
              <tr key={i}>
                <td>{inv.siteName}</td>
                <td>{inv.month}</td>
                <td>{inv.exportKwh}</td>
                <td>{inv.energyCharge}</td>
                <td>{inv.gst18}</td>
                <td>{inv.totalPayable}</td>

                <td>
                  <button onClick={() => downloadPdf(inv.siteId, inv.monthNumber, inv.year)}>
                    📄 Download
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
