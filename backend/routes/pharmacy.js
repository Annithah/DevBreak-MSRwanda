const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine');
const Prescription = require('../models/Prescription');
const { auth } = require('../middleware/auth');

// Get inventory
router.get('/inventory', auth, async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update medicine stock
router.put('/inventory/:id', auth, async (req, res) => {
  try {
    const { quantity } = req.body;
    const medicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true }
    );
    res.json(medicine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get prescriptions
router.get('/prescriptions', auth, async (req, res) => {
  try {
    const prescriptions = await Prescription.find()
      .populate('patientId', 'name')
      .populate('doctorId', 'name');
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fulfill prescription
router.put('/prescriptions/:id/fulfill', auth, async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      { status: 'fulfilled', fulfilledAt: new Date() },
      { new: true }
    );
    res.json(prescription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create order
router.post('/orders', auth, async (req, res) => {
  try {
    const { supplier, medicines, totalAmount } = req.body;
    // Mock order creation - in real app, integrate with supplier system
    const order = {
      _id: Date.now().toString(),
      supplier,
      medicines,
      totalAmount,
      status: 'pending',
      createdAt: new Date()
    };
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;