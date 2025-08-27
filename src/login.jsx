import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:2000/login", values);
      console.log(res.data); // Debug: see backend response

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        alert("Login successful");
        navigate("/patient"); // Make sure /dashboard route exists
      }
      
    } catch (err) {
      console.error(err);
      if (err.response) {
        alert(err.response.data.message || "Login failed");
      } else {
        alert("Network error. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="login-container">
        <h2 className="form-title">Login In MedHub</h2>
        <div className="social-login">
          <div className="input-wrapper">
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              placeholder="Email"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={values.password}
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              required
            />
          </div>

          <Link to="#" className="forgot-pass-link">
            Forgot Password?
          </Link>

          <button className="login-button" type="submit">
            Login
          </button>
        </div>

        <p className="signup-text">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </form>
  );
}

export default Login;
