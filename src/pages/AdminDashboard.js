import { useEffect, useState } from "react";
import axios from "axios";

import AddClientForm from "../components/AddClientForm";
import AddSiteForm from "../components/AddSiteForm";
import UploadCsvForm from "../components/UploadCsvForm";
import BillGeneratorForm from "../components/BillGeneratorForm";
import AdminSitesPage from "../components/AdminSitesPage";
import AdminBillHistoryPage from "../components/AdminBillHistoryPage";
import AdminInvoiceHistory from "../components/AdminInvoiceHistory";

import API_BASE_URL from "../config";

export default function AdminDashboard() {

  const [clients, setClients] = useState([]);

  const [activeView, setActiveView] = useState(""); // 👈 SINGLE SOURCE OF TRUTH

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/clients`);
      setClients(res.data);
    } catch (err) {
      alert("Failed to load clients");
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div style={{ padding: 20 }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Admin Dashboard</h1>
        <button onClick={logout}>Logout</button>
      </div>

      {/* Buttons */}
      <div style={{ marginTop: 20 }}>
        <button onClick={() => setActiveView("addClient")}>➕ Add Client</button>
        <button onClick={() => setActiveView("addSite")}>➕ Add Site</button>
        <button onClick={() => setActiveView("uploadCsv")}>📤 Upload CSV</button>
        <button onClick={() => setActiveView("generateBill")}>🧾 Generate Bill</button>
        <button onClick={() => setActiveView("sites")}>📍 View Sites</button>
        <button onClick={() => setActiveView("bills")}>📘 Bills</button>
        <button onClick={() => setActiveView("invoices")}>📄 Invoices</button>
      </div>

      {/* Views */}
      {activeView === "addClient" && (
        <AddClientForm onSuccess={loadClients} />
      )}

      {activeView === "addSite" && (
        <AddSiteForm clients={clients} />
      )}

      {activeView === "uploadCsv" && (
        <UploadCsvForm clients={clients} />
      )}

      {activeView === "generateBill" && (
        <BillGeneratorForm clients={clients} />
      )}

      {activeView === "sites" && <AdminSitesPage />}
      {activeView === "bills" && <AdminBillHistoryPage />}
      {activeView === "invoices" && <AdminInvoiceHistory />}

      {/* Clients List */}
      <h2 style={{ marginTop: 30 }}>Clients</h2>

      {clients.length === 0 && <p>No clients found.</p>}

      {clients.map(c => (
        <div
          key={c.id}
          style={{
            padding: 10,
            border: "1px solid #ccc",
            marginBottom: 10,
            borderRadius: 5
          }}
        >
          <b>{c.name}</b> — {c.companyName || "-"}
          <br />
          <small>{c.email}</small>
        </div>
      ))}

    </div>
  );
}
