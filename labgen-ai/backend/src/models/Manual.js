const mongoose = require('mongoose');

const manualSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    templateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Template', required: true },
    title: { type: String, required: true },
    generatedContent: { type: Object, required: true },
    finalDocument: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Manual', manualSchema);
