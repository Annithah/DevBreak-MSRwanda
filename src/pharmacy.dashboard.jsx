import React from 'react';
import { PharmacyProvider } from './context/PharmacyContext';
import PharmacyDashboardContent from './components/PharmacyDashboardContent';
import './pharmacy-dashboard.css';

const PharmacyDashboard = () => {
  return (
    <PharmacyProvider>
      <PharmacyDashboardContent />
    </PharmacyProvider>
  );
};

export default PharmacyDashboard;