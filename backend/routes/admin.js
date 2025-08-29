const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Appointment = require('../models/Appointment');
const Prescription = require('../models/Prescription');
const { auth } = require('../middleware/auth');

// Get dashboard analytics
router.get('/analytics', auth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalDoctors = await User.countDocuments({ role: 'doctor' });
    const totalPatients = await User.countDocuments({ role: 'patient' });
    const totalAppointments = await Appointment.countDocuments();
    const pendingAppointments = await Appointment.countDocuments({ status: 'pending' });

    res.json({
      totalUsers,
      totalDoctors,
      totalPatients,
      totalAppointments,
      pendingAppointments
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all users
router.get('/users', auth, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user status
router.put('/users/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete user
router.delete('/users/:id', auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get system stats
router.get('/system-stats', auth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ status: 'active' });
    const totalAppointments = await Appointment.countDocuments();

    res.json({
      totalUsers,
      activeUsers,
      totalAppointments,
      systemUptime: '99.9%',
      serverLoad: '45%',
      databaseSize: '2.3GB'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Generate reports
router.post('/reports/generate', auth, async (req, res) => {
  try {
    const { type, startDate, endDate } = req.body;
    
    // Mock report generation - in real app, generate actual PDF
    const reportData = {
      type,
      startDate,
      endDate,
      generatedAt: new Date(),
      data: 'Mock report data'
    };

    res.json({ message: 'Report generated successfully', reportData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create backup
router.post('/backup/create', auth, async (req, res) => {
  try {
    // Mock backup creation - in real app, create actual backup
    const backup = {
      id: Date.now(),
      name: `System Backup - ${new Date().toLocaleDateString()}`,
      size: '45MB',
      createdAt: new Date()
    };

    res.json({ message: 'Backup created successfully', backup });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Restore backup
router.post('/backup/restore/:id', auth, async (req, res) => {
  try {
    // Mock backup restoration - in real app, restore from actual backup
    res.json({ message: 'Backup restored successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;