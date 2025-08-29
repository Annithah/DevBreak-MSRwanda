import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from './components/ErrorBoundary';
import Hello from "./devbreak";
import Homepage from "./homepage";
import Login from "./login";
import PatientDashboard from "./patientdashboard";
import GoToAnother from "./go-as";
import MakeAppointment from './appointments';
import DoctorDashboard from './doctor.dash';
import PharmacyDashboard from './pharmacy.dashboard';
import AdminLogin from './admin.login';
import AdminDashboard from './admin.dashboard';
import TestSuite from './components/TestSuite';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Hello />} />
          <Route path="/" element={<Homepage />} />
          <Route path="login" element={<Login/>} />
          <Route path="/patient" element={< PatientDashboard/>}/>
          <Route path="/continue-as" element={<GoToAnother/>}/>
          <Route path="/appointment" element={<MakeAppointment/>}/>
          <Route path="/doctor" element={<DoctorDashboard/>}/>
          <Route path="/pharmacy" element={<PharmacyDashboard/>}/>
          <Route path="/admin/login" element={<AdminLogin/>}/>
          <Route path="/admin" element={<AdminDashboard/>}/>
          <Route path="/test" element={<TestSuite/>}/>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
