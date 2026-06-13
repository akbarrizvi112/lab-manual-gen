const pdfParseLib = require('pdf-parse');
const pdfParse = pdfParseLib.default || pdfParseLib;
const fs = require('fs');

/**
 * Extracts raw text content from a PDF file at the given path.
 * @param {string} filePath - Absolute path to the PDF file.
 * @returns {Promise<string>} - The extracted text content.
 */
const extractTextFromPdf = async (filePath) => {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
};

module.exports = { extractTextFromPdf };
