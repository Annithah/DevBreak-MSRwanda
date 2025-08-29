const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['patient', 'doctor', 'pharmacy', 'admin'], 
        required: true 
    },
    phone: String,
    age: Number,
    gender: String,
    address: String,
    specialization: String, // for doctors
    licenseNumber: String, // for doctors/pharmacies
    isVerified: { type: Boolean, default: false },
    profileImage: String,
    createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);