// routes/services.js
const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const { getServices} = require('../db/sql/queries');

/**
 * @route   GET /services
 * @desc    Restituisce la lista di tutti i servizi disponibili
 */
router.get('/', async (req, res) => {
    console.log("Richiesta tutti i servizi");
    
    try {
      // Esegue la query per ottenere tutti i servizi dal database
      const result = await getServices();
  
      // Restituisce i risultati in formato JSON con status 200 OK
      res.status(200).json(result.rows);
    } catch (err) {
      // In caso di errore, restituisce errore 500 con il messaggio
      res.status(500).json({ error: err.message });
    }
  });


module.exports = router;