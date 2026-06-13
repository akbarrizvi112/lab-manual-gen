const express = require('express');
const router = express.Router();
const { getManuals, createManual } = require('../controllers/manualController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getManuals).post(protect, createManual);

module.exports = router;
