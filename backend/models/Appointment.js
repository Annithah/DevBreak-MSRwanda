const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    symptoms: String,
    status: { 
        type: String, 
        enum: ['pending', 'approved', 'rejected', 'completed', 'cancelled'], 
        default: 'pending' 
    },
    notes: String,
    prescription: String,
    appointmentType: {
        type: String,
        enum: ['consultation', 'follow-up', 'emergency'],
        default: 'consultation'
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

appointmentSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Appointment', appointmentSchema);