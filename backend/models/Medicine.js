const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    pharmacy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: {
        type: String,
        enum: ['antibiotics', 'painkillers', 'vitamins', 'chronic', 'emergency', 'other'],
        default: 'other'
    },
    manufacturer: String,
    expiryDate: Date,
    requiresPrescription: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Medicine', medicineSchema);