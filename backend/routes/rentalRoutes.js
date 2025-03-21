// API routes for rentals
const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all rentals
router.get('/', async(req, res) => {
    try {
        const result = await pool.query('SELECT * FROM rentals');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching rentals');
    }
});

// GET a rental by ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query("SELECT * FROM rentals WHERE rental_id = $1", [id]);

        // Rental not found
        if(result.rows.length === 0) {
            return res.status(404).json({error: "Rental not found"});
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error fetching rental: ", error);
        res.status(500).json({error: "Internal server error"});
    }
});

// CREATE a new rental

// UPDATE a rental by ID

// DELETE a rental by ID

module.exports = router;