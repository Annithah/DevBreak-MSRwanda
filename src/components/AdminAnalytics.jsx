import React from 'react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

const AdminAnalytics = ({ analytics }) => {
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Users Growth',
      data: [65, 89, 120, 151, 180, 210],
      borderColor: '#667eea',
      backgroundColor: 'rgba(102, 126, 234, 0.1)',
      tension: 0.4
    }]
  };

  const doughnutData = {
    labels: ['Patients', 'Doctors', 'Pharmacies'],
    datasets: [{
      data: [analytics.totalPatients || 1180, analytics.totalDoctors || 45, 25],
      backgroundColor: ['#667eea', '#764ba2', '#f093fb']
    }]
  };

  const barData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Daily Appointments',
      data: [12, 19, 15, 25, 22, 18, 20],
      backgroundColor: '#667eea'
    }]
  };

  return (
    <div className="analytics-grid">
      <div className="chart-card">
        <h4>User Growth Trend</h4>
        <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
      <div className="chart-card">
        <h4>User Distribution</h4>
        <Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
      <div className="chart-card">
        <h4>Weekly Appointments</h4>
        <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

export default AdminAnalytics;