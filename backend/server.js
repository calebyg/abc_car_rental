const express = require('express');
const app = express();
const pool = require('./db');
const vehicleRoutes = require('./routes/vehicleRoutes.js');
const rentalRoutes = require('./routes/rentalRoutes.js');

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/vehicles', vehicleRoutes);
app.use('/rentals', rentalRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// Test DB connection
app.get('/', async(req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({success: true, serverTime: result.rows[0].now});
    } catch (error) {
        res.status(500).json({success: false, error: error.message});
    }
});