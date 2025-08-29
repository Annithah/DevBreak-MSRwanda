import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PatientManagement = () => {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [patientDetails, setPatientDetails] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadPatients();
    }, []);

    const loadPatients = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/doctors/dashboard', {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Extract unique patients from appointments
            const uniquePatients = [];
            const patientIds = new Set();

            response.data.appointments?.forEach(appointment => {
                if (appointment.patient && !patientIds.has(appointment.patient._id)) {
                    patientIds.add(appointment.patient._id);
                    uniquePatients.push({
                        ...appointment.patient,
                        lastVisit: appointment.date,
                        totalAppointments: response.data.appointments.filter(
                            apt => apt.patient._id === appointment.patient._id
                        ).length
                    });
                }
            });

            setPatients(uniquePatients);
        } catch (error) {
            console.error('Error loading patients:', error);
        }
    };

    const loadPatientDetails = async (patientId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`/api/doctors/patients/${patientId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPatientDetails(response.data);
            setSelectedPatient(patientId);
            setShowModal(true);
        } catch (error) {
            console.error('Error loading patient details:', error);
            alert('Failed to load patient details');
        }
    };

    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="patient-management">
            <div className="management-header">
                <h3>My Patients</h3>
                <div className="search-section">
                    <div className="search-box">
                        <i className="fas fa-search"></i>
                        <input
                            type="text"
                            placeholder="Search patients by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="patients-grid">
                {filteredPatients.map(patient => (
                    <div key={patient._id} className="patient-card">
                        <div className="patient-avatar">
                            <img 
                                src={`https://randomuser.me/api/portraits/${patient.gender === 'female' ? 'women' : 'men'}/${Math.floor(Math.random() * 50)}.jpg`}
                                alt={patient.name}
                            />
                        </div>

                        <div className="patient-info">
                            <h4>{patient.name}</h4>
                            <div className="patient-details">
                                <div className="detail-item">
                                    <i className="fas fa-envelope"></i>
                                    <span>{patient.email}</span>
                                </div>
                                <div className="detail-item">
                                    <i className="fas fa-phone"></i>
                                    <span>{patient.phone}</span>
                                </div>
                                <div className="detail-item">
                                    <i className="fas fa-birthday-cake"></i>
                                    <span>{patient.age} years old</span>
                                </div>
                                <div className="detail-item">
                                    <i className="fas fa-venus-mars"></i>
                                    <span>{patient.gender}</span>
                                </div>
                            </div>
                        </div>

                        <div className="patient-stats">
                            <div className="stat-item">
                                <span className="stat-number">{patient.totalAppointments}</span>
                                <span className="stat-label">Appointments</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-date">
                                    {new Date(patient.lastVisit).toLocaleDateString()}
                                </span>
                                <span className="stat-label">Last Visit</span>
                            </div>
                        </div>

                        <div className="patient-actions">
                            <button 
                                className="btn-view-details"
                                onClick={() => loadPatientDetails(patient._id)}
                            >
                                <i className="fas fa-eye"></i>
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredPatients.length === 0 && (
                <div className="no-patients">
                    <i className="fas fa-user-friends"></i>
                    <h4>No patients found</h4>
                    <p>No patients match your search criteria.</p>
                </div>
            )}

            {/* Patient Details Modal */}
            {showModal && patientDetails && (
                <div className="modal-overlay">
                    <div className="modal-content patient-modal">
                        <div className="modal-header">
                            <h4>Patient Details - {patientDetails.patient.name}</h4>
                            <button 
                                className="close-btn"
                                onClick={() => setShowModal(false)}
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="patient-profile">
                                <div className="profile-avatar">
                                    <img 
                                        src={`https://randomuser.me/api/portraits/${patientDetails.patient.gender === 'female' ? 'women' : 'men'}/${Math.floor(Math.random() * 50)}.jpg`}
                                        alt={patientDetails.patient.name}
                                    />
                                </div>
                                <div className="profile-info">
                                    <h3>{patientDetails.patient.name}</h3>
                                    <div className="info-grid">
                                        <div className="info-item">
                                            <label>Email:</label>
                                            <span>{patientDetails.patient.email}</span>
                                        </div>
                                        <div className="info-item">
                                            <label>Phone:</label>
                                            <span>{patientDetails.patient.phone}</span>
                                        </div>
                                        <div className="info-item">
                                            <label>Age:</label>
                                            <span>{patientDetails.patient.age} years</span>
                                        </div>
                                        <div className="info-item">
                                            <label>Gender:</label>
                                            <span>{patientDetails.patient.gender}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="medical-history">
                                <h5>Medical History</h5>
                                <div className="history-list">
                                    {patientDetails.medicalHistory?.length > 0 ? (
                                        patientDetails.medicalHistory.map(record => (
                                            <div key={record._id} className="history-item">
                                                <div className="history-date">
                                                    {new Date(record.date).toLocaleDateString()}
                                                </div>
                                                <div className="history-content">
                                                    <h6>Symptoms:</h6>
                                                    <p>{record.symptoms}</p>
                                                    {record.notes && (
                                                        <>
                                                            <h6>Notes:</h6>
                                                            <p>{record.notes}</p>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="no-history">No medical history available</p>
                                    )}
                                </div>
                            </div>

                            <div className="appointments-history">
                                <h5>Appointment History</h5>
                                <div className="appointments-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Time</th>
                                                <th>Status</th>
                                                <th>Symptoms</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {patientDetails.appointments?.map(appointment => (
                                                <tr key={appointment._id}>
                                                    <td>{new Date(appointment.date).toLocaleDateString()}</td>
                                                    <td>{appointment.time}</td>
                                                    <td>
                                                        <span className={`status ${appointment.status}`}>
                                                            {appointment.status}
                                                        </span>
                                                    </td>
                                                    <td>{appointment.symptoms}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="prescriptions-history">
                                <h5>Prescription History</h5>
                                <div className="prescriptions-list">
                                    {patientDetails.prescriptions?.length > 0 ? (
                                        patientDetails.prescriptions.map(prescription => (
                                            <div key={prescription._id} className="prescription-item">
                                                <div className="prescription-date">
                                                    {new Date(prescription.createdAt).toLocaleDateString()}
                                                </div>
                                                <div className="prescription-medicines">
                                                    {prescription.medicines.map((med, index) => (
                                                        <div key={index} className="medicine-detail">
                                                            <span className="med-name">{med.name}</span>
                                                            <span className="med-dosage">{med.dosage}</span>
                                                            <span className="med-frequency">{med.frequency}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className={`prescription-status ${prescription.status}`}>
                                                    {prescription.status}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="no-prescriptions">No prescriptions available</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button 
                                className="btn-secondary"
                                onClick={() => setShowModal(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PatientManagement;