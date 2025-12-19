import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

export default function AddClientForm({ onClientAdded }) {

  const [form, setForm] = useState({
    userId: 1,
    name: "",
    email: "",
    phone: "",
    address: "",
    companyName: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const addClient = async () => {
    try {
      await axios.post(`${API_BASE_URL}/admin/client`, form);
      alert("✅ Client added");
      onClientAdded();          // 🔥 THIS WAS MISSING
    } catch {
      alert("❌ Failed to add client");
    }
  };

  return (
    <div>
      <h3>Add Client</h3>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="phone" placeholder="Phone" onChange={handleChange} />
      <input name="address" placeholder="Address" onChange={handleChange} />
      <input name="companyName" placeholder="Company" onChange={handleChange} />
      <button onClick={addClient}>Add Client</button>
    </div>
  );
}
