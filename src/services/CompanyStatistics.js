// models/CompanyStatistics.js
const mongoose = require('mongoose');

const companyStatisticsSchema = new mongoose.Schema({
    yearsExperience: {
        type: Number,
        default: 0,
        min: 0
    },
    projectsCompleted: {
        type: Number,
        default: 0,
        min: 0
    },
    happyClients: {
        type: Number,
        default: 0,
        min: 0
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('CompanyStatistics', companyStatisticsSchema);

// routes/companyStatistics.js
const express = require('express');
const router = express.Router();
const CompanyStatistics = require('../models/CompanyStatistics');

// GET company statistics
router.get('/', async (req, res) => {
    try {
        let stats = await CompanyStatistics.findOne();
        if (!stats) {
            // Create default if none exists
            stats = await CompanyStatistics.create({
                yearsExperience: 0,
                projectsCompleted: 0,
                happyClients: 0
            });
        }
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT update company statistics
router.put('/', async (req, res) => {
    try {
        const { yearsExperience, projectsCompleted, happyClients } = req.body;

        let stats = await CompanyStatistics.findOne();
        if (!stats) {
            stats = new CompanyStatistics();
        }

        stats.yearsExperience = yearsExperience || 0;
        stats.projectsCompleted = projectsCompleted || 0;
        stats.happyClients = happyClients || 0;
        stats.updatedAt = Date.now();

        await stats.save();
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

// In your main app file
app.use('/api/company-statistics', require('./routes/companyStatistics'));