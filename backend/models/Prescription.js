const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    pharmacy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
    medicines: [{
        medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' },
        name: String,
        dosage: String,
        frequency: String,
        duration: String,
        instructions: String
    }],
    status: { 
        type: String, 
        enum: ['pending', 'dispensed', 'completed', 'cancelled'], 
        default: 'pending' 
    },
    notes: String,
    totalAmount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    dispensedAt: Date
});

module.exports = mongoose.model('Prescription', prescriptionSchema);