import React from 'react';
import './admin.dashboard.css';
import './modern-admin.css';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement } from 'chart.js';
import { AdminProvider } from './context/AdminContext';
import AdminDashboardContent from './components/AdminDashboardContent';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement);

const AdminDashboard = () => {

  return (
    <AdminProvider>
      <AdminDashboardContent />
    </AdminProvider>
  );
};

export default AdminDashboard;