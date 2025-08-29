const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { auth } = require('../middleware/auth');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role, phone, age, gender, specialization, licenseNumber } = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const userData = { name, email, password, role, phone, age, gender };
        if (role === 'doctor') {
            userData.specialization = specialization;
            userData.licenseNumber = licenseNumber;
        }
        if (role === 'pharmacy') {
            userData.licenseNumber = licenseNumber;
        }

        const user = new User(userData);
        await user.save();

        const token = jwt.sign(
            { userId: user._id, role: user.role }, 
            process.env.JWT_SECRET || 'medihub-secret-key-2024',
            { expiresIn: '7d' }
        );

        res.status(201).json({
            message: 'User created successfully',
            token,
            user: { 
                id: user._id, 
                name: user.name, 
                email: user.email, 
                role: user.role,
                specialization: user.specialization 
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role }, 
            process.env.JWT_SECRET || 'medihub-secret-key-2024',
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: { 
                id: user._id, 
                name: user.name, 
                email: user.email, 
                role: user.role,
                specialization: user.specialization 
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get current user
router.get('/me', auth, async (req, res) => {
    res.json({
        user: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role,
            phone: req.user.phone,
            specialization: req.user.specialization
        }
    });
});

module.exports = router;