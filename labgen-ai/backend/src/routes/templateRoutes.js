const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect } = require('../middleware/authMiddleware');
const {
    getTemplates,
    getTemplateById,
    createTemplate,
    uploadDocument,
    editTemplate,
    publishTemplate
} = require('../controllers/templateController');

// Multer storage setup for generic document uploads
const upload = multer({ dest: 'uploads/' });

// Core template CRUD routes
router.route('/')
    .get(protect, getTemplates)
    .post(protect, createTemplate);

// Document physical upload route
router.post('/upload', protect, upload.single('document'), uploadDocument);

// Single Template interactions
router.route('/:id')
    .get(protect, getTemplateById)
    .put(protect, editTemplate);

// Specialized publish route
router.put('/:id/publish', protect, publishTemplate);

module.exports = router;
