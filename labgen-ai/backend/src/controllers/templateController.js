const Template = require('../models/Template');

// @desc    Get all templates for user
// @route   GET /api/templates
// @access  Private
const getTemplates = async (req, res) => {
    try {
        const templates = await Template.find({ userId: req.user._id }).sort({ updatedAt: -1 });
        res.json(templates);
    } catch (error) {
        res.status(500).json({ msg: error.message || 'Server error' });
    }
};

// @desc    Get single template
// @route   GET /api/templates/:id
// @access  Private
const getTemplateById = async (req, res) => {
    try {
        const template = await Template.findById(req.params.id);
        if (!template || template.userId.toString() !== req.user._id.toString()) {
            return res.status(404).json({ msg: 'Template not found' });
        }
        res.json(template);
    } catch (error) {
        res.status(500).json({ msg: error.message || 'Server error' });
    }
};

// @desc    Create a new template
// @route   POST /api/templates
// @access  Private
const createTemplate = async (req, res) => {
    const { templateName, description, templateHtml } = req.body;

    try {
        const template = new Template({
            userId: req.user._id,
            templateName: templateName || 'Untitled Template',
            description,
            templateHtml: templateHtml || '<p>New Template</p>',
            status: 'draft'
        });

        const savedTemplate = await template.save();
        res.status(201).json(savedTemplate);
    } catch (error) {
        res.status(500).json({ msg: error.message || 'Server error' });
    }
};

// @desc    Upload document to parse into template
// @route   POST /api/templates/upload
// @access  Private
const uploadDocument = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ msg: 'No file uploaded' });
        }

        // In a real app, parse Word/PDF to HTML here.
        // For now, we mock the parsing.
        const mockExtractedHtml = `<h1>Extracted from ${req.file.originalname}</h1><p>Mock document content...</p>`;

        res.status(200).json({
            msg: 'File uploaded and parsed',
            fileName: req.file.originalname,
            templateHtml: mockExtractedHtml
        });
    } catch (error) {
        res.status(500).json({ msg: error.message || 'Server error' });
    }
};

// @desc    Edit/Save template
// @route   PUT /api/templates/:id
// @access  Private
const editTemplate = async (req, res) => {
    const { templateName, description, templateHtml, status } = req.body;

    try {
        let template = await Template.findById(req.params.id);

        if (!template || template.userId.toString() !== req.user._id.toString()) {
            return res.status(404).json({ msg: 'Template not found' });
        }

        template.templateName = templateName || template.templateName;
        template.description = description !== undefined ? description : template.description;
        template.templateHtml = templateHtml || template.templateHtml;
        if (status) template.status = status;

        const updatedTemplate = await template.save();
        res.json(updatedTemplate);
    } catch (error) {
        res.status(500).json({ msg: error.message || 'Server error' });
    }
};

// @desc    Publish a template
// @route   PUT /api/templates/:id/publish
// @access  Private
const publishTemplate = async (req, res) => {
    try {
        let template = await Template.findById(req.params.id);

        if (!template || template.userId.toString() !== req.user._id.toString()) {
            return res.status(404).json({ msg: 'Template not found' });
        }

        template.status = 'published';
        const publishedTemplate = await template.save();

        res.json({ msg: 'Template published successfully', template: publishedTemplate });
    } catch (error) {
        res.status(500).json({ msg: error.message || 'Server error' });
    }
};

module.exports = {
    getTemplates,
    getTemplateById,
    createTemplate,
    uploadDocument,
    editTemplate,
    publishTemplate
};
