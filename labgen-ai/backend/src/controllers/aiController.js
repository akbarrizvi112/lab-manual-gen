const fs = require('fs');
const { extractTextFromPdf } = require('../services/pdfService');
const { analyzeFormatFromText, generateManualFromFormat, generateLabManualText } = require('../services/geminiService');
const Manual = require('../models/Manual');
const Template = require('../models/Template');

// @desc    Step 1 – Upload sample PDF, extract format schema via Gemini
// @route   POST /api/ai/analyze-pdf
// @access  Private
const analyzePdf = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ msg: 'No PDF file uploaded.' });
        }

        const filePath = req.file.path;

        // Extract text from PDF
        const rawText = await extractTextFromPdf(filePath);

        // Let Gemini analyze the format
        const formatSchema = await analyzeFormatFromText(rawText);

        const template = await Template.create({
            userId: req.user._id,
            templateName: req.file.originalname.replace('.pdf', '') + ' Template',
            description: 'Format auto-extracted from uploaded PDF lab manual',
            templateHtml: '',
            formatSchema: formatSchema,
            sourceFile: req.file.originalname,
            status: 'published'
        });

        // Clean up the temp file
        fs.unlinkSync(filePath);

        res.status(200).json({
            msg: 'PDF analyzed successfully',
            templateId: template._id,
            templateName: template.templateName,
            formatSchema
        });
    } catch (error) {
        console.error('PDF Analysis Error:', error);
        if (req.file?.path && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        res.status(500).json({ msg: error.message || 'Failed to analyze PDF' });
    }
};

// @desc    Step 2 – Generate a new manual using a known format schema
// @route   POST /api/ai/generate
// @access  Private
const generateContent = async (req, res) => {
    const { title, topic, details, level, templateId, formatSchema } = req.body;

    if (!topic || !title) {
        return res.status(400).json({ msg: 'Title and Topic are required' });
    }

    try {
        let generatedJson;

        if (formatSchema && formatSchema.sections) {
            // Format-aware generation using the extracted schema
            generatedJson = await generateManualFromFormat(formatSchema, title, topic, details, level);
        } else {
            // Fallback: standard default structure generation
            generatedJson = await generateLabManualText(topic, details, level);
        }

        if (templateId) {
            const manual = await Manual.create({
                userId: req.user._id,
                templateId,
                title,
                generatedContent: generatedJson
            });
            return res.status(201).json({ msg: 'Generation successful', data: generatedJson, manualId: manual._id });
        }

        res.json({ msg: 'Generation successful', data: generatedJson });
    } catch (error) {
        console.error('Generate Error:', error);
        res.status(500).json({ msg: error.message || 'Error generating AI content' });
    }
};

module.exports = { analyzePdf, generateContent };
