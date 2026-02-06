/**
 * Express.js API Server for Plate Recognition App
 * Provides endpoints for Turkish license plate data
 */

const express = require('express');
const cors = require('cors');

const { generatePlates } = require('./generatePlates');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Enable CORS for all origins (development mode)
app.use(express.json()); // Parse JSON request bodies

// Request logging middleware
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path}`);
    next();
});

/**
 * Health check endpoint
 * GET /health
 * Returns server status
 */
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

/**
 * Daily plates endpoint
 * GET /api/plates/daily
 * Returns 3000 random Turkish license plates with simulated latency
 */
app.get('/api/plates/daily', async (req, res) => {
    try {
        // Simulate API latency (500ms)
        await new Promise(resolve => setTimeout(resolve, 500));

        // Generate 3000 unique Turkish license plates
        const plates = generatePlates(3000);

        // Return response
        res.json({
            plates,
            count: plates.length,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error generating plates:', error);
        res.status(500).json({
            error: 'Failed to generate plates',
            message: error.message
        });
    }
});

/**
 * 404 handler for undefined routes
 */
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.method} ${req.path} not found`
    });
});

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message
    });
});

// Start server
app.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log(`🚀 Plate Recognition API Server`);
    console.log(`📍 Running on: http://localhost:${PORT}`);
    console.log(`⏰ Started at: ${new Date().toISOString()}`);
    console.log('='.repeat(50));
    console.log('\nAvailable endpoints:');
    console.log(`  GET  /health              - Health check`);
    console.log(`  GET  /api/plates/daily    - Get 3000 Turkish plates`);
    console.log('='.repeat(50));
});

module.exports = app;
