import React from "react";
import { useState } from 'react';
import "./all.css";

function Hello() {
  const [values, setValues] = useState({
    firstname: '',
    lastname: '',
    dateofbirth: '',
    idnumber: '',
    nationality: '',
    bloodgroup: '',
    email: '',
    gender: '',
    healthinsurance: '',
    contact: '',
    weight: '',
    resume: '',
    about: '',
    password: ''
  });

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: [e.target.value] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <div className="container">
      <h1>Register In MedHub  System</h1>
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-column">
          <div className="form-group">
            <label htmlFor="firstname">First Name</label>
            <input type="text" placeholder="Enter First Name" name="firstname" onChange={handleChanges} required />
          </div>

          <div className="form-group">
            <label htmlFor="lastname">Last Name</label>
            <input type="text" placeholder="Enter Last Name" name="lastname" onChange={handleChanges} required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Enter Password" name="password" onChange={handleChanges} required />
          </div>

          <div className="form-group">
            <label htmlFor="dateofbirth">Date Of Birth</label>
            <input type="date" name="dateofbirth" onChange={handleChanges} required />
          </div>

          <div className="form-group">
            <label htmlFor="idnumber">Identification Number</label>
            <input type="text" placeholder="Enter ID Number" name="idnumber" onChange={handleChanges} required />
          </div>

          <div className="form-group">
            <label htmlFor="nationality">Nationality</label>
            <input type="text" placeholder="Enter Nationality" name="nationality" onChange={handleChanges} required />
          </div>
        </div>

        <div className="form-column">
          <div className="form-group">
            <label htmlFor="bloodgroup">Blood Group</label>
            <input type="text" placeholder="Enter Blood Group" name="bloodgroup" onChange={handleChanges} required />
          </div>

          <div className="form-group">
            <label htmlFor="weight">Weight (kg)</label>
            <input type="number" placeholder="Enter Your Weight" name="weight" onChange={handleChanges} required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Enter Email" name="email" onChange={handleChanges} required />
          </div>

          <div className="form-group">
            <label htmlFor="contact">Phone Number</label>
            <input type="tel" placeholder="Enter Phone Number" name="contact" onChange={handleChanges} required />
          </div>

          <div className="form-group">
            <label className="gender">Gender</label>
            <div className="radio-group">
              <label><input type="radio" name="gender" value="male" onChange={handleChanges} /> Male</label>
              <label><input type="radio" name="gender" value="female" onChange={handleChanges} /> Female</label>
              <label><input type="radio" name="gender" value="other" onChange={handleChanges} /> Other</label>
            </div>
          </div>
        </div>

        <div className="form-column">
          <div className="form-group">
            <label htmlFor="healthinsurance">Health Insurance Type</label>
            <select name="healthinsurance" onChange={handleChanges} required>
              <option value="">Select Insurance</option>
              <option value="mituelle de sante">Mituelle de Sante</option>
              <option value="rama">RAMA</option>
              <option value="rssb">RSSB</option>
              <option value="mmi">MMI</option>
              <option value="privatehealth">Private Health Insurance</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* <div className="form-group">
            <label htmlFor="resume">Medical Records (Optional)</label>
            <input type="file" name="resume" onChange={handleChanges} />
          </div> */}

          <div className="form-group">
            <label htmlFor="about">Message Describing the Symptoms</label>
            <textarea name="about" id="about" onChange={handleChanges} 
              placeholder="Describe the Symptoms of your sickness"></textarea>
          </div>

          <button type="submit" id="register">Register</button>

          <div className="check">
            <p id="account">Already Have Account? <a href="login">Login</a></p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Hello;