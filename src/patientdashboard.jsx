import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./p.dashboard.css";

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [reason, setReason] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      fetch(`http://localhost:2000/api/patient/${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setPatientData({
            name: `${data.firstname} ${data.lastname}`,
            upcomingAppointments: 5, // You can replace with real values if needed
            activePrescriptions: 3,
            pendingLabResults: 2,
            medicalRecords: 12,
          });
        })
        .catch((err) => {
          console.error("Failed to fetch patient data:", err);
        });
    }
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      fetch(`http://localhost:2000/api/patient/${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setPatientData({
            name: `${data.firstname} ${data.lastname}`,
            upcomingAppointments: data.upcomingAppointments,
            activePrescriptions: data.activePrescriptions,
            pendingLabResults: data.pendingLabResults,
            medicalRecords: data.medicalRecords,
          });
        })
        .catch((err) => console.error("Failed to fetch patient data:", err));
    }
  }, []);

  const user = JSON.parse(localStorage.getItem("user")); // Assuming user is logged in

  useEffect(() => {
    if (user?.id) {
      fetch(`http://localhost:2000/api/appointments?patientId=${user.id}`)
        .then((res) => res.json())
        .then((data) => setAppointments(data))
        .catch((err) => console.error("Failed to fetch appointments:", err));
    }
  }, [user]);

  useEffect(() => {
    fetch("http://localhost:2000/api/doctors")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDoctors(data);
        } else {
          console.error("Doctors response is not an array", data);
          setDoctors([]); // to avoid `.map is not a function` errors
        }
      })
      .catch((err) => {
        console.error("Error fetching doctors:", err);
        setDoctors([]);
      });
  }, []);

  const handleBookAppointment = async (e) => {
    e.preventDefault();

    if (!user || !user.id) {
      console.error("User not logged in.");
      return;
    }

    const newAppointment = {
      doctorId: selectedDoctor,
      date: appointmentDate,
      time: appointmentTime,
      reason,
    };

    try {
      const res = await fetch("http://localhost:2000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user": JSON.stringify({ id: user.id }),
        },
        body: JSON.stringify(newAppointment),
      });

      if (!res.ok) {
        const error = await res.json();
        console.error("Booking failed:", error);
        return;
      }

      const result = await res.json();
      setAppointments((prev) => [result, ...prev]); // Add new appointment
      resetForm();
      setShowAppointmentModal(false);
    } catch (err) {
      console.error("Error booking appointment:", err);
    }
  };

  const resetForm = () => {
    setSelectedDoctor("");
    setAppointmentDate("");
    setAppointmentTime("");
    setReason("");
  };

  const handleCancelAppointment = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:2000/api/appointments/${id}/cancel`,
        {
          method: "PATCH",
        }
      );

      if (!res.ok) {
        const err = await res.json();
        console.error("Cancel failed:", err);
        return;
      }

      // Update appointment status in state
      setAppointments((prev) =>
        prev.map((app) =>
          app.id === id ? { ...app, status: "Cancelled" } : app
        )
      );
    } catch (err) {
      console.error("Error cancelling appointment:", err);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        if (!patientData) {
          return <div>Loading...</div>;
        }
        return (
          <>
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
                  <div className="stat-number">
                    {patientData.pendingLabResults}
                  </div>
                  <div className="stat-title">Pending Lab Results</div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="dashboard-card">
                  <div className="card-icon red">
                    <i className="fas fa-file-medical"></i>
                  </div>
                  <div className="stat-number">
                    {patientData.medicalRecords}
                  </div>
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
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => setActiveTab("appointments")}
                    >
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
                      {/* Inside "dashboard" case in renderContent */}

                      <tbody>
                        {(Array.isArray(appointments)
                          ? appointments.slice(0, 5)
                          : []
                        ).map((appointment) => (
                          <tr key={appointment.id}>
                            <td>
                              <div className="d-flex align-items-center">
                                <img
                                  src={appointment.image_url}
                                  alt="Doctor"
                                  width="35"
                                  height="35"
                                  className="rounded-circle me-2"
                                />
                                <div>{appointment.doctor}</div>
                              </div>
                            </td>
                            <td>{appointment.date}</td>
                            <td>{appointment.specialization}</td>
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
              <div className="col-lg-4">
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
                    <i className="fas fa-pills me-2"></i> Medication Schedule
                    Chart
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case "appointments":
        return (
          <div className="appointment-table">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5>My Appointments</h5>
              <button
                className="btn btn-primary"
                onClick={() => setShowAppointmentModal(true)}
              >
                <i className="fas fa-plus me-2"></i> Book Appointment
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
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(Array.isArray(appointments) ? appointments : []).map(
                    (appointment) => (
                      <tr key={appointment.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={appointment.image_url}
                              alt="Doctor"
                              width="35"
                              height="35"
                              className="rounded-circle me-2"
                            />
                            <div>{appointment.doctor}</div>
                          </div>
                        </td>
                        <td>{appointment.date}</td>
                        <td>{appointment.specialization}</td>
                        <td>
                          <span
                            className={`status-badge status-${appointment.status.toLowerCase()}`}
                          >
                            {appointment.status}
                          </span>
                        </td>
                        <td>
                          {appointment.status === "Pending" && (
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() =>
                                handleCancelAppointment(appointment.id)
                              }
                            >
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "prescriptions":
        return (
          <div className="dashboard-card">
            <h5>My Prescriptions</h5>
            <p className="text-muted">No active prescriptions at the moment.</p>
          </div>
        );
      case "lab-results":
        return (
          <div className="dashboard-card">
            <h5>Lab Results</h5>
            <p className="text-muted">No lab results available.</p>
          </div>
        );
      case "medical-records":
        return (
          <div className="dashboard-card">
            <h5>Medical Records</h5>
            <p className="text-muted">Your medical records will appear here.</p>
          </div>
        );
      case "billing":
        return (
          <div className="dashboard-card">
            <h5>Billing Information</h5>
            <p className="text-muted">No bills pending at the moment.</p>
          </div>
        );
      case "settings":
        return (
          <div className="dashboard-card">
            <h5>Account Settings</h5>
            <p className="text-muted">Settings content goes here.</p>
          </div>
        );
      default:
        return (
          <div className="dashboard-card">
            <h5>Dashboard</h5>
            <p className="text-muted">Select a menu option to view details.</p>
          </div>
        );
    }
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
              <span className="d-block">
                {patientData ? patientData.name : "Loading..."}
              </span>

              <small className="text-muted">Patient</small>
            </div>
          </div>
        </div>

        {/* Dynamic Content Based on Active Tab */}
        {renderContent()}
      </div>

      {/* Appointment Modal */}
      {showAppointmentModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Book New Appointment</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowAppointmentModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleBookAppointment}>
                <div className="mb-3">
                  <label htmlFor="doctor" className="form-label">
                    Select Doctor
                  </label>
                  <select
                    className="form-select"
                    id="doctor"
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    required
                  >
                    <option value="">Choose a doctor</option>
                    {Array.isArray(doctors) &&
                      doctors.map((doctor) => (
                        <option key={doctor.id} value={doctor.id}>
                          {doctor.name} - {doctor.specialization}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="time" className="form-label">
                    Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="time"
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="reason" className="form-label">
                    Reason for Visit
                  </label>
                  <textarea
                    className="form-control"
                    id="reason"
                    rows="3"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-secondary me-2"
                    onClick={() => setShowAppointmentModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Book Appointment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;
