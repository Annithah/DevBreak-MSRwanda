import React from 'react';
import { usePharmacy } from '../context/PharmacyContext';

const PrescriptionFulfillment = () => {
  const { prescriptions, fulfillPrescription } = usePharmacy();

  const pendingPrescriptions = prescriptions.filter(p => p.status === 'pending');

  return (
    <div className="prescription-fulfillment">
      <h2>Prescription Fulfillment</h2>
      <div className="prescriptions-list">
        {pendingPrescriptions.map(prescription => (
          <div key={prescription._id} className="prescription-card">
            <div className="prescription-header">
              <h3>Prescription #{prescription._id.slice(-6)}</h3>
              <span className="patient-name">Patient: {prescription.patientName}</span>
            </div>
            <div className="prescription-details">
              <div className="medicines">
                <h4>Medicines:</h4>
                {prescription.medicines.map((med, index) => (
                  <div key={index} className="medicine-item">
                    <span>{med.name} - {med.dosage}</span>
                    <span>Qty: {med.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="prescription-notes">
                <strong>Instructions:</strong> {prescription.instructions}
              </div>
            </div>
            <div className="prescription-actions">
              <button 
                className="fulfill-btn"
                onClick={() => fulfillPrescription(prescription._id)}
              >
                Fulfill Prescription
              </button>
            </div>
          </div>
        ))}
        {pendingPrescriptions.length === 0 && (
          <p className="no-prescriptions">No pending prescriptions</p>
        )}
      </div>
    </div>
  );
};

export default PrescriptionFulfillment;