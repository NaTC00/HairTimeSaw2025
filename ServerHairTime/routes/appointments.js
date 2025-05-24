const express = require('express');
const router = express.Router();
const pool = require('../db');
const admin = require('firebase-admin');
const { verifyToken } = require('./auth');
const { error } = require('console');


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

router.post('/book', verifyToken, async (req, res) => {
  console.log("Richiesta prenotazione appuntamento");

  const { services, date, time_slot } = req.body;
  const userId = req.user.uid;

  if (!Array.isArray(services) || services.length === 0) {
    return res.status(400).json({ error: 'Lista servizi richiesta' });
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const appointmentResult = await client.query(
      'INSERT INTO appointments (user_id, date, time_slot) VALUES ($1, $2, $3) RETURNING id',
      [userId, date, time_slot]
    );

    const appointmentId = appointmentResult.rows[0].id;

    for (const serviceId of services) {
      await client.query(
        'INSERT INTO appointment_services (appointment_id, service_id) VALUES ($1, $2)',
        [appointmentId, serviceId]
      );
    }

    await client.query('COMMIT');
    res.status(201).json({ message: 'Appuntamento creato', appointmentId });
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
});


module.exports = router;
