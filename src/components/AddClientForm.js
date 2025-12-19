import { useState } from "react";
import API_BASE_URL from "../config";

export default function AddClientForm({ onSuccess }) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    companyName: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addClient = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/clients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error();

      alert("✅ Client added");
      onSuccess && onSuccess();

      setForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        companyName: ""
      });

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
