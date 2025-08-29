import React, { useState } from 'react';
import axios from 'axios';

const AIDiagnosisAssistant = () => {
    const [patientData, setPatientData] = useState({
        age: '',
        gender: '',
        symptoms: '',
        medicalHistory: ''
    });
    const [diagnosis, setDiagnosis] = useState('');
    const [loading, setLoading] = useState(false);
    const [diagnosisHistory, setDiagnosisHistory] = useState([]);

    const handleInputChange = (e) => {
        setPatientData({
            ...patientData,
            [e.target.name]: e.target.value
        });
    };

    const getDiagnosis = async (e) => {
        e.preventDefault();
        if (!patientData.symptoms.trim()) {
            alert('Please enter symptoms');
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('/api/doctors/ai-diagnosis', {
                symptoms: patientData.symptoms,
                patientHistory: patientData.medicalHistory,
                patientAge: patientData.age,
                patientGender: patientData.gender
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setDiagnosis(response.data.diagnosis);
            
            // Add to history
            const newDiagnosis = {
                id: Date.now(),
                ...patientData,
                diagnosis: response.data.diagnosis,
                timestamp: new Date()
            };
            setDiagnosisHistory(prev => [newDiagnosis, ...prev.slice(0, 4)]);

        } catch (error) {
            setDiagnosis('AI diagnosis service is currently unavailable. Please rely on your clinical expertise.');
        } finally {
            setLoading(false);
        }
    };

    const clearForm = () => {
        setPatientData({
            age: '',
            gender: '',
            symptoms: '',
            medicalHistory: ''
        });
        setDiagnosis('');
    };

    const commonSymptoms = [
        'Fever and chills',
        'Headache',
        'Cough and cold',
        'Abdominal pain',
        'Chest pain',
        'Shortness of breath',
        'Nausea and vomiting',
        'Fatigue and weakness',
        'Joint pain',
        'Skin rash'
    ];

    return (
        <div className="ai-diagnosis-assistant">
            <div className="assistant-header">
                <h3>
                    <i className="fas fa-robot"></i>
                    AI Diagnosis Assistant
                </h3>
                <p>Get AI-powered diagnostic assistance for your patients</p>
            </div>

            <div className="assistant-container">
                <div className="input-section">
                    <h4>Patient Information</h4>
                    <form onSubmit={getDiagnosis} className="diagnosis-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label>Patient Age</label>
                                <input
                                    type="number"
                                    name="age"
                                    value={patientData.age}
                                    onChange={handleInputChange}
                                    placeholder="Enter age"
                                    min="0"
                                    max="120"
                                />
                            </div>
                            <div className="form-group">
                                <label>Gender</label>
                                <select
                                    name="gender"
                                    value={patientData.gender}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Current Symptoms *</label>
                            <textarea
                                name="symptoms"
                                value={patientData.symptoms}
                                onChange={handleInputChange}
                                placeholder="Describe the patient's current symptoms in detail..."
                                rows="4"
                                required
                            />
                        </div>

                        <div className="common-symptoms">
                            <label>Common Symptoms (click to add):</label>
                            <div className="symptoms-grid">
                                {commonSymptoms.map((symptom, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        className="symptom-btn"
                                        onClick={() => {
                                            const currentSymptoms = patientData.symptoms;
                                            const newSymptoms = currentSymptoms 
                                                ? `${currentSymptoms}, ${symptom.toLowerCase()}`
                                                : symptom.toLowerCase();
                                            setPatientData({...patientData, symptoms: newSymptoms});
                                        }}
                                    >
                                        {symptom}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Medical History</label>
                            <textarea
                                name="medicalHistory"
                                value={patientData.medicalHistory}
                                onChange={handleInputChange}
                                placeholder="Enter relevant medical history, allergies, current medications..."
                                rows="3"
                            />
                        </div>

                        <div className="form-actions">
                            <button type="submit" disabled={loading} className="btn-diagnose">
                                {loading ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin"></i>
                                        Analyzing...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-search"></i>
                                        Get AI Diagnosis
                                    </>
                                )}
                            </button>
                            <button type="button" onClick={clearForm} className="btn-clear">
                                <i className="fas fa-eraser"></i>
                                Clear Form
                            </button>
                        </div>
                    </form>
                </div>

                <div className="results-section">
                    <h4>AI Analysis Results</h4>
                    {diagnosis ? (
                        <div className="diagnosis-result">
                            <div className="result-header">
                                <i className="fas fa-stethoscope"></i>
                                <span>AI Diagnostic Assistance</span>
                            </div>
                            <div className="result-content">
                                <pre>{diagnosis}</pre>
                            </div>
                            <div className="result-disclaimer">
                                <i className="fas fa-exclamation-triangle"></i>
                                This is AI-generated assistance. Always use your professional medical judgment and conduct proper examination.
                            </div>
                        </div>
                    ) : (
                        <div className="no-diagnosis">
                            <i className="fas fa-robot"></i>
                            <h5>Ready to Assist</h5>
                            <p>Enter patient symptoms to get AI-powered diagnostic assistance.</p>
                        </div>
                    )}
                </div>
            </div>

            {diagnosisHistory.length > 0 && (
                <div className="diagnosis-history">
                    <h4>Recent Diagnoses</h4>
                    <div className="history-list">
                        {diagnosisHistory.map(item => (
                            <div key={item.id} className="history-item">
                                <div className="history-header">
                                    <span className="patient-info">
                                        {item.age && `${item.age}y`} {item.gender && `${item.gender}`}
                                    </span>
                                    <span className="timestamp">
                                        {item.timestamp.toLocaleString()}
                                    </span>
                                </div>
                                <div className="history-symptoms">
                                    <strong>Symptoms:</strong> {item.symptoms}
                                </div>
                                <div className="history-diagnosis">
                                    <strong>AI Analysis:</strong> 
                                    <span className="diagnosis-preview">
                                        {item.diagnosis.substring(0, 100)}...
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIDiagnosisAssistant;