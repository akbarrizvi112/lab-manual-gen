const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect } = require('../middleware/authMiddleware');
const { analyzePdf, generateContent } = require('../controllers/aiController');

// Multer: store uploaded PDFs in /uploads temporarily
const upload = multer({
    dest: 'uploads/',
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed'), false);
        }
    }
});

// Step 1: Analyze uploaded PDF format
router.post('/analyze-pdf', protect, upload.single('pdf'), analyzePdf);

// Step 2: Generate new manual using format schema and topic
router.post('/generate', protect, generateContent);

module.exports = router;
