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

  const loadClients = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/admin/clients`, {
        headers: { Authorization: "Bearer " + token },
      });
      setClients(res.data);
    } catch {
      alert("Failed to load clients");
    }
  };

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

      <h1>Admin Dashboard</h1>

      <button onClick={() => { resetAll(); setShowAddClient(true); }}>➕ Add Client</button>
      <button onClick={() => { resetAll(); setShowAddSite(true); }}>➕ Add Site</button>

      {showAddClient && (
        <AddClientForm onClientAdded={loadClients} />
      )}

      {showAddSite && (
        <AddSiteForm clients={clients} onSiteAdded={loadClients} />
      )}

      <h2 style={{ marginTop: 30 }}>Clients</h2>

      {clients.length === 0 && <p>No clients found.</p>}

      {clients.map((c) => (
        <div key={c.id} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 8 }}>
          <b>{c.name}</b> — {c.companyName}<br />
          <small>{c.email}</small>
        </div>
      ))}
    </div>
  );
}
