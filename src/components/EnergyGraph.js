import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function EnergyGraph({ siteId }) {
  const [data, setData] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (siteId) loadGraph();
  }, [siteId]);

  const loadGraph = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/client/readings/daily-summary/${siteId}`,   // ✅ FIXED ENDPOINT
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      setData(res.data);
    } catch (error) {
      console.error("Error loading daily summary:", error);
      alert("Failed to load graph data");
    }
  };

  return (
    <div style={{ width: "100%", height: 400, marginTop: 20 }}>
      <h3>Daily Energy Graph</h3>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date" />
          <YAxis />

          <Tooltip />
          <Legend />

          {/* Generation */}
          <Line
            type="monotone"
            dataKey="generationKwh"
            stroke="#0088FE"
            name="Generation (kWh)"
            strokeWidth={2}
          />

          {/* Export */}
          <Line
            type="monotone"
            dataKey="exportKwh"
            stroke="#00C49F"
            name="Export (kWh)"
            strokeWidth={2}
          />

          {/* Import */}
          <Line
            type="monotone"
            dataKey="importKwh"
            stroke="#FFBB28"
            name="Import (kWh)"
            strokeWidth={2}
          />

          {/* Net Generation */}
          <Line
            type="monotone"
            dataKey="netGenerationKwh"
            stroke="#FF8042"
            name="Net Generation (kWh)"
            strokeWidth={2}
          />

          {/* CUF */}
          <Line
            type="monotone"
            dataKey="cuf"
            stroke="#AA00FF"
            name="CUF (%)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
