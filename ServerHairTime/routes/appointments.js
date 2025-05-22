const express = require('express');
const router = express.Router();
const pool = require('../db');

// POST /appointments/services → crea un servizio
router.post('/services', async (req, res) => {
    console.log('Body ricevuto:', req.body);
    const { name, cost, duration_minutes } = req.body;
    try {
        const result = await pool.query(
        'INSERT INTO services (name, cost, duration_minutes) VALUES ($1, $2, $3) RETURNING *',
        [name, cost, duration_minutes]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// GET /appointments/services → ottieni tutti i servizi
router.get('/services', async (req, res) => {
    console.log("ciaoooo")
  try {
    const result = await pool.query('SELECT * FROM services');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
