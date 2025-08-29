import React from "react";
import "./p.dashboard.css";
import "./patient-dashboard.css";
import { PatientProvider } from "./context/PatientContext";
import PatientDashboardContent from "./components/PatientDashboardContent";

const PatientDashboard = () => {
  return (
    <PatientProvider>
      <PatientDashboardContent />
    </PatientProvider>
  );
};

export default PatientDashboard;