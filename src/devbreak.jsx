import React, { useState } from "react";
import "./all.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Hello() {
  const [values, setValues] = useState({
    firstname: '',
    lastname: '',
    password: '',
    dateofbirth: '',
    identificationumber: '',
    nationality: '',
    bloodgroup: '',
    weight: '',
    phonenumber: '',
    gender: '',
    healthinsurancetype: '',
    messageofsysmptoms: '',
    email: ''
  });

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:2000/register", values)
      .then((res) => {
        console.log(res.data); // Debug: see backend response
        alert(res.data.message || "Registration successful");
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data?.message || "Registration failed");
      });
  };

  return (
    <div className="container">
      <h1>Register In MedHub System</h1>
      <form onSubmit={handleSubmit} className="form-grid">
        {/* ... keep your form fields as before ... */}
        <div className="form-column">
          <button type="submit" id="register">
            Register
          </button>
          <div className="check">
            <p id="account">
              Already Have Account? <a href="/login">Login</a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Hello;
