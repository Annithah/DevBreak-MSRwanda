import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./p.dashboard.css";

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Sample data - in a real app, this would come from an API
  const patientData = {
    name: "Sarah Johnson",
    upcomingAppointments: 5,
    activePrescriptions: 3,
    pendingLabResults: 2,
    medicalRecords: 12,
    appointments: [
      {
        id: 1,
        doctor: "Dr. Michael Chen",
        date: "Jun 25, 2023 - 10:30 AM",
        department: "Cardiology",
        status: "Confirmed",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      {
        id: 2,
        doctor: "Dr. Emily Rodriguez",
        date: "Jun 28, 2023 - 2:15 PM",
        department: "Dermatology",
        status: "Pending",
        image: "https://randomuser.me/api/portraits/women/65.jpg",
      },
      {
        id: 3,
        doctor: "Dr. James Wilson",
        date: "Jul 02, 2023 - 9:00 AM",
        department: "Orthopedics",
        status: "Confirmed",
        image: "https://randomuser.me/api/portraits/men/75.jpg",
      },
      {
        id: 4,
        doctor: "Dr. Sarah Thompson",
        date: "Jul 05, 2023 - 11:45 AM",
        department: "Neurology",
        status: "Cancelled",
        image: "https://randomuser.me/api/portraits/women/32.jpg",
      },
    ],
  };

  return (
    <div className="patient-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>
            <i className="fas fa-heartbeat me-2"></i> MedHub
          </h3>
        </div>
        <div className="sidebar-menu">
          <ul>
            <li>
              <a
                href="#dashboard"
                className={activeTab === "dashboard" ? "active" : ""}
                onClick={() => setActiveTab("dashboard")}
              >
                <i className="fas fa-home"></i> <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="#appointments"
                className={activeTab === "appointments" ? "active" : ""}
                onClick={() => setActiveTab("appointments")}
              >
                <i className="fas fa-calendar-check"></i>{" "}
                <span>Appointments</span>
              </a>
            </li>
            <li>
              <a
                href="#prescriptions"
                className={activeTab === "prescriptions" ? "active" : ""}
                onClick={() => setActiveTab("prescriptions")}
              >
                <i className="fas fa-prescription"></i>{" "}
                <span>Prescriptions</span>
              </a>
            </li>
            <li>
              <a
                href="#lab-results"
                className={activeTab === "lab-results" ? "active" : ""}
                onClick={() => setActiveTab("lab-results")}
              >
                <i className="fas fa-flask"></i> <span>Lab Results</span>
              </a>
            </li>
            <li>
              <a
                href="#medical-records"
                className={activeTab === "medical-records" ? "active" : ""}
                onClick={() => setActiveTab("medical-records")}
              >
                <i className="fas fa-file-medical"></i>{" "}
                <span>Medical Records</span>
              </a>
            </li>
            <li>
              <a
                href="#billing"
                className={activeTab === "billing" ? "active" : ""}
                onClick={() => setActiveTab("billing")}
              >
                <i className="fas fa-credit-card"></i> <span>Billing</span>
              </a>
            </li>
            <li>
              <a
                href="#settings"
                className={activeTab === "settings" ? "active" : ""}
                onClick={() => setActiveTab("settings")}
              >
                <i className="fas fa-cog"></i> <span>Settings</span>
              </a>
            </li>
            <li>
              <a href="#logout">
                <i className="fas fa-sign-out-alt"></i> <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Search..." />
          </div>
          <div className="user-profile">
            <div className="notifications me-3">
              <i className="fas fa-bell"></i>
            </div>
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="User Profile"
            />
            <div className="user-info">
              <span className="d-block">{patientData.name}</span>
              <small className="text-muted">Patient</small>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row">
          <div className="col-md-3 col-sm-6">
            <div className="dashboard-card">
              <div className="card-icon blue">
                <i className="fas fa-calendar-check"></i>
              </div>
              <div className="stat-number">
                {patientData.upcomingAppointments}
              </div>
              <div className="stat-title">Upcoming Appointments</div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="dashboard-card">
              <div className="card-icon green">
                <i className="fas fa-prescription"></i>
              </div>
              <div className="stat-number">
                {patientData.activePrescriptions}
              </div>
              <div className="stat-title">Active Prescriptions</div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="dashboard-card">
              <div className="card-icon orange">
                <i className="fas fa-flask"></i>
              </div>
              <div className="stat-number">{patientData.pendingLabResults}</div>
              <div className="stat-title">Pending Lab Results</div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="dashboard-card">
              <div className="card-icon red">
                <i className="fas fa-file-medical"></i>
              </div>
              <div className="stat-number">{patientData.medicalRecords}</div>
              <div className="stat-title">Medical Records</div>
            </div>
          </div>
        </div>

        {/* Appointments and Charts Row */}
        <div className="row">
          <div className="col-lg-8">
            <div className="appointment-table">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5>Recent Appointments</h5>
                <button className="btn btn-sm btn-outline-primary">
                  View All
                </button>
              </div>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Doctor</th>
                      <th>Date & Time</th>
                      <th>Department</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patientData.appointments.map((appointment) => (
                      <tr key={appointment.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={appointment.image}
                              alt="Doctor"
                              width="35"
                              height="35"
                              className="rounded-circle me-2"
                            />
                            <div>{appointment.doctor}</div>
                          </div>
                        </td>
                        <td>{appointment.date}</td>
                        <td>{appointment.department}</td>
                        <td>
                          <span
                            className={`status-badge status-${appointment.status.toLowerCase()}`}
                          >
                            {appointment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-lg-4" id="chartcontainerid">
            <div className="chart-container mb-4">
              <h5 className="mb-4">Health Statistics</h5>
              <div className="chart-placeholder">
                <i className="fas fa-chart-line me-2"></i> Health Statistics
                Chart
              </div>
            </div>
            <div className="chart-container">
              <h5 className="mb-4">Medication Schedule</h5>
              <div className="chart-placeholder">
                <i className="fas fa-pills me-2"></i> Medication Schedule Chart
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
