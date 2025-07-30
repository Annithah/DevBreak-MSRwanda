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
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <h1>Register In MedHub System</h1>
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-column">
          <div className="form-group">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              placeholder="Enter First Name"
              name="firstname"
              value={values.firstname}
              onChange={handleChanges}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              placeholder="Enter Last Name"
              name="lastname"
              value={values.lastname}
              onChange={handleChanges}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={values.password}
              onChange={handleChanges}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dateofbirth">Date Of Birth</label>
            <input
              type="date"
              name="dateofbirth"
              value={values.dateofbirth}
              onChange={handleChanges}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="identificationumber">Identification Number</label>
            <input
              type="text"
              placeholder="Enter ID Number"
              name="identificationumber"
              value={values.identificationumber}
              onChange={handleChanges}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="nationality">Nationality</label>
            <input
              type="text"
              placeholder="Enter Nationality"
              name="nationality"
              value={values.nationality}
              onChange={handleChanges}
              required
            />
          </div>
        </div>

        <div className="form-column">
          <div className="form-group">
            <label htmlFor="bloodgroup">Blood Group</label>
            <input
              type="text"
              placeholder="Enter Blood Group"
              name="bloodgroup"
              value={values.bloodgroup}
              onChange={handleChanges}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="weight">Weight (kg)</label>
            <input
              type="number"
              placeholder="Enter Your Weight"
              name="weight"
              value={values.weight}
              onChange={handleChanges}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              value={values.email}
              onChange={handleChanges}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact">Phone Number</label>
            <input
              type="tel"
              placeholder="Enter Phone Number"
              name="phonenumber"
              value={values.phonenumber}
              onChange={handleChanges}
              required
            />
          </div>

          <div className="form-group">
            <label className="gender">Gender</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={values.gender === "male"}
                  onChange={handleChanges}
                /> Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={values.gender === "female"}
                  onChange={handleChanges}
                /> Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={values.gender === "other"}
                  onChange={handleChanges}
                /> Other
              </label>
            </div>
          </div>
        </div>

        <div className="form-column">
          <div className="form-group">
            <label htmlFor="healthinsurancetype">Health Insurance Type</label>
            <select
              name="healthinsurancetype"
              value={values.healthinsurancetype}
              onChange={handleChanges}
              required
            >
              <option value="">Select Insurance</option>
              <option value="mituelle de sante">Mituelle de Sante</option>
              <option value="rama">RAMA</option>
              <option value="rssb">RSSB</option>
              <option value="mmi">MMI</option>
              <option value="privatehealth">Private Health Insurance</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="messageofsysmptoms">Message of Symptoms</label>
            <textarea
              name="messageofsysmptoms"
              id="about"
              value={values.messageofsysmptoms}
              onChange={handleChanges}
              placeholder="Describe the Symptoms of your sickness"
            ></textarea>
          </div>

          <button type="submit" id="register">
            Register
          </button>

          <div className="check">
            <p id="account">
              Already Have Account? <a href="login">Login</a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Hello;
