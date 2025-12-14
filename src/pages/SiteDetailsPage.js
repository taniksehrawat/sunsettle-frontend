import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import EnergyGraph from "../components/EnergyGraph";

export default function SiteDetailsPage() {

  const { siteId } = useParams();
  const token = localStorage.getItem("token");

  const [site, setSite] = useState(null);
  const [monthly, setMonthly] = useState(null);

  useEffect(() => {
    loadSite();
    loadMonthlySummary();
  }, []);

  // Load site details
  const loadSite = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/client/site/${siteId}`, {
        headers: { Authorization: "Bearer " + token }
      });
      setSite(res.data);
    } catch (err) {
      alert("Failed to load site details");
    }
  };

  // Load monthly summary
  const loadMonthlySummary = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/readings/monthly-summary/${siteId}`,
        { headers: { Authorization: "Bearer " + token } }
      );
      setMonthly(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!site) return <p>Loading site...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>{site.siteName}</h1>
      <p><b>Location:</b> {site.location}</p>
      <p><b>Capacity:</b> {site.capacityKw} kW</p>

      <hr />

      <h2>Monthly Summary</h2>
      {monthly ? (
        <div style={{ marginBottom: 20 }}>
          <p><b>Total Generation:</b> {monthly.totalGeneration} kWh</p>
          <p><b>Total Export:</b> {monthly.totalExport} kWh</p>
          <p><b>Total Import:</b> {monthly.totalImport} kWh</p>
          <p><b>CUF:</b> {monthly.cuf}%</p>
        </div>
      ) : (
        <p>No monthly data yet.</p>
      )}

      <hr />

      <h2>Daily Energy Graph</h2>
      <EnergyGraph siteId={siteId} />
    </div>
  );
}
