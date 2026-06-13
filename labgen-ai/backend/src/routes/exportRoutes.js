const express = require('express');
const router = express.Router();
const { exportManual } = require('../controllers/exportController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:id', protect, exportManual);

module.exports = router;
