import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { usePatient } from '../context/PatientContext';
import AppointmentBooking from './AppointmentBooking';
import AIChat from './AIChat';
import PharmacyLocator from './PharmacyLocator';

const PatientDashboardContent = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [dashboardData, setDashboardData] = useState({});
    const [loading, setLoading] = useState(true);
    const { patient } = usePatient();

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/patients/dashboard', {
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
        <div className="patient-dashboard">
            {/* Sidebar */}
            <div className="sidebar">
                <div className="logo">
                    <i className="fas fa-user-injured fa-2x"></i>
                    <h1>Patient Portal</h1>
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
                <div className={`menu-item ${activeTab === 'chat' ? 'active' : ''}`}
                     onClick={() => setActiveTab('chat')}>
                    <i className="fas fa-comments"></i>
                    <span>AI Assistant</span>
                </div>
                <div className={`menu-item ${activeTab === 'pharmacy' ? 'active' : ''}`}
                     onClick={() => setActiveTab('pharmacy')}>
                    <i className="fas fa-pills"></i>
                    <span>Find Pharmacy</span>
                </div>
                <div className={`menu-item ${activeTab === 'prescriptions' ? 'active' : ''}`}
                     onClick={() => setActiveTab('prescriptions')}>
                    <i className="fas fa-prescription-bottle"></i>
                    <span>Prescriptions</span>
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
                    <h2>Welcome back, {patient.name || 'Patient'}</h2>
                    <div className="patient-profile">
                        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Patient" />
                        <span>{patient.name}</span>
                    </div>
                </div>

                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="overview-content">
                        <div className="stats-grid">
                            <div className="stat-card">
                                <i className="fas fa-calendar-check"></i>
                                <div>
                                    <h3>{dashboardData.upcomingAppointments || 0}</h3>
                                    <p>Upcoming Appointments</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <i className="fas fa-prescription-bottle"></i>
                                <div>
                                    <h3>{dashboardData.totalPrescriptions || 0}</h3>
                                    <p>Active Prescriptions</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <i className="fas fa-user-md"></i>
                                <div>
                                    <h3>{dashboardData.appointments?.length || 0}</h3>
                                    <p>Total Consultations</p>
                                </div>
                            </div>
                        </div>

                        <div className="recent-activities">
                            <h3>Recent Appointments</h3>
                            <div className="appointments-list">
                                {dashboardData.appointments?.slice(0, 3).map(appointment => (
                                    <div key={appointment._id} className="appointment-card">
                                        <div className="appointment-info">
                                            <h4>Dr. {appointment.doctor?.name}</h4>
                                            <p>{appointment.doctor?.specialization}</p>
                                            <span className="date">{new Date(appointment.date).toLocaleDateString()}</span>
                                        </div>
                                        <div className={`status ${appointment.status}`}>
                                            {appointment.status}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Appointments Tab */}
                {activeTab === 'appointments' && (
                    <AppointmentBooking />
                )}

                {/* AI Chat Tab */}
                {activeTab === 'chat' && (
                    <AIChat />
                )}

                {/* Pharmacy Tab */}
                {activeTab === 'pharmacy' && (
                    <PharmacyLocator />
                )}

                {/* Prescriptions Tab */}
                {activeTab === 'prescriptions' && (
                    <div className="prescriptions-content">
                        <h3>Your Prescriptions</h3>
                        <div className="prescriptions-list">
                            {dashboardData.prescriptions?.map(prescription => (
                                <div key={prescription._id} className="prescription-card">
                                    <div className="prescription-header">
                                        <h4>Dr. {prescription.doctor?.name}</h4>
                                        <span className={`status ${prescription.status}`}>
                                            {prescription.status}
                                        </span>
                                    </div>
                                    <div className="medicines-list">
                                        {prescription.medicines.map((med, index) => (
                                            <div key={index} className="medicine-item">
                                                <span className="med-name">{med.name}</span>
                                                <span className="med-dosage">{med.dosage}</span>
                                                <span className="med-frequency">{med.frequency}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="prescription-date">
                                        {new Date(prescription.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientDashboardContent;