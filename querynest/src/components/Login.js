// src/components/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [name, setName] = useState("");
  const [register_number, setRegNo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8000/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, register_number: register_number, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("studentToken", data.token || "dummy"); // still needed for check
      localStorage.setItem("studentName", name);
      localStorage.setItem("studentRegNo", register_number);
      // Redirect to intended page or home
      const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
      localStorage.removeItem("redirectAfterLogin");
      navigate(redirectPath);
    } else {
      setError("Invalid credentials or student not found.");
    }
  };

  return (
    <div className="container" style={{ marginTop: "40px" }}>
      <h2 style={{ color: "#66fcf1", marginBottom: "20px" }}>Student Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Register Number"
          value={register_number}
          onChange={(e) => setRegNo(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
