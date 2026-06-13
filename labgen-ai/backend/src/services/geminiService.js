const genAI = require('../config/gemini');


const analyzeFormatFromText = async (pdfText) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = `You are an expert academic document analyst.
Below is raw text extracted from a sample lab manual PDF document:
---
${pdfText.slice(0, 8000)}
---

Analyze this document and extract its structural format/template. Return ONLY a valid JSON object describing the document's format. Example structure:
{
  "sections": [
    { "key": "objective", "label": "Experiment Objective", "type": "paragraph", "description": "Short goal statement" },
    { "key": "theory", "label": "Theory & Background", "type": "rich_text", "description": "Scientific background" },
    { "key": "equipment", "label": "Equipment & Materials", "type": "list", "description": "Tools and materials needed" },
    { "key": "procedure", "label": "Step-by-Step Procedure", "type": "numbered_list", "description": "Experimental steps" },
    { "key": "observations", "label": "Observations", "type": "table_or_paragraph", "description": "Data tables or notes" },
    { "key": "conclusion", "label": "Conclusion", "type": "paragraph", "description": "Summary and findings" }
  ],
  "style": {
    "hasPageNumbers": true,
    "hasInstitutionHeader": true,
    "hasSafetySection": false
  }
}

Adapt the sections to match what is ACTUALLY in the uploaded document. Return ONLY the JSON.`;

  const result = await model.generateContent(prompt);
  let output = result.response.text().replace(/```json/gi, '').replace(/```/g, '').trim();
  return JSON.parse(output);
};

const generateManualFromFormat = async (formatSchema, title, topic, details, level) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const sectionKeys = formatSchema.sections.map(s => `"${s.key}": "${s.description} (${s.type})"`).join(',\n    ');

  const prompt = `You are an expert academic educator writing a lab manual.

Create a complete, professional lab manual for a ${level || 'University'} level class.
Title: "${title}"
Topic: "${topic}"
Additional Details: "${details || 'None'}"

The manual MUST follow this EXACT structural format extracted from the institution's existing lab manual style:
${JSON.stringify(formatSchema.sections, null, 2)}

Return ONLY a valid JSON object with these exact section keys, filled with rich, detailed academic content:
{
    ${sectionKeys}
}

Be thorough and detailed. For lists, provide real arrays of strings. For text, provide multiple paragraphs where appropriate. ONLY RETURN VALID JSON.`;

  const result = await model.generateContent(prompt);
  let output = result.response.text().replace(/```json/gi, '').replace(/```/g, '').trim();
  return JSON.parse(output);
};


const generateLabManualText = async (topic, details, level) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = `You are an expert academic educator. Create a comprehensive lab manual for a ${level || 'University'} level class about "${topic}".
Additional details: ${details || 'None'}.

Return ONLY a valid JSON object with these EXACT keys:
{
  "objective": "...",
  "theory": "...",
  "equipment": ["...", "..."],
  "procedure": ["Step 1: ...", "Step 2: ..."],
  "observations": "...",
  "conclusion": "..."
}`;

  const result = await model.generateContent(prompt);
  let output = result.response.text().replace(/```json/gi, '').replace(/```/g, '').trim();
  return JSON.parse(output);
};

module.exports = { analyzeFormatFromText, generateManualFromFormat, generateLabManualText };
