const express = require('express');
const router = express.Router();
const pool = require('../db');

// POST /appointments/create-service → crea un servizio
router.post('/create-service', async (req, res) => {
    console.log('Body ricevuto:', req.body);
    const { name, cost, duration_minutes } = req.body;
    try {
        const existingService = await pool.query(
          'SELECT * FROM services WHERE name=$1'
          [name]
        )

        if(existingService.rows.length>0){
          return res.status(400).json({ error: 'Un servizio con questo nome esiste già.' })
        }

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
   console.log("Richiesta tutti i servizi")
  try {
    const result = await pool.query('SELECT * FROM services');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
