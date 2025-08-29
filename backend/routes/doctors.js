const express = require('express');
const { auth, authorize } = require('../middleware/auth');
const Appointment = require('../models/Appointment');
const Prescription = require('../models/Prescription');
const User = require('../models/User');
const Medicine = require('../models/Medicine');
const geminiService = require('../services/geminiService');
const router = express.Router();

// Get doctor dashboard data
router.get('/dashboard', auth, authorize('doctor'), async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const appointments = await Appointment.find({ doctor: req.user._id })
            .populate('patient', 'name phone email age gender')
            .sort({ date: -1 })
            .limit(20);

        const todayAppointments = await Appointment.find({
            doctor: req.user._id,
            date: { $gte: today, $lt: tomorrow }
        }).populate('patient', 'name phone');

        const pendingAppointments = await Appointment.find({
            doctor: req.user._id,
            status: 'pending'
        }).populate('patient', 'name phone');

        const totalPatients = await Appointment.distinct('patient', { doctor: req.user._id });

        res.json({
            appointments,
            todayAppointments,
            pendingAppointments,
            totalPatients: totalPatients.length,
            todayCount: todayAppointments.length,
            pendingCount: pendingAppointments.length
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Approve/Reject appointment
router.patch('/appointments/:id/status', auth, authorize('doctor'), async (req, res) => {
    try {
        const { status, notes } = req.body;
        
        const appointment = await Appointment.findOne({
            _id: req.params.id,
            doctor: req.user._id
        });

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        appointment.status = status;
        if (notes) appointment.notes = notes;
        await appointment.save();

        await appointment.populate('patient', 'name phone email');

        res.json({
            message: `Appointment ${status} successfully`,
            appointment
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get patient details
router.get('/patients/:id', auth, authorize('doctor'), async (req, res) => {
    try {
        const patient = await User.findById(req.params.id).select('-password');
        
        if (!patient || patient.role !== 'patient') {
            return res.status(404).json({ message: 'Patient not found' });
        }

        const appointments = await Appointment.find({
            patient: req.params.id,
            doctor: req.user._id
        }).sort({ date: -1 });

        const prescriptions = await Prescription.find({
            patient: req.params.id,
            doctor: req.user._id
        }).sort({ createdAt: -1 });

        res.json({
            patient,
            appointments,
            prescriptions,
            medicalHistory: appointments.filter(apt => apt.notes || apt.prescription)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create prescription
router.post('/prescriptions', auth, authorize('doctor'), async (req, res) => {
    try {
        const { patientId, appointmentId, medicines, notes } = req.body;

        const prescription = new Prescription({
            patient: patientId,
            doctor: req.user._id,
            appointment: appointmentId,
            medicines,
            notes
        });

        await prescription.save();
        await prescription.populate(['patient', 'doctor'], 'name');

        // Update appointment with prescription
        if (appointmentId) {
            await Appointment.findByIdAndUpdate(appointmentId, {
                prescription: prescription._id,
                status: 'completed'
            });
        }

        res.status(201).json({
            message: 'Prescription created successfully',
            prescription
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get AI diagnosis assistance
router.post('/ai-diagnosis', auth, authorize('doctor'), async (req, res) => {
    try {
        const { symptoms, patientHistory, patientAge, patientGender } = req.body;

        const context = `
            Patient Details:
            - Age: ${patientAge || 'Not specified'}
            - Gender: ${patientGender || 'Not specified'}
            - Medical History: ${patientHistory || 'None provided'}
            - Current Symptoms: ${symptoms}
        `;

        const response = await geminiService.getMedicalAdvice(symptoms, context);

        res.json({
            diagnosis: response,
            timestamp: new Date(),
            disclaimer: 'This is AI-generated assistance. Always use your professional judgment.'
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'AI diagnosis service unavailable',
            diagnosis: 'AI service temporarily unavailable. Please rely on your clinical expertise.'
        });
    }
});

// Update appointment notes
router.patch('/appointments/:id/notes', auth, authorize('doctor'), async (req, res) => {
    try {
        const { notes, prescription } = req.body;
        
        const appointment = await Appointment.findOne({
            _id: req.params.id,
            doctor: req.user._id
        });

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        appointment.notes = notes;
        if (prescription) appointment.prescription = prescription;
        appointment.status = 'completed';
        
        await appointment.save();
        await appointment.populate('patient', 'name');

        res.json({
            message: 'Appointment updated successfully',
            appointment
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get doctor's schedule
router.get('/schedule', auth, authorize('doctor'), async (req, res) => {
    try {
        const { date } = req.query;
        let query = { doctor: req.user._id };

        if (date) {
            const startDate = new Date(date);
            const endDate = new Date(date);
            endDate.setDate(endDate.getDate() + 1);
            query.date = { $gte: startDate, $lt: endDate };
        }

        const appointments = await Appointment.find(query)
            .populate('patient', 'name phone')
            .sort({ date: 1, time: 1 });

        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;