const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    templateName: { type: String, required: true },
    description: { type: String, default: '' },
    templateHtml: { type: String, default: '' },
    formatSchema: { type: Object, default: null },
    sourceFile: { type: String, default: '' },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
}, { timestamps: true });

module.exports = mongoose.model('Template', templateSchema);
