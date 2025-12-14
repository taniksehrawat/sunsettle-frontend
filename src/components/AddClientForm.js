import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";   // ✅ Use ENV base URL

export default function AddClientForm({ onClientAdded }) {

  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [companyName, setCompanyName] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async () => {
    if (!userId || !name || !email) {
      alert("User ID, Name & Email are required!");
      return;
    }

    try {
      await axios.post(
        `${API_BASE_URL}/admin/client/${userId}`,
        {
          name,
          email,
          phone,
          address,
          companyName,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      alert("Client Added Successfully!");

      // Reset form
      setUserId("");
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setCompanyName("");

      // Refresh parent list
      if (onClientAdded) onClientAdded();

    } catch (err) {
      alert("Failed to add client");
    }
  };

  return (
    <div style={{ padding: 20, marginTop: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h3>Add Client</h3>

      <input
        placeholder="User ID (Owner)"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        style={{ width: "100%", padding: 8 }}
      /><br /><br />

      <input
        placeholder="Client Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", padding: 8 }}
      /><br /><br />

      <input
        placeholder="Client Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", padding: 8 }}
      /><br /><br />

      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ width: "100%", padding: 8 }}
      /><br /><br />

      <input
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ width: "100%", padding: 8 }}
      /><br /><br />

      <input
        placeholder="Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        style={{ width: "100%", padding: 8 }}
      /><br /><br />

      <button onClick={handleSubmit} style={{ padding: "10px 20px" }}>
        Add Client
      </button>
    </div>
  );
}
