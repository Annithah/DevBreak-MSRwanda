// DoctorContext.jsx
import React, { createContext, useState, useEffect } from "react";

// Create Context
export const DoctorContext = createContext();

// Provider Component
export const DoctorProvider = ({ children }) => {
  const [currentPatient, setCurrentPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [aiDiagnosis, setAiDiagnosis] = useState(null);

  // Fetch mock data on mount
  useEffect(() => {
    setAppointments([
      { id: 1, patientName: "Marie Uwase", patientId: "P-12345", time: "09:00 AM", status: "confirmed", photo: "https://randomuser.me/api/portraits/women/32.jpg" },
      { id: 2, patientName: "Thomas Manzi", patientId: "P-12346", time: "10:30 AM", status: "confirmed", photo: "https://randomuser.me/api/portraits/men/42.jpg" },
      { id: 3, patientName: "Jeanne Mukamana", patientId: "P-12347", time: "12:00 PM", status: "pending", photo: "https://randomuser.me/api/portraits/women/68.jpg" },
    ]);

    setTasks([
      { id: 1, title: "Follow up with Marie Uwase", due: "Due today", completed: false },
      { id: 2, title: "Review Thomas Manzi's lab results", due: "Due tomorrow", completed: false },
      { id: 3, title: "Submit monthly report", due: "Due in 3 days", completed: false },
    ]);

    setNotifications([
      { id: 1, type: "urgent", title: "Urgent: Lab Results Ready", message: "Thomas Manzi's blood test shows critical values", icon: "exclamation" },
      { id: 2, type: "normal", title: "New Appointment", message: "New patient booked for tomorrow at 3:00 PM", icon: "calendar-plus" },
    ]);
  }, []);

  // Fetch Patient Data
  const fetchPatientData = (patientId) => {
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
        { test: "HbA1c", value: "7.2%", status: "High" },
      ],
      medications: [
        { name: "Metformin", dosage: "500mg", frequency: "Twice daily" },
        { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" },
      ],
    };
    setCurrentPatient(mockPatientData);
  };

  // Fetch AI Diagnosis
  const fetchAiDiagnosis = () => {
    const mockAiDiagnosis = {
      conditions: ["Possible hypertension complications", "Risk of diabetic neuropathy"],
      recommendations: ["Recommend echocardiogram", "Adjust medication dosage"],
    };
    setAiDiagnosis(mockAiDiagnosis);
  };

  // Toggle Task Completion
  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task));
  };

  return (
    <DoctorContext.Provider
      value={{
        currentPatient,
        appointments,
        tasks,
        notifications,
        activeTab,
        aiDiagnosis,
        setActiveTab,
        fetchPatientData,
        fetchAiDiagnosis,
        toggleTaskCompletion
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};
