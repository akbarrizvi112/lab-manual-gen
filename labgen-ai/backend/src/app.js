const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();

connectDB();

const app = express();


app.use(cors());
app.use(express.json());

// Main Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/templates', require('./routes/templateRoutes'));
app.use('/api/manuals', require('./routes/manualRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/export', require('./routes/exportRoutes'));

// Root endpoint check
app.get('/', (req, res) => {
    res.send('LabGen AI API is running...');
});

// Custom error handling middleware
app.use(errorHandler);

module.exports = app;
