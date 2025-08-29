import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import AdminAnalytics from './AdminAnalytics';
import UserManagement from './UserManagement';
import PermissionsManager from './PermissionsManager';
import SystemMonitoring from './SystemMonitoring';
import ReportsGeneration from './ReportsGeneration';
import BackupRestore from './BackupRestore';

const AdminDashboardContent = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { users, analytics, updateUserStatus, deleteUser } = useAdmin();

  const handleUserAction = (userId, action) => {
    const newStatus = action === 'activate' ? 'Active' : 'Inactive';
    updateUserStatus(userId, newStatus);
    alert(`User ${action === 'activate' ? 'activated' : 'suspended'} successfully`);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(userId);
      alert('User deleted successfully');
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <i className="fas fa-shield-alt fa-2x"></i>
          <h1>Admin Panel</h1>
        </div>
        
        <div className={`menu-item ${activeTab === 'overview' ? 'active' : ''}`} 
             onClick={() => setActiveTab('overview')}>
          <i className="fas fa-tachometer-alt"></i>
          <span>Overview</span>
        </div>
        <div className={`menu-item ${activeTab === 'users' ? 'active' : ''}`}
             onClick={() => setActiveTab('users')}>
          <i className="fas fa-users"></i>
          <span>User Management</span>
        </div>
        <div className={`menu-item ${activeTab === 'analytics' ? 'active' : ''}`}
             onClick={() => setActiveTab('analytics')}>
          <i className="fas fa-chart-bar"></i>
          <span>Analytics</span>
        </div>
        <div className={`menu-item ${activeTab === 'permissions' ? 'active' : ''}`}
             onClick={() => setActiveTab('permissions')}>
          <i className="fas fa-shield-alt"></i>
          <span>Permissions</span>
        </div>
        <div className={`menu-item ${activeTab === 'monitoring' ? 'active' : ''}`}
             onClick={() => setActiveTab('monitoring')}>
          <i className="fas fa-desktop"></i>
          <span>System Monitor</span>
        </div>
        <div className={`menu-item ${activeTab === 'reports' ? 'active' : ''}`}
             onClick={() => setActiveTab('reports')}>
          <i className="fas fa-file-alt"></i>
          <span>Reports</span>
        </div>
        <div className={`menu-item ${activeTab === 'backup' ? 'active' : ''}`}
             onClick={() => setActiveTab('backup')}>
          <i className="fas fa-database"></i>
          <span>Backup</span>
        </div>
        <div className={`menu-item ${activeTab === 'settings' ? 'active' : ''}`}
             onClick={() => setActiveTab('settings')}>
          <i className="fas fa-cog"></i>
          <span>Settings</span>
        </div>
        
        <div className="menu-item logout" onClick={() => {
          localStorage.removeItem('adminToken');
          window.location.href = '/';
        }}>
          <i className="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h2>MediHub Admin Dashboard</h2>
          <div className="admin-profile">
            <img src="https://randomuser.me/api/portraits/men/85.jpg" alt="Admin" />
            <span>Admin User</span>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="overview-content">
            <div className="stats-grid">
              <div className="stat-card">
                <i className="fas fa-users"></i>
                <div>
                  <h3>{analytics.totalUsers}</h3>
                  <p>Total Users</p>
                </div>
              </div>
              <div className="stat-card">
                <i className="fas fa-user-md"></i>
                <div>
                  <h3>{analytics.totalDoctors}</h3>
                  <p>Doctors</p>
                </div>
              </div>
              <div className="stat-card">
                <i className="fas fa-user-injured"></i>
                <div>
                  <h3>{analytics.totalPatients}</h3>
                  <p>Patients</p>
                </div>
              </div>
              <div className="stat-card">
                <i className="fas fa-calendar-check"></i>
                <div>
                  <h3>{analytics.totalAppointments}</h3>
                  <p>Total Appointments</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User Management Tab */}
        {activeTab === 'users' && (
          <UserManagement 
            users={users} 
            onUserAction={handleUserAction} 
            onDeleteUser={handleDeleteUser} 
          />
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="analytics-content">
            <h3>System Analytics</h3>
            <AdminAnalytics analytics={analytics} />
          </div>
        )}

        {/* Permissions Tab */}
        {activeTab === 'permissions' && (
          <PermissionsManager />
        )}

        {/* System Monitoring Tab */}
        {activeTab === 'monitoring' && (
          <SystemMonitoring />
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <ReportsGeneration />
        )}

        {/* Backup Tab */}
        {activeTab === 'backup' && (
          <BackupRestore />
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="settings-content">
            <h3>System Settings</h3>
            <div className="settings-form">
              <div className="setting-item">
                <label>Platform Name</label>
                <input type="text" defaultValue="MediHub Rwanda" />
              </div>
              <div className="setting-item">
                <label>Max Appointments per Day</label>
                <input type="number" defaultValue="50" />
              </div>
              <div className="setting-item">
                <label>Enable Notifications</label>
                <input type="checkbox" defaultChecked />
              </div>
              <button className="save-btn">Save Settings</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardContent;