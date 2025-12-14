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

  // Page toggles
  const [showAddClient, setShowAddClient] = useState(false);
  const [showAddSite, setShowAddSite] = useState(false);
  const [showUploadCsv, setShowUploadCsv] = useState(false);
  const [showBillGenerator, setShowBillGenerator] = useState(false);
  const [showAllSites, setShowAllSites] = useState(false);
  const [showAdminBills, setShowAdminBills] = useState(false);
  const [showInvoices, setShowInvoices] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadClients();
  }, []);

  // Fetch clients
  const loadClients = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/admin/clients`, {
        headers: { Authorization: "Bearer " + token },
      });

      setClients(res.data);
    } catch (err) {
      alert("Failed to load clients");
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  // Reset all toggles
  const resetAll = () => {
    setShowAddClient(false);
    setShowAddSite(false);
    setShowUploadCsv(false);
    setShowBillGenerator(false);
    setShowAllSites(false);
    setShowAdminBills(false);
    setShowInvoices(false);
  };

  return (
    <div style={{ padding: 20 }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Admin Dashboard</h1>
        <button onClick={logout} style={{ height: 40 }}>Logout</button>
      </div>

      {/* Action Buttons */}
      <div style={{ marginTop: 20, marginBottom: 20 }}>

        <button
          onClick={() => { resetAll(); setShowAddClient(!showAddClient); }}
          style={{ marginRight: 10 }}
        >
          {showAddClient ? "Close Add Client" : "➕ Add Client"}
        </button>

        <button
          onClick={() => { resetAll(); setShowAddSite(!showAddSite); }}
          style={{ marginRight: 10 }}
        >
          {showAddSite ? "Close Add Site" : "➕ Add Site"}
        </button>

        <button
          onClick={() => { resetAll(); setShowUploadCsv(!showUploadCsv); }}
          style={{ marginRight: 10 }}
        >
          {showUploadCsv ? "Close Upload CSV" : "📤 Upload Meter CSV"}
        </button>

        <button
          onClick={() => { resetAll(); setShowBillGenerator(!showBillGenerator); }}
          style={{ marginRight: 10 }}
        >
          {showBillGenerator ? "Close Bill Generator" : "🧾 Generate Bill"}
        </button>

        <button
          onClick={() => { resetAll(); setShowAllSites(!showAllSites); }}
          style={{ marginRight: 10 }}
        >
          {showAllSites ? "Close All Sites" : "📍 View All Sites"}
        </button>

        <button
          onClick={() => { resetAll(); setShowAdminBills(!showAdminBills); }}
          style={{ marginRight: 10 }}
        >
          {showAdminBills ? "Close Bill History" : "📘 All Bills"}
        </button>

        <button
          onClick={() => { resetAll(); setShowInvoices(!showInvoices); }}
        >
          {showInvoices ? "Close Invoices" : "📄 Invoice History"}
        </button>

      </div>

      {/* Render Sections */}
      {showAddClient && <AddClientForm onClientAdded={loadClients} />}
      {showAddSite && <AddSiteForm clients={clients} />}
      {showUploadCsv && <UploadCsvForm clients={clients} />}
      {showBillGenerator && <BillGeneratorForm clients={clients} />}
      {showAllSites && <AdminSitesPage />}
      {showAdminBills && <AdminBillHistoryPage />}
      {showInvoices && <AdminInvoiceHistory />}

      {/* Client List */}
      <h2 style={{ marginTop: 30 }}>Clients</h2>

      <div style={{ marginTop: 10 }}>
        {clients.length === 0 && <p>No clients found.</p>}

        {clients.map((c) => (
          <div
            key={c.id}
            style={{
              padding: 10,
              border: "1px solid #ccc",
              marginBottom: 10,
              borderRadius: 5,
            }}
          >
            <b>{c.name}</b> — {c.companyName}
            <br />
            <small>{c.email}</small>
          </div>
        ))}
      </div>

    </div>
  );
}
