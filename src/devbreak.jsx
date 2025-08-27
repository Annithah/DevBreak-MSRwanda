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
        <input type="text" name="firstname" placeholder="First Name" onChange={handleChanges} required />
        <input type="text" name="lastname" placeholder="Last Name" onChange={handleChanges} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChanges} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChanges} required />
        <input type="date" name="dateofbirth" onChange={handleChanges} required />
        <input type="text" name="phonenumber" placeholder="Phone Number" onChange={handleChanges} required />
        <select name="gender" onChange={handleChanges} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
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
