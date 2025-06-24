// routes/reviews.js
const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const { verifyToken } = require('./auth');
const { submitReview, getReviews } = require('../db/sql/queries');


/**
 * @route   POST /reviews
 * @desc    Invia una nuova recensione da parte di un utente autenticato
 */
router.post('/', verifyToken, async (req, res) => {
    console.log("Inviata nuova recensione");
  
    // Estrae valutazione e commento dal corpo della richiesta
    const { rating, comment } = req.body;
  
    const user_id = req.user.uid;
  
    try {
      // Inserisce la recensione nel database
      const result = await submitReview(user_id, rating, comment);
  
      // Restituisce la recensione appena salvata con status 201 Created
      return res.status(201).json(result.rows[0]);
    } catch (err) {
      // Logga l’errore e restituisce status 500 con messaggio d’errore
      console.error("Errore durante l'inserimento della recensione:", err);
      return res.status(500).json({ error: err.message });
    }
  });
  
  
  /**
   * @route   GET /reviews
   * @desc    Recupera tutte le recensioni disponibili
   */
  router.get('/', async (req, res) => {
    console.log("Richiesta recensioni");
  
    try {
      // Esegue la query per ottenere tutte le recensioni dal database
      const result = await getReviews();
  
      // Restituisce la lista delle recensioni con status 200 OK
      return res.status(200).json(result.rows);
    } catch (err) {
      // Logga l’errore e restituisce errore 500 con messaggio
      console.error("Errore durante il recupero delle recensioni:", err);
      return res.status(500).json({ error: err.message });
    }
  });

module.exports = router;