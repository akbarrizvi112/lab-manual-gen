const Manual = require('../models/Manual');

const getManuals = async (req, res) => {
    res.json({ message: 'Get manuals - placeholder' });
};

const createManual = async (req, res) => {
    res.json({ message: 'Create manual - placeholder' });
};

module.exports = { getManuals, createManual };
