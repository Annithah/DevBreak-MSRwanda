import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentManagement = () => {
    const [appointments, setAppointments] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [notes, setNotes] = useState('');

    useEffect(() => {
        loadAppointments();
    }, [selectedDate, filterStatus]);

    const loadAppointments = async () => {
        try {
            const token = localStorage.getItem('token');
            let url = '/api/doctors/schedule';
            const params = new URLSearchParams();
            
            if (selectedDate) params.append('date', selectedDate);
            if (params.toString()) url += `?${params}`;

            const response = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}` }
            });

            let filteredAppointments = response.data;
            if (filterStatus !== 'all') {
                filteredAppointments = response.data.filter(apt => apt.status === filterStatus);
            }

            setAppointments(filteredAppointments);
        } catch (error) {
            console.error('Error loading appointments:', error);
        }
    };

    const handleStatusUpdate = async (appointmentId, status) => {
        try {
            const token = localStorage.getItem('token');
            await axios.patch(`/api/doctors/appointments/${appointmentId}/status`, {
                status
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert(`Appointment ${status} successfully`);
            loadAppointments();
        } catch (error) {
            alert('Failed to update appointment');
        }
    };

    const openAppointmentModal = (appointment) => {
        setSelectedAppointment(appointment);
        setNotes(appointment.notes || '');
        setShowModal(true);
    };

    const saveAppointmentNotes = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.patch(`/api/doctors/appointments/${selectedAppointment._id}/notes`, {
                notes
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert('Notes saved successfully');
            setShowModal(false);
            loadAppointments();
        } catch (error) {
            alert('Failed to save notes');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return '#ffc107';
            case 'approved': return '#28a745';
            case 'completed': return '#007bff';
            case 'rejected': return '#dc3545';
            case 'cancelled': return '#6c757d';
            default: return '#6c757d';
        }
    };

    return (
        <div className="appointment-management">
            <div className="management-header">
                <h3>Appointment Management</h3>
                <div className="filters">
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="date-filter"
                    />
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="status-filter"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="completed">Completed</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
            </div>

            <div className="appointments-grid">
                {appointments.map(appointment => (
                    <div key={appointment._id} className="appointment-card-detailed">
                        <div className="appointment-header">
                            <div className="patient-info">
                                <h4>{appointment.patient?.name}</h4>
                                <p>{appointment.patient?.phone}</p>
                            </div>
                            <div 
                                className="status-badge"
                                style={{ backgroundColor: getStatusColor(appointment.status) }}
                            >
                                {appointment.status}
                            </div>
                        </div>

                        <div className="appointment-details">
                            <div className="detail-item">
                                <i className="fas fa-calendar"></i>
                                <span>{new Date(appointment.date).toLocaleDateString()}</span>
                            </div>
                            <div className="detail-item">
                                <i className="fas fa-clock"></i>
                                <span>{appointment.time}</span>
                            </div>
                            <div className="detail-item">
                                <i className="fas fa-stethoscope"></i>
                                <span>{appointment.appointmentType}</span>
                            </div>
                        </div>

                        <div className="symptoms-section">
                            <h5>Symptoms:</h5>
                            <p>{appointment.symptoms}</p>
                        </div>

                        {appointment.notes && (
                            <div className="notes-section">
                                <h5>Notes:</h5>
                                <p>{appointment.notes}</p>
                            </div>
                        )}

                        <div className="appointment-actions">
                            {appointment.status === 'pending' && (
                                <>
                                    <button 
                                        className="btn-approve"
                                        onClick={() => handleStatusUpdate(appointment._id, 'approved')}
                                    >
                                        <i className="fas fa-check"></i> Approve
                                    </button>
                                    <button 
                                        className="btn-reject"
                                        onClick={() => handleStatusUpdate(appointment._id, 'rejected')}
                                    >
                                        <i className="fas fa-times"></i> Reject
                                    </button>
                                </>
                            )}
                            
                            {appointment.status === 'approved' && (
                                <button 
                                    className="btn-complete"
                                    onClick={() => openAppointmentModal(appointment)}
                                >
                                    <i className="fas fa-edit"></i> Add Notes & Complete
                                </button>
                            )}

                            <button 
                                className="btn-view"
                                onClick={() => openAppointmentModal(appointment)}
                            >
                                <i className="fas fa-eye"></i> View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {appointments.length === 0 && (
                <div className="no-appointments">
                    <i className="fas fa-calendar-times"></i>
                    <h4>No appointments found</h4>
                    <p>No appointments match your current filters.</p>
                </div>
            )}

            {/* Appointment Details Modal */}
            {showModal && selectedAppointment && (
                <div className="modal-overlay">
                    <div className="modal-content appointment-modal">
                        <div className="modal-header">
                            <h4>Appointment Details</h4>
                            <button 
                                className="close-btn"
                                onClick={() => setShowModal(false)}
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="patient-details">
                                <h5>Patient Information</h5>
                                <div className="info-grid">
                                    <div className="info-item">
                                        <label>Name:</label>
                                        <span>{selectedAppointment.patient?.name}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>Phone:</label>
                                        <span>{selectedAppointment.patient?.phone}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>Email:</label>
                                        <span>{selectedAppointment.patient?.email}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>Age:</label>
                                        <span>{selectedAppointment.patient?.age}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="appointment-info">
                                <h5>Appointment Information</h5>
                                <div className="info-grid">
                                    <div className="info-item">
                                        <label>Date:</label>
                                        <span>{new Date(selectedAppointment.date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>Time:</label>
                                        <span>{selectedAppointment.time}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>Type:</label>
                                        <span>{selectedAppointment.appointmentType}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>Status:</label>
                                        <span className={`status ${selectedAppointment.status}`}>
                                            {selectedAppointment.status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="symptoms-details">
                                <h5>Symptoms</h5>
                                <p>{selectedAppointment.symptoms}</p>
                            </div>

                            <div className="notes-section">
                                <h5>Doctor's Notes</h5>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Add your notes about this appointment..."
                                    rows="4"
                                    className="notes-textarea"
                                />
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button 
                                className="btn-secondary"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button 
                                className="btn-primary"
                                onClick={saveAppointmentNotes}
                            >
                                Save Notes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppointmentManagement;