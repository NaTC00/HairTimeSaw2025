const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db/db');
const { getUserByEmail, createUser } = require('../db/sql/queries');
const router = express.Router();

/**
 * @route   POST /auth/users
 * @desc    Registra un nuovo utente (signup)
 */
router.post('/users', async (req, res) => {
  const { username, email, password } = req.body;

  // Validazione di base dei campi
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Controlla che tutti i campi siano compilati correttamente.' });
  }

  if (!email.includes('@')) {
    return res.status(400).json({ error: "L'indirizzo email non è valido." });
  }

  try {
    // Verifica se esiste già un utente con la stessa email
    const result = await getUserByEmail(email);
    if (result.rows.length > 0) {
      return res.status(409).json({ error: 'Utente già registrato con questa email' });
    }

    // Crittografia della password
    const hashed = await bcrypt.hash(password, 10);

    // Inserimento nuovo utente nel database
    await createUser(username, email, hashed);

    return res.status(201).json({ message: 'Utente registrato con successo' });
  } catch (err) {
    // Gestione errori server
    return res.status(500).json({ error: err.message });
  }
});


/**
 * @route   POST /auth/tokens
 * @desc    Autentica utente e restituisce JWT (login)
 */
router.post('/tokens', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Recupera l'utente dal DB
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    // Se l'utente non esiste
    if (!user) {
      return res.status(401).json({ error: 'Email non trovata' });
    }

    // Verifica la password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Password errata' });
    }

    // Genera il JWT token con scadenza di 2 ore
    const token = jwt.sign(
      { uid: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    // Restituisce il token e lo username
    return res.status(201).json({ token, username: user.username });
  } catch (err) {
    // Gestione errori server
    return res.status(500).json({ error: err.message });
  }
});


/**
 * @middleware verifyToken
 * @desc      Middleware per proteggere le rotte tramite JWT
 *            Controlla l'header Authorization: Bearer <token>
 */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Controlla se il token è presente e ha il formato corretto
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token mancante o non valido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verifica il token con la chiave segreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // es. { uid: ..., email: ... }
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token non valido' });
  }
};

// Esporta sia il router con le route di autenticazione, sia il middleware di verifica token
module.exports = {
  authRouter: router,
  verifyToken
};
