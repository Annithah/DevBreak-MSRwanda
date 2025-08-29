const express = require('express');
const { auth, authorize } = require('../middleware/auth');
const Appointment = require('../models/Appointment');
const Prescription = require('../models/Prescription');
const User = require('../models/User');
const Medicine = require('../models/Medicine');
const geminiService = require('../services/geminiService');
const router = express.Router();

// Get patient dashboard data
router.get('/dashboard', auth, authorize('patient'), async (req, res) => {
    try {
        const appointments = await Appointment.find({ patient: req.user._id })
            .populate('doctor', 'name specialization')
            .sort({ date: -1 })
            .limit(10);

        const prescriptions = await Prescription.find({ patient: req.user._id })
            .populate('doctor', 'name')
            .populate('pharmacy', 'name')
            .sort({ createdAt: -1 })
            .limit(5);

        res.json({
            appointments,
            prescriptions,
            upcomingAppointments: appointments.filter(apt => apt.status === 'approved' && new Date(apt.date) > new Date()).length,
            totalPrescriptions: prescriptions.length
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Book appointment
router.post('/appointments', auth, authorize('patient'), async (req, res) => {
    try {
        const { doctorId, date, time, symptoms, appointmentType } = req.body;

        const doctor = await User.findById(doctorId);
        if (!doctor || doctor.role !== 'doctor') {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        const appointment = new Appointment({
            patient: req.user._id,
            doctor: doctorId,
            date,
            time,
            symptoms,
            appointmentType: appointmentType || 'consultation'
        });

        await appointment.save();
        await appointment.populate('doctor', 'name specialization');

        res.status(201).json({
            message: 'Appointment booked successfully',
            appointment
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get available doctors
router.get('/doctors', auth, authorize('patient'), async (req, res) => {
    try {
        const { specialization, search } = req.query;
        let query = { role: 'doctor', isVerified: true };

        if (specialization) {
            query.specialization = new RegExp(specialization, 'i');
        }

        if (search) {
            query.$or = [
                { name: new RegExp(search, 'i') },
                { specialization: new RegExp(search, 'i') }
            ];
        }

        const doctors = await User.find(query)
            .select('name specialization phone address')
            .limit(20);

        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Chat with Gemini AI
router.post('/chat', auth, authorize('patient'), async (req, res) => {
    try {
        const { message, symptoms } = req.body;

        let response;
        if (symptoms) {
            response = await geminiService.getMedicalAdvice(symptoms, '');
        } else {
            response = await geminiService.chatWithPatient(message, '');
        }

        res.json({
            response,
            timestamp: new Date()
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Chat service temporarily unavailable',
            response: 'I apologize, but I cannot respond right now. Please try again later or contact a doctor directly.'
        });
    }
});

// Find nearby pharmacies
router.get('/pharmacies', auth, authorize('patient'), async (req, res) => {
    try {
        const { lat, lng, radius = 10 } = req.query;

        const pharmacies = await User.find({ 
            role: 'pharmacy', 
            isVerified: true 
        }).select('name phone address email');

        // In a real app, you'd use geospatial queries
        // For now, return all verified pharmacies
        res.json(pharmacies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Search medicines in pharmacies
router.get('/medicines/search', auth, authorize('patient'), async (req, res) => {
    try {
        const { name, pharmacy } = req.query;
        let query = {};

        if (name) {
            query.name = new RegExp(name, 'i');
        }

        if (pharmacy) {
            query.pharmacy = pharmacy;
        }

        const medicines = await Medicine.find(query)
            .populate('pharmacy', 'name phone address')
            .select('name price stock category requiresPrescription')
            .limit(50);

        res.json(medicines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;