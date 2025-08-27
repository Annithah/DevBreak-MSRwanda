import React, { useState, useEffect } from 'react';
import './doctor.dash.css';

const DoctorDashboard = () => {
  const [currentPatient, setCurrentPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);

  const [tasks, setTasks] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [aiDiagnosis, setAiDiagnosis] = useState(null);

  // Simulate API calls with useEffect
  useEffect(() => {
    // Fetch appointments
    const fetchAppointments = async () => {
      // In a real app, this would be an API call
      const mockAppointments = [
        {
          id: 1,
          patientName: "Marie Uwase",
          patientId: "P-12345",
          time: "09:00 AM",
          status: "confirmed",
          photo: "https://randomuser.me/api/portraits/women/32.jpg"
        },
        {
          id: 2,
          patientName: "Thomas Manzi",
          patientId: "P-12346",
          time: "10:30 AM",
          status: "confirmed",
          photo: "https://randomuser.me/api/portraits/men/42.jpg"
        },
        {
          id: 3,
          patientName: "Jeanne Mukamana",
          patientId: "P-12347",
          time: "12:00 PM",
          status: "pending",
          photo: "https://randomuser.me/api/portraits/women/68.jpg"
        }
      ];
      setAppointments(mockAppointments);
    };

    // Fetch tasks
    const fetchTasks = async () => {
      // In a real app, this would be an API call
      const mockTasks = [
        {
          id: 1,
          title: "Follow up with Marie Uwase",
          due: "Due today",
          completed: false
        },
        {
          id: 2,
          title: "Review Thomas Manzi's lab results",
          due: "Due tomorrow",
          completed: false
        },
        {
          id: 3,
          title: "Submit monthly report",
          due: "Due in 3 days",
          completed: false
        }
      ];
      setTasks(mockTasks);
    };

    // Fetch notifications
    const fetchNotifications = async () => {
      // In a real app, this would be an API call
      const mockNotifications = [
        {
          id: 1,
          type: "urgent",
          title: "Urgent: Lab Results Ready",
          message: "Thomas Manzi's blood test shows critical values",
          icon: "exclamation"
        },
        {
          id: 2,
          type: "normal",
          title: "New Appointment",
          message: "New patient booked for tomorrow at 3:00 PM",
          icon: "calendar-plus"
        }
      ];
      setNotifications(mockNotifications);
    };

    fetchAppointments();
    fetchTasks();
    fetchNotifications();
  }, []);

  // Function to fetch patient data
  const fetchPatientData = (patientId) => {
    // In a real app, this would be an API call
    const mockPatientData = {
      id: patientId,
      name: "Marie Uwase",
      photo: "https://randomuser.me/api/portraits/women/32.jpg",
      age: "42 years",
      gender: "Female",
      contact: "+250 78X XXX XXX",
      bloodType: "O+",
      allergies: "Penicillin, Shellfish",
      conditions: ["Hypertension (diagnosed 2018)", "Type 2 Diabetes (diagnosed 2020)"],
      lastVisit: "March 15, 2024",
      lastNotes: "Patient presented with elevated blood pressure (150/95). Adjusted medication dosage.",
      labResults: [
        { test: "Glucose", value: "145 mg/dL", status: "High" },
        { test: "Cholesterol", value: "210 mg/dL", status: "High" },
        { test: "HbA1c", value: "7.2%", status: "High" }
      ],
      medications: [
        { name: "Metformin", dosage: "500mg", frequency: "Twice daily" },
        { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" }
      ]
    };
    setCurrentPatient(mockPatientData);
  };

  // Function to fetch AI diagnosis
  const fetchAiDiagnosis = () => {
    // In a real app, this would be an API call
    const mockAiDiagnosis = {
      conditions: ["Possible hypertension complications", "Risk of diabetic neuropathy"],
      recommendations: ["Recommend echocardiogram", "Adjust medication dosage"]
    };
    setAiDiagnosis(mockAiDiagnosis);
  };

  // Function to toggle task completion
  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="doctor-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <i className="fas fa-hospital-user fa-2x"></i>
          <h1>MedHub Doctor Dashboard</h1>
        </div>
        
        <div className="menu-item active">
          <i className="fas fa-home"></i>
          <span>Dashboard</span>
        </div>
        <div className="menu-item">
          <i className="fas fa-calendar-check"></i>
          <span>Appointments</span>
        </div>
        <div className="menu-item">
          <i className="fas fa-user-injured"></i>
          <span>Patients</span>
        </div>
        <div className="menu-item">
          <i className="fas fa-prescription"></i>
          <span>E-Prescription</span>
        </div>
        <div className="menu-item">
          <i className="fas fa-stethoscope"></i>
          <span>Telemedicine</span>
        </div>
        <div className="menu-item">
          <i className="fas fa-flask"></i>
          <span>Lab Results</span>
        </div>
        <div className="menu-item">
          <i className="fas fa-brain"></i>
          <span>AI Assistant</span>
        </div>
        <div className="menu-item">
          <i className="fas fa-book-medical"></i>
          <span>Knowledge Hub</span>
        </div>
        <div className="menu-item">
          <i className="fas fa-cog"></i>
          <span>Settings</span>
        </div>
        
        <div className="menu-item logout">
          <i className="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <div className="welcome">
            <h2>Good Morning, Dr. Niyonzima</h2>
            <p>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          
          <div className="search-bar">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Search patient, record, or appointment..." />
          </div>
          
          <div className="user-profile">
            <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="Doctor Profile" />
            <div>
              <h4>Dr. Jean Niyonzima</h4>
              <p>Cardiologist</p>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="dashboard-grid">
          {/* Today's Appointments */}
          <div className="card">
            <div className="card-header">
              <h3>Today's Appointments</h3>
              <i className="fas fa-calendar"></i>
            </div>
            {appointments.map(appointment => (
              <div key={appointment.id} className="appointment" onClick={() => fetchPatientData(appointment.patientId)}>
                <div className="patient-info">
                  <img src={appointment.photo} alt="Patient" />
                  <div>
                    <h4>{appointment.patientName}</h4>
                    <p>ID: {appointment.patientId}</p>
                  </div>
                </div>
                <div className="appointment-time">{appointment.time}</div>
                <div className={`status ${appointment.status}`}>{appointment.status}</div>
              </div>
            ))}
          </div>

          {/* Health Metrics */}
          <div className="card">
            <div className="card-header">
              <h3>Patient Health Trends</h3>
              <i className="fas fa-chart-line"></i>
            </div>
            <div className="chart-container">
              <p>Health trend data will be visualized here</p>
              {/* In a real app, you would use a charting library like Chart.js or Recharts */}
            </div>
          </div>

          {/* Tasks & Reminders */}
          <div className="card">
            <div className="card-header">
              <h3>Tasks & Reminders</h3>
              <i className="fas fa-tasks"></i>
            </div>
            {tasks.map(task => (
              <div key={task.id} className="task">
                <input 
                  type="checkbox" 
                  checked={task.completed} 
                  onChange={() => toggleTaskCompletion(task.id)} 
                />
                <div className="task-details">
                  <div className="task-title">{task.title}</div>
                  <div className="task-time">{task.due}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Notifications */}
          <div className="card">
            <div className="card-header">
              <h3>Notifications</h3>
              <i className="fas fa-bell"></i>
            </div>
            {notifications.map(notification => (
              <div key={notification.id} className="notification">
                <div className={`notification-icon ${notification.type}`}>
                  <i className={`fas fa-${notification.icon}`}></i>
                </div>
                <div>
                  <h4>{notification.title}</h4>
                  <p>{notification.message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Patient Overview */}
          {currentPatient && (
            <div className="card full-width">
              <div className="card-header">
                <h3>Patient Overview - {currentPatient.name}</h3>
                <i className="fas fa-user-injured"></i>
              </div>
              <div className="patient-details">
                <img src={currentPatient.photo} alt="Patient" className="patient-image" />
                <div className="patient-info-grid">
                  <div className="info-item">
                    <h4>Name</h4>
                    <p>{currentPatient.name}</p>
                  </div>
                  <div className="info-item">
                    <h4>Age</h4>
                    <p>{currentPatient.age}</p>
                  </div>
                  <div className="info-item">
                    <h4>Gender</h4>
                    <p>{currentPatient.gender}</p>
                  </div>
                  <div className="info-item">
                    <h4>Contact</h4>
                    <p>{currentPatient.contact}</p>
                  </div>
                  <div className="info-item">
                    <h4>Patient ID</h4>
                    <p>{currentPatient.id}</p>
                  </div>
                  <div className="info-item">
                    <h4>Last Visit</h4>
                    <p>{currentPatient.lastVisit}</p>
                  </div>
                  <div className="info-item">
                    <h4>Blood Type</h4>
                    <p>{currentPatient.bloodType}</p>
                  </div>
                  <div className="info-item">
                    <h4>Allergies</h4>
                    <p>{currentPatient.allergies}</p>
                  </div>
                </div>
              </div>

              <div className="tabs">
                <div 
                  className={`tab ${activeTab === 'overview' ? 'active' : ''}`} 
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </div>
                <div 
                  className={`tab ${activeTab === 'medical-history' ? 'active' : ''}`} 
                  onClick={() => setActiveTab('medical-history')}
                >
                  Medical History
                </div>
                <div 
                  className={`tab ${activeTab === 'lab-results' ? 'active' : ''}`} 
                  onClick={() => setActiveTab('lab-results')}
                >
                  Lab Results
                </div>
                <div 
                  className={`tab ${activeTab === 'prescriptions' ? 'active' : ''}`} 
                  onClick={() => setActiveTab('prescriptions')}
                >
                  Prescriptions
                </div>
              </div>

              <div className="tab-content">
                {activeTab === 'overview' && (
                  <div>
                    <p><strong>Last Visit Notes:</strong> {currentPatient.lastNotes}</p>
                    <p><strong>Chronic Conditions:</strong> {currentPatient.conditions.join(', ')}</p>
                  </div>
                )}
                {activeTab === 'medical-history' && (
                  <div>
                    <p><strong>Medical History:</strong></p>
                    <ul>
                      {currentPatient.conditions.map((condition, index) => (
                        <li key={index}>{condition}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {activeTab === 'lab-results' && (
                  <div>
                    <p><strong>Latest Lab Results:</strong></p>
                    <ul>
                      {currentPatient.labResults.map((result, index) => (
                        <li key={index}>{result.test}: {result.value} ({result.status})</li>
                      ))}
                    </ul>
                  </div>
                )}
                {activeTab === 'prescriptions' && (
                  <div>
                    <p><strong>Current Medications:</strong></p>
                    <ul>
                      {currentPatient.medications.map((med, index) => (
                        <li key={index}>{med.name} {med.dosage} - {med.frequency}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* AI Assistant */}
          <div className="card">
            <div className="card-header">
              <h3>AI Diagnosis Assistant</h3>
              <i className="fas fa-robot"></i>
            </div>
            <div className="ai-container">
              {aiDiagnosis ? (
                <div>
                  <p>Based on patient symptoms and history, AI suggests:</p>
                  <ul>
                    {aiDiagnosis.conditions.map((condition, index) => (
                      <li key={index}>{condition}</li>
                    ))}
                  </ul>
                  <p>Recommendations:</p>
                  <ul>
                    {aiDiagnosis.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>AI diagnosis assistant ready to analyze patient data</p>
              )}
              <div className="ai-actions">
                <button onClick={fetchAiDiagnosis}>
                  <i className="fas fa-stethoscope"></i> Generate Diagnosis
                </button>
              </div>
            </div>
          </div>

          {/* Telemedicine */}
          <div className="card">
            <div className="card-header">
              <h3>Telemedicine</h3>
              <i className="fas fa-video"></i>
            </div>
            <div className="telemedicine-container">
              <p>Start a video consultation with your patient:</p>
              <div className="telemedicine-actions">
                <button className="btn-primary">
                  <i className="fas fa-video"></i> Start Video Call
                </button>
                <button className="btn-secondary">
                  <i className="fas fa-phone"></i> Audio Call Only
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;