import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DemoLayout from "../components/DemoLayout";

export default function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (form.username === "admin" && form.password === "admin") {
      localStorage.setItem("demo-auth", "true");
      navigate("/demo/admin-panel");
    } else {
      alert("Neteisingi prisijungimo duomenys");
    }
  };

  return (
    <DemoLayout>
      <div className="max-w-md mx-auto mt-20 bg-white p-6 border rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center text-black">Administratoriaus prisijungimas</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Vartotojo vardas"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="text-black w-full border px-4 py-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="Slaptažodis"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="text-black w-full border px-4 py-2 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Prisijungti
          </button>
        </form>
      </div>
    </DemoLayout>
  );
}
