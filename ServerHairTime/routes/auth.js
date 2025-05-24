const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const router = express.Router();

/**
 * @route   POST /auth/register
 * @desc    Registra un nuovo utente
 */
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length > 0) {
      return res.status(400).json({ error: 'Utente già registrato con questa email' });
    }

    const hashed = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
      [username, email, hashed]
    );

    res.status(201).json({ message: 'Utente registrato con successo' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route   POST /auth/login
 * @desc    Login utente con email/password → ritorna JWT
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Email non trovata' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Password errata' });
    }

    const token = jwt.sign(
      { uid: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @middleware verifyToken
 * @desc      Protegge le rotte, verifica JWT nel header Authorization
 */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token mancante o non valido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // sarà { uid, email }
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token non valido' });
  }
};

// Esporta sia il router che il middleware
module.exports = {
  authRouter: router,
  verifyToken
};
