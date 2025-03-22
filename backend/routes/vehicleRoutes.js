// API routes for vehicles
const express = require('express');
const router = express.Router();
const pool = require('../db');


// GET all vehicles
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM vehicles');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching vehicles');
    }
});


// GET a vehicle by ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query("SELECT * FROM vehicles WHERE vehicle_id = $1", [id]);

        // Vehicle not found
        if(result.rows.length === 0) {
            return res.status(404).json({error: `Vehicle id ${id} not found` });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error fetching vehicle: ", error);
        res.status(500).json({error: "Internal server error"});
    }
});

// CREATE a new vehicle

// UPDATE a vehicle by ID

// DELETE a vehicle by ID


module.exports = router;

