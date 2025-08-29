import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentBooking = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [appointmentData, setAppointmentData] = useState({
        date: '',
        time: '',
        symptoms: '',
        appointmentType: 'consultation'
    });
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadDoctors();
    }, [searchTerm]);

    const loadDoctors = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`/api/patients/doctors?search=${searchTerm}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setDoctors(response.data);
        } catch (error) {
            console.error('Error loading doctors:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedDoctor) {
            alert('Please select a doctor');
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('/api/patients/appointments', {
                doctorId: selectedDoctor,
                ...appointmentData
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert('Appointment booked successfully! Waiting for doctor approval.');
            setAppointmentData({
                date: '',
                time: '',
                symptoms: '',
                appointmentType: 'consultation'
            });
            setSelectedDoctor('');
        } catch (error) {
            alert('Failed to book appointment: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    const timeSlots = [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
    ];

    return (
        <div className="appointment-booking">
            <h3>Book New Appointment</h3>
            
            <div className="booking-container">
                <div className="doctor-selection">
                    <h4>Select Doctor</h4>
                    <input
                        type="text"
                        placeholder="Search doctors by name or specialization..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    
                    <div className="doctors-grid">
                        {doctors.map(doctor => (
                            <div 
                                key={doctor._id} 
                                className={`doctor-card ${selectedDoctor === doctor._id ? 'selected' : ''}`}
                                onClick={() => setSelectedDoctor(doctor._id)}
                            >
                                <div className="doctor-avatar">
                                    <i className="fas fa-user-md"></i>
                                </div>
                                <div className="doctor-info">
                                    <h5>Dr. {doctor.name}</h5>
                                    <p>{doctor.specialization}</p>
                                    <small>{doctor.phone}</small>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="appointment-form">
                    <h4>Appointment Details</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Appointment Type</label>
                            <select
                                value={appointmentData.appointmentType}
                                onChange={(e) => setAppointmentData({...appointmentData, appointmentType: e.target.value})}
                                required
                            >
                                <option value="consultation">General Consultation</option>
                                <option value="follow-up">Follow-up</option>
                                <option value="emergency">Emergency</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Preferred Date</label>
                            <input
                                type="date"
                                value={appointmentData.date}
                                onChange={(e) => setAppointmentData({...appointmentData, date: e.target.value})}
                                min={new Date().toISOString().split('T')[0]}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Preferred Time</label>
                            <select
                                value={appointmentData.time}
                                onChange={(e) => setAppointmentData({...appointmentData, time: e.target.value})}
                                required
                            >
                                <option value="">Select time</option>
                                {timeSlots.map(time => (
                                    <option key={time} value={time}>{time}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Symptoms / Reason for Visit</label>
                            <textarea
                                value={appointmentData.symptoms}
                                onChange={(e) => setAppointmentData({...appointmentData, symptoms: e.target.value})}
                                placeholder="Describe your symptoms or reason for the appointment..."
                                rows="4"
                                required
                            />
                        </div>

                        <button type="submit" disabled={loading || !selectedDoctor} className="book-btn">
                            {loading ? 'Booking...' : 'Book Appointment'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AppointmentBooking;