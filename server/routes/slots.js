// routes/slots.js
const express = require('express');
const router = express.Router();
const { getTotalDuration, getAppoinmentByDate } = require('../db/sql/queries');
const { parseTimeSlot, toTime } = require('../utils');

/**
 * @route   GET /slots
 * @desc    Restituisce gli slot disponibili nei prossimi 2 mesi
 *          in base ai servizi richiesti
 */
router.get('/', async (req, res) => {
    console.log("Verifica slot disponibili")
     // Estrai i parametri query per i servizi
    const services = req.query.services || req.query['services[]'];

    // Converte il parametro "services" in un array di interi
    let serviceArray = [];

    if (Array.isArray(services)) {
   
        serviceArray = services.map(id => parseInt(id, 10));
    } else if (services) {

    serviceArray = [parseInt(services, 10)];
    }
    

    // Validazione: array vuoto o contenente valori non numerici
    if (serviceArray.length === 0 || serviceArray.some(isNaN)) {
        return res.status(400).json({ error: 'Servizi richiesti non validi' });
    }

    try {
        // Calcola la durata totale richiesta per i servizi selezionati
        const totalDuration = parseInt(await getTotalDuration(serviceArray), 10);
        if (!totalDuration) {
        return res.status(500).json({ error: 'Errore nel calcolo della durata totale' });
        }

        const availability = {}; // Oggetto contenente le disponibilità per ogni giorno
        const today = new Date(); // Data di partenza (oggi)

        // Itera sui prossimi 32 giorni
        for (let dayOffset = 0; dayOffset < 90; dayOffset++) {
        const date = new Date(today);
        date.setDate(today.getDate() + dayOffset); // Avanza di "dayOffset" giorni

        const dayOfWeek = date.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 1) continue; // Salta domenica (0) e lunedì (1)

        const dateStr = date.toISOString().split('T')[0]; // Formatta la data come "YYYY-MM-DD"
        const dayAvailability = []; // Array di slot disponibili per il giorno corrente

        // Definisce i blocchi orari: 9–13 e 14–18 (in minuti)
        const timeBlocks = [
            { start: 9 * 60, end: 13 * 60 },
            { start: 14 * 60, end: 18 * 60 }
        ];

        // Ottiene gli appuntamenti già esistenti per la data corrente
        const existingAppointments = await getAppoinmentByDate(dateStr);
        const occupiedSlots = existingAppointments.map(row => parseTimeSlot(row.time_slot)); // Converti in minuti

        const now = new Date();
        const isToday = dateStr === today.toISOString().split('T')[0];
        const currentMinutes = now.getHours() * 60 + now.getMinutes();

        // Itera su ogni blocco orario (mattina e pomeriggio)
        for (const block of timeBlocks) {
            for (let t = block.start; t + totalDuration <= block.end; t += 30) {
            const from = t;
            const to = t + totalDuration;

            // Se è oggi, salta slot nel passato
            if (isToday && from < currentMinutes) continue;

            // Verifica se c'è sovrapposizione con appuntamenti esistenti
            const overlap = occupiedSlots.some(slot => !(to <= slot.from || from >= slot.to));
            if (!overlap) {
                // Se non c'è sovrapposizione, aggiungi lo slot alla lista del giorno
                dayAvailability.push(`${toTime(from)}-${toTime(to)}`);
            }
            }
        }

        // Se ci sono slot disponibili quel giorno, salvali nella mappa
        if (dayAvailability.length > 0) {
            availability[dateStr] = dayAvailability;
        }
        }

        // Risposta finale con gli slot disponibili
        return res.status(200).json(availability );
    } catch (err) {
        // Gestione errori
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;
