import React from "react";
import "./p.dashboard.css";
import { Link, useLocation } from "react-router-dom";
// import { FaBars } from "react-icons/fa";
import { showSidebar } from "react";

function PatientDashboard() {
  const location = useLocation();

  return (
    <div className="dashboard-container">
      <div className="menu-icon">{/* <FaBars /> */}</div>

      <div className={`sidebar-fordata ${showSidebar ? "show" : "hide"}`}>
        <Link
          to="/patient"
          className={`sidebar ${
            location.pathname === "/patient" ? "active" : ""
          }`}
        >
          Dashboard
        </Link>
        <Link
          to="/Appointments"
          className={`sidebar ${
            location.pathname === "/Appointments" ? "active" : ""
          }`}
        >
          Appointments
        </Link>
        <Link
          to="/lab results"
          className={`sidebar ${
            location.pathname === "/lab results" ? "active" : ""
          }`}
        >
          Lab Results
        </Link>
        <Link
          to="/payments"
          className={`sidebar ${
            location.pathname === "/payments" ? "active" : ""
          }`}
        >
          Billings and Payments
        </Link>
        <Link
          to="/meet doctor"
          className={`sidebar ${
            location.pathname === "/meet doctor" ? "active" : ""
          }`}
        >
          Doctor Contact
        </Link>
        <Link
          to="/medical history"
          className={`sidebar ${
            location.pathname === "/medical history" ? "active" : ""
          }`}
        >
          Medical History
        </Link>
        <Link
          to="/ai agent"
          className={`sidebar ${
            location.pathname === "/ai agent" ? "active" : ""
          }`}
        >
          AI Agent Chatbot
        </Link>
        <Link
          to="/settings"
          className={`sidebar ${
            location.pathname === "/settings" ? "active" : ""
          }`}
        >
          Settings
        </Link>
        <Link to="/" className="sidebar">
          Logout
        </Link>
      </div>

      <div className="navbar">
        <div className="profile">
          <h1>Welcome</h1>
        </div>
      </div>
       
<div className="cards-container">
  <div className="small-sections apointments">
    <div>
      <h1>Appointments</h1>
      <p>Upcoming</p>
    </div>
    <p className="count">12</p>
  </div>
  
  <div className="small-sections lab-results">
    <div>
      <h1>Laboratory Results</h1>
      <p>Pending</p>
    </div>
    <p className="count">10</p>
  </div>
</div>



       </div>
   
    /* the navigtion that will be containing the profile of the patient */
  );




}

export default PatientDashboard;
