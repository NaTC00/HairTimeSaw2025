const express = require('express');
const router = express.Router();
const pool = require('../db');
const admin = require('firebase-admin');
const { verifyToken } = require('./auth');
const { error, group } = require('console');
const { getAppoinmentsUser, getTotalDuration, getAppoinmentByDate, deleteAppointmentUser } = require('../sql/queries');
const { toTime, parseTimeSlot } = require('../utils');
const { start } = require('repl');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);



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
    return res.status(400).json({ error: 'Lista servizi richiesta' })
  }

  const {from, to} = parseTimeSlot(time_slot)
  const existingAppointments = await getAppoinmentByDate(date)

  const overlap = existingAppointments.some(slot => {
    const {from: f, to: t} = parseTimeSlot(slot.time_slot);
    return !(t <= f || from >= t)
  })

  if(overlap){
    return res.status(400).json({ error: 'Fascia oraria non disponibile' });
  }

  const client = await pool.connect()

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
    return res.status(201).json({ message: 'Appuntamento creato', appointmentId });
  } catch (err) {
    await client.query('ROLLBACK');
    return res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
});

router.delete('/:id', verifyToken, async (req, res) => {

  const appointmentId = req.params.id;
  const userId = req.user.uid;
  console.log(`Elimino appuntamento ${appointmentId} per utente ${userId}`);
  try {

    await deleteAppointmentUser(userId, appointmentId);
    return res.status(200).json({ message: 'Appuntamento eliminato' });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});



router.get('/user', verifyToken, async (req, res) => {
  const userId = req.user.uid;

  try {

    const rawAppointments = await getAppoinmentsUser(userId);

     const formattedAppointments = rawAppointments.map(appt => ({
      ...appt,
      date: dayjs.utc(appt.date).tz("Europe/Rome").format("YYYY-MM-DD")
    }));

    return res.status(200).json(formattedAppointments);
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
});


router.post('/availability', async (req, res) => {
  const {services} = req.body
  if(!Array.isArray(services) || services.length === 0){
    return res.status(400).json({error: 'Servizi richiesti non validi'})
  }
  try{
    const totalDuration = parseInt(await getTotalDuration(services), 10)
    if(!totalDuration) return res.status(500).json({ error: err.message })

    const availability = {}
    const today = new Date()

    for(let dayOffset = 0; dayOffset < 32; dayOffset++){
      const date = new Date(today);
      date.setDate(today.getDate() + dayOffset)

      const dayOfWeek = date.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 1) {
        continue; //salta lunedì e domenica
      }

      const dateStr = date.toISOString().split('T')[0]
      const dayAvailability = []

      const timeBlocks = [
        {start: 9 * 60, end: 13 * 60},
        {start: 14 * 60, end: 18 *60}
      ]

     const existingAppointments = await getAppoinmentByDate(dateStr)

    const occupiedSlots = existingAppointments.map(row => parseTimeSlot(row.time_slot))

    for (const block of timeBlocks) {
      for (let t = block.start; t + totalDuration <= block.end; t += 30) {
        const from = t
        const to = t + totalDuration
        const overlap = occupiedSlots.some(slot => !(to <= slot.from || from >= slot.to))
        if (!overlap) {
          dayAvailability.push(`${toTime(from)}-${toTime(to)}`)
        }
      }
    }


      if(dayAvailability.length > 0){
        availability[dateStr] = dayAvailability
      }


    }

    return res.json(availability)

  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
});



module.exports = router;
