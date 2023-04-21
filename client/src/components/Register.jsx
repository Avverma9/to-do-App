import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:4000";

export default function Register() {
  const Navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.status) {
      alert(data.message);
      Navigate("/login");
    } else {
      alert(data.message);
      Navigate("/register");
    }
  };

  return (
    <div className="container">
      <form className="register-form" onSubmit={registerUser}>
        <input
          type="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="submit-btn">
          Register
        </button>
      </form>
    </div>
  );
}
