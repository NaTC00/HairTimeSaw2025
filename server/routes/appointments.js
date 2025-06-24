const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const admin = require('firebase-admin');
const { verifyToken } = require('./auth');
const { error, group } = require('console');
const { getAppoinmentsUser, getAppoinmentByDate, deleteAppointmentUser, createAppointment, linkServiceToAppointment } = require('../db/sql/queries');
const { parseTimeSlot } = require('../utils');
const { start } = require('repl');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);



/**
 * @route   POST /appointments
 * @desc    Crea un nuovo appuntamento per l'utente autenticato
 */
router.post('/', verifyToken, async (req, res) => {
  console.log("Richiesta prenotazione appuntamento");

  // Estrae i dati dal corpo della richiesta
  const { services, phone_number, date, time_slot } = req.body;
  const userId = req.user.uid;

  // Validazione: servizi richiesti
  if (!Array.isArray(services) || services.length === 0) {
    return res.status(400).json({ error: 'La lista dei servizi è obbligatoria.' });
  }

  // Validazione: numero di telefono
  if (!phone_number || typeof phone_number !== 'string' || phone_number.trim() === '') {
    return res.status(400).json({ error: 'Il numero di telefono è obbligatorio.' });
  }

  // Validazione: data
  if (!date || typeof date !== 'string' || isNaN(Date.parse(date))) {
    return res.status(400).json({ error: 'La data fornita non è valida.' });
  }

  // Validazione: fascia oraria (es. "09:00-09:30")
  if (!time_slot || typeof time_slot !== 'string' || !time_slot.includes('-')) {
    return res.status(400).json({ error: 'La fascia oraria non è valida. Usa il formato "HH:mm-HH:mm".' });
  }

  // Parsing della fascia oraria in minuti
  const { from, to } = parseTimeSlot(time_slot);

  // Recupera tutti gli appuntamenti esistenti per quella data
  const existingAppointments = await getAppoinmentByDate(date);

  // Controlla se c'è sovrapposizione con altri appuntamenti
  const overlap = existingAppointments.some(slot => {
    const { from: f, to: t } = parseTimeSlot(slot.time_slot);
    return !(t <= from || to <= f);
  });

  if (overlap) {
    return res.status(400).json({ error: 'Fascia oraria non disponibile' });
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN'); // Inizia transazione

    // Crea l'appuntamento e ottieni l'id generato
    const appointmentId = await createAppointment(client, userId, date, time_slot, phone_number);

    // Collega i servizi all'appuntamento
    for (const serviceId of services) {
      await linkServiceToAppointment(client, appointmentId, serviceId);
    }

    await client.query('COMMIT'); // Conferma transazione
    return res.status(201).json({ message: 'Appuntamento creato', appointmentId });
  } catch (err) {
    await client.query('ROLLBACK'); // Annulla in caso di errore
    return res.status(500).json({ error: err.message });
  } finally {
    client.release(); // Rilascia la connessione al pool
  }
});

/**
 * @route   DELETE /appointments/:id
 * @desc    Elimina un appuntamento per l'utente autenticato
 */
router.delete('/:id', verifyToken, async (req, res) => {
  const appointmentId = req.params.id;
  const userId = req.user.uid;

  console.log(`Elimino appuntamento ${appointmentId} per utente ${userId}`);

  try {
    // Cancella l'appuntamento se appartiene all'utente
    await deleteAppointmentUser(userId, appointmentId);
    return res.status(200).json({ message: 'Appuntamento eliminato' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

/**
 * @route   GET /appointments
 * @desc    Recupera tutti gli appuntamenti dell'utente autenticato
 */
router.get('/', verifyToken, async (req, res) => {
  const userId = req.user.uid;

  try {
    // Ottiene gli appuntamenti grezzi dell'utente
    const rawAppointments = await getAppoinmentsUser(userId);

    // Converte la data al formato italiano/localizzato
    const formattedAppointments = rawAppointments.map(appt => ({
      ...appt,
      date: dayjs.utc(appt.date).tz("Europe/Rome").format("YYYY-MM-DD")
    }));

    return res.status(200).json(formattedAppointments);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;






module.exports = router;
