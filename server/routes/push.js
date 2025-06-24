// routes/push/subscriptions.js
const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const { verifyToken } = require('./auth');
const {getUserEndpoint, addEndpoint, deletePushSubscription, existEndpoint} = require('../db/sql/queries');

/**
 * @route   POST /subscriptions
 * @desc    Registra una nuova sottoscrizione push per l'utente autenticato
 */
router.post('/subscriptions', verifyToken, async (req, res) => {
  try {
    const { subscription } = req.body; // Dati dell'iscrizione push (es. endpoint, keys, ecc.)
    const userId = req.user.uid;

    // Verifica che i dati contengano almeno l'endpoint
    if (!subscription || !subscription.endpoint) {
      return res.status(400).json({ error: 'Dati di iscrizione mancanti o non validi' });
    }

    // Controlla se l'endpoint è già presente per l'utente
    const exist = await existEndpoint(userId, subscription);

    if (exist.rowCount === 0) {
      // Se non esiste, lo inserisce nel DB
      await addEndpoint(userId, subscription);
      console.log("Sottoscrizione client creata");
      return res.status(201).json({ message: "Sottoscrizione client creata" });
    } else {
      // Già presente → non serve reinserire
      console.log("Già presente");
      return res.status(200).json({ message: "Già presente" });
    }
  } catch (err) {
    // Errore in fase di inserimento
    console.error("Errore durante la sottoscrizione della notifica:", err);
    return res.status(500).json({ error: err.message });
  }
});

/**
 * @route   GET /subscriptions
 * @desc    Recupera tutte le sottoscrizioni push dell'utente autenticato
 */
router.get('/subscriptions', verifyToken, async (req, res) => {
  try {
    const userId = req.user.uid;

    // Ottiene tutte le sottoscrizioni push dell'utente dal DB
    const result = await getUserEndpoint(userId);

    return res.status(200).json(result.rows);
  } catch (err) {
    // Errore durante il recupero
    console.error("Errore durante il recupero sottoscrizioni:", err);
    return res.status(500).json({ error: err.message });
  }
});

/**
 * @route   DELETE /subscriptions/:id
 * @desc    Elimina una sottoscrizione push specifica dell'utente
 */
router.delete('/subscriptions/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;      // ID della sottoscrizione da eliminare
    const userId = req.user.uid;

    // Esegue la cancellazione della sottoscrizione
    const result = await deletePushSubscription(id, userId);

    if (result.rowCount > 0) {
      console.log("Sottoscrizione rimossa");
      return res.status(200).json({ message: "Disiscritto con successo" });
    } else {
      return res.status(404).json({ message: "Nessuna sottoscrizione trovata" });
    }
  } catch (err) {
    // Errore durante l'eliminazione
    console.error("Errore durante la disiscrizione:", err);
    return res.status(500).json({ error: err.message });
  }
});


module.exports = router;