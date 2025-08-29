import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DoctorProvider, DoctorContext } from '../context/DoctorContext';
import AppointmentManagement from './AppointmentManagement';
import PatientManagement from './PatientManagement';
import AIDiagnosisAssistant from './AIDiagnosisAssistant';
import PrescriptionManager from './PrescriptionManager';

const DoctorDashboardContent = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [dashboardData, setDashboardData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/doctors/dashboard', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setDashboardData(response.data);
        } catch (error) {
            console.error('Error loading dashboard:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">Loading your dashboard...</div>;
    }

    return (
        <div className="doctor-dashboard">
            {/* Sidebar */}
            <div className="sidebar">
                <div className="logo">
                    <i className="fas fa-user-md fa-2x"></i>
                    <h1>Doctor Portal</h1>
                </div>
                
                <div className={`menu-item ${activeTab === 'overview' ? 'active' : ''}`} 
                     onClick={() => setActiveTab('overview')}>
                    <i className="fas fa-tachometer-alt"></i>
                    <span>Overview</span>
                </div>
                <div className={`menu-item ${activeTab === 'appointments' ? 'active' : ''}`}
                     onClick={() => setActiveTab('appointments')}>
                    <i className="fas fa-calendar-check"></i>
                    <span>Appointments</span>
                </div>
                <div className={`menu-item ${activeTab === 'patients' ? 'active' : ''}`}
                     onClick={() => setActiveTab('patients')}>
                    <i className="fas fa-users"></i>
                    <span>My Patients</span>
                </div>
                <div className={`menu-item ${activeTab === 'prescriptions' ? 'active' : ''}`}
                     onClick={() => setActiveTab('prescriptions')}>
                    <i className="fas fa-prescription-bottle"></i>
                    <span>Prescriptions</span>
                </div>
                <div className={`menu-item ${activeTab === 'ai-assistant' ? 'active' : ''}`}
                     onClick={() => setActiveTab('ai-assistant')}>
                    <i className="fas fa-robot"></i>
                    <span>AI Assistant</span>
                </div>
                
                <div className="menu-item logout" onClick={() => {
                    localStorage.removeItem('token');
                    window.location.href = '/';
                }}>
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Logout</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
                <div className="header">
                    <h2>Doctor Dashboard</h2>
                    <div className="doctor-profile">
                        <img src="https://randomuser.me/api/portraits/men/85.jpg" alt="Doctor" />
                        <span>Dr. {JSON.parse(localStorage.getItem('user') || '{}').name}</span>
                    </div>
                </div>

                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="overview-content">
                        <div className="stats-grid">
                            <div className="stat-card">
                                <i className="fas fa-calendar-day"></i>
                                <div>
                                    <h3>{dashboardData.todayCount || 0}</h3>
                                    <p>Today's Appointments</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <i className="fas fa-clock"></i>
                                <div>
                                    <h3>{dashboardData.pendingCount || 0}</h3>
                                    <p>Pending Approvals</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <i className="fas fa-users"></i>
                                <div>
                                    <h3>{dashboardData.totalPatients || 0}</h3>
                                    <p>Total Patients</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <i className="fas fa-calendar-check"></i>
                                <div>
                                    <h3>{dashboardData.appointments?.length || 0}</h3>
                                    <p>Total Appointments</p>
                                </div>
                            </div>
                        </div>

                        <div className="today-schedule">
                            <h3>Today's Schedule</h3>
                            <div className="appointments-list">
                                {dashboardData.todayAppointments?.map(appointment => (
                                    <div key={appointment._id} className="appointment-card">
                                        <div className="appointment-time">
                                            {appointment.time}
                                        </div>
                                        <div className="appointment-info">
                                            <h4>{appointment.patient?.name}</h4>
                                            <p>{appointment.symptoms}</p>
                                        </div>
                                        <div className={`status ${appointment.status}`}>
                                            {appointment.status}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pending-approvals">
                            <h3>Pending Approvals</h3>
                            <div className="approvals-list">
                                {dashboardData.pendingAppointments?.slice(0, 5).map(appointment => (
                                    <div key={appointment._id} className="approval-card">
                                        <div className="patient-info">
                                            <h5>{appointment.patient?.name}</h5>
                                            <p>{appointment.symptoms}</p>
                                            <small>{new Date(appointment.date).toLocaleDateString()} at {appointment.time}</small>
                                        </div>
                                        <div className="approval-actions">
                                            <button 
                                                className="btn-approve"
                                                onClick={() => handleAppointmentAction(appointment._id, 'approved')}
                                            >
                                                Approve
                                            </button>
                                            <button 
                                                className="btn-reject"
                                                onClick={() => handleAppointmentAction(appointment._id, 'rejected')}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Appointments Tab */}
                {activeTab === 'appointments' && (
                    <AppointmentManagement />
                )}

                {/* Patients Tab */}
                {activeTab === 'patients' && (
                    <PatientManagement />
                )}

                {/* AI Assistant Tab */}
                {activeTab === 'ai-assistant' && (
                    <AIDiagnosisAssistant />
                )}

                {/* Prescriptions Tab */}
                {activeTab === 'prescriptions' && (
                    <PrescriptionManager />
                )}
            </div>
        </div>
    );

    async function handleAppointmentAction(appointmentId, status) {
        try {
            const token = localStorage.getItem('token');
            await axios.patch(`/api/doctors/appointments/${appointmentId}/status`, {
                status
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            alert(`Appointment ${status} successfully`);
            loadDashboardData(); // Refresh data
        } catch (error) {
            alert('Failed to update appointment');
        }
    }
};

export default DoctorDashboardContent;