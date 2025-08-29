import React from "react";
import "./doctor.dash.css";
import "./doctor-dashboard.css";
import { DoctorProvider } from "./context/DoctorContext";
import DoctorDashboardContent from "./components/DoctorDashboardContent";

const DoctorDashboard = () => {
  return (
    <DoctorProvider>
      <DoctorDashboardContent />
    </DoctorProvider>
  );
};

export default DoctorDashboard;