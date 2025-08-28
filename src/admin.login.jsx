import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function AdminLogin() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Temporary bypass for testing
    if (values.email === "admin@medihub.com" && values.password === "admin123") {
      localStorage.setItem("adminToken", "temp-admin-token");
      localStorage.setItem("admin", JSON.stringify({name: "Admin User", email: values.email}));
      alert("Admin login successful");
      navigate("/admin");
      return;
    }

    try {
      const res = await axios.post("http://localhost:2000/admin/login", values);
      
      if (res.data.token) {
        localStorage.setItem("adminToken", res.data.token);
        localStorage.setItem("admin", JSON.stringify(res.data.admin));
        alert("Admin login successful");
        navigate("/admin");
      }
      
    } catch (err) {
      console.error(err);
      alert("Use admin@medihub.com / admin123 for testing");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="login-container">
        <h2 className="form-title">Admin Login - MedHub</h2>
        <div className="social-login">
          <div className="input-wrapper">
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              placeholder="Admin Email"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Admin Password"
              value={values.password}
              onChange={(e) => setValues({ ...values, password: e.target.value })}
              required
            />
          </div>

          <button className="login-button" type="submit">
            Admin Login
          </button>
        </div>

        <p className="signup-text">
          <Link to="/">Back to Home</Link>
        </p>
      </div>
    </form>
  );
}

export default AdminLogin;