import React, { useState } from "react";
import config from "../config";

function AddClientForm({ onSuccess }) {
  const [form, setForm] = useState({
    userId: 1, // 🔥 DEMO OWNER (important)
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
      const res = await fetch(`${config.API_BASE}/api/clients`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        throw new Error("Failed");
      }

      alert("Client added successfully");
      onSuccess && onSuccess();
    } catch (err) {
      alert("Failed to add client");
      console.error(err);
    }
  };

  return (
    <div>
      <h3>Add Client</h3>

      <input name="name" placeholder="Client Name" onChange={handleChange} />
      <input name="email" placeholder="Client Email" onChange={handleChange} />
      <input name="phone" placeholder="Phone" onChange={handleChange} />
      <input name="address" placeholder="Address" onChange={handleChange} />
      <input name="companyName" placeholder="Company Name" onChange={handleChange} />

      <button onClick={addClient}>Add Client</button>
    </div>
  );
}

export default AddClientForm;
