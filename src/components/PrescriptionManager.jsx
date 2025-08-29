import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PrescriptionManager = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [patients, setPatients] = useState([]);
    const [newPrescription, setNewPrescription] = useState({
        patientId: '',
        appointmentId: '',
        medicines: [{ name: '', dosage: '', frequency: '', duration: '', instructions: '' }],
        notes: ''
    });

    useEffect(() => {
        loadPrescriptions();
        loadPatients();
    }, []);

    const loadPrescriptions = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/doctors/dashboard', {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            // Extract prescriptions from appointments or create mock data
            const mockPrescriptions = [
                {
                    _id: '1',
                    patient: { name: 'Marie Uwase', phone: '+250 78X XXX XXX' },
                    medicines: [
                        { name: 'Paracetamol', dosage: '500mg', frequency: 'Twice daily', duration: '5 days' },
                        { name: 'Amoxicillin', dosage: '250mg', frequency: 'Three times daily', duration: '7 days' }
                    ],
                    status: 'pending',
                    createdAt: new Date(),
                    notes: 'Take with food'
                },
                {
                    _id: '2',
                    patient: { name: 'Thomas Manzi', phone: '+250 78X XXX XXY' },
                    medicines: [
                        { name: 'Ibuprofen', dosage: '400mg', frequency: 'As needed', duration: '3 days' }
                    ],
                    status: 'dispensed',
                    createdAt: new Date(Date.now() - 86400000),
                    notes: 'For pain relief'
                }
            ];
            setPrescriptions(mockPrescriptions);
        } catch (error) {
            console.error('Error loading prescriptions:', error);
        }
    };

    const loadPatients = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/doctors/dashboard', {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Extract unique patients
            const uniquePatients = [];
            const patientIds = new Set();

            response.data.appointments?.forEach(appointment => {
                if (appointment.patient && !patientIds.has(appointment.patient._id)) {
                    patientIds.add(appointment.patient._id);
                    uniquePatients.push(appointment.patient);
                }
            });

            setPatients(uniquePatients);
        } catch (error) {
            console.error('Error loading patients:', error);
        }
    };

    const addMedicine = () => {
        setNewPrescription({
            ...newPrescription,
            medicines: [...newPrescription.medicines, { name: '', dosage: '', frequency: '', duration: '', instructions: '' }]
        });
    };

    const removeMedicine = (index) => {
        const medicines = newPrescription.medicines.filter((_, i) => i !== index);
        setNewPrescription({ ...newPrescription, medicines });
    };

    const updateMedicine = (index, field, value) => {
        const medicines = [...newPrescription.medicines];
        medicines[index][field] = value;
        setNewPrescription({ ...newPrescription, medicines });
    };

    const createPrescription = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('/api/doctors/prescriptions', newPrescription, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert('Prescription created successfully');
            setShowCreateModal(false);
            setNewPrescription({
                patientId: '',
                appointmentId: '',
                medicines: [{ name: '', dosage: '', frequency: '', duration: '', instructions: '' }],
                notes: ''
            });
            loadPrescriptions();
        } catch (error) {
            alert('Failed to create prescription');
        }
    };

    const commonMedicines = [
        'Paracetamol', 'Ibuprofen', 'Amoxicillin', 'Aspirin', 'Metformin',
        'Lisinopril', 'Omeprazole', 'Simvastatin', 'Amlodipine', 'Ciprofloxacin'
    ];

    return (
        <div className="prescription-manager">
            <div className="manager-header">
                <h3>Prescription Management</h3>
                <button 
                    className="btn-create"
                    onClick={() => setShowCreateModal(true)}
                >
                    <i className="fas fa-plus"></i>
                    Create New Prescription
                </button>
            </div>

            <div className="prescriptions-grid">
                {prescriptions.map(prescription => (
                    <div key={prescription._id} className="prescription-card">
                        <div className="prescription-header">
                            <div className="patient-info">
                                <h4>{prescription.patient.name}</h4>
                                <p>{prescription.patient.phone}</p>
                            </div>
                            <div className={`status-badge ${prescription.status}`}>
                                {prescription.status}
                            </div>
                        </div>

                        <div className="medicines-list">
                            <h5>Prescribed Medicines:</h5>
                            {prescription.medicines.map((medicine, index) => (
                                <div key={index} className="medicine-item">
                                    <div className="medicine-name">{medicine.name}</div>
                                    <div className="medicine-details">
                                        <span className="dosage">{medicine.dosage}</span>
                                        <span className="frequency">{medicine.frequency}</span>
                                        <span className="duration">{medicine.duration}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {prescription.notes && (
                            <div className="prescription-notes">
                                <h5>Notes:</h5>
                                <p>{prescription.notes}</p>
                            </div>
                        )}

                        <div className="prescription-footer">
                            <span className="created-date">
                                Created: {new Date(prescription.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {prescriptions.length === 0 && (
                <div className="no-prescriptions">
                    <i className="fas fa-prescription-bottle"></i>
                    <h4>No prescriptions found</h4>
                    <p>You haven't created any prescriptions yet.</p>
                </div>
            )}

            {/* Create Prescription Modal */}
            {showCreateModal && (
                <div className="modal-overlay">
                    <div className="modal-content prescription-modal">
                        <div className="modal-header">
                            <h4>Create New Prescription</h4>
                            <button 
                                className="close-btn"
                                onClick={() => setShowCreateModal(false)}
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        <form onSubmit={createPrescription} className="modal-body">
                            <div className="form-group">
                                <label>Select Patient *</label>
                                <select
                                    value={newPrescription.patientId}
                                    onChange={(e) => setNewPrescription({...newPrescription, patientId: e.target.value})}
                                    required
                                >
                                    <option value="">Choose a patient</option>
                                    {patients.map(patient => (
                                        <option key={patient._id} value={patient._id}>
                                            {patient.name} - {patient.phone}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="medicines-section">
                                <div className="section-header">
                                    <h5>Medicines</h5>
                                    <button type="button" onClick={addMedicine} className="btn-add-medicine">
                                        <i className="fas fa-plus"></i> Add Medicine
                                    </button>
                                </div>

                                {newPrescription.medicines.map((medicine, index) => (
                                    <div key={index} className="medicine-form">
                                        <div className="medicine-header">
                                            <h6>Medicine {index + 1}</h6>
                                            {newPrescription.medicines.length > 1 && (
                                                <button 
                                                    type="button"
                                                    onClick={() => removeMedicine(index)}
                                                    className="btn-remove"
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            )}
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Medicine Name *</label>
                                                <input
                                                    type="text"
                                                    value={medicine.name}
                                                    onChange={(e) => updateMedicine(index, 'name', e.target.value)}
                                                    placeholder="Enter medicine name"
                                                    list={`medicines-${index}`}
                                                    required
                                                />
                                                <datalist id={`medicines-${index}`}>
                                                    {commonMedicines.map(med => (
                                                        <option key={med} value={med} />
                                                    ))}
                                                </datalist>
                                            </div>
                                            <div className="form-group">
                                                <label>Dosage *</label>
                                                <input
                                                    type="text"
                                                    value={medicine.dosage}
                                                    onChange={(e) => updateMedicine(index, 'dosage', e.target.value)}
                                                    placeholder="e.g., 500mg"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Frequency *</label>
                                                <select
                                                    value={medicine.frequency}
                                                    onChange={(e) => updateMedicine(index, 'frequency', e.target.value)}
                                                    required
                                                >
                                                    <option value="">Select frequency</option>
                                                    <option value="Once daily">Once daily</option>
                                                    <option value="Twice daily">Twice daily</option>
                                                    <option value="Three times daily">Three times daily</option>
                                                    <option value="Four times daily">Four times daily</option>
                                                    <option value="As needed">As needed</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Duration *</label>
                                                <input
                                                    type="text"
                                                    value={medicine.duration}
                                                    onChange={(e) => updateMedicine(index, 'duration', e.target.value)}
                                                    placeholder="e.g., 7 days"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label>Instructions</label>
                                            <input
                                                type="text"
                                                value={medicine.instructions}
                                                onChange={(e) => updateMedicine(index, 'instructions', e.target.value)}
                                                placeholder="e.g., Take with food"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="form-group">
                                <label>Additional Notes</label>
                                <textarea
                                    value={newPrescription.notes}
                                    onChange={(e) => setNewPrescription({...newPrescription, notes: e.target.value})}
                                    placeholder="Any additional instructions or notes..."
                                    rows="3"
                                />
                            </div>

                            <div className="modal-footer">
                                <button 
                                    type="button"
                                    className="btn-secondary"
                                    onClick={() => setShowCreateModal(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary">
                                    Create Prescription
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PrescriptionManager;