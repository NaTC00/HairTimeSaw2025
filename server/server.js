require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./cron/reminderJob');


const initializeDatabase = require('./db/initDb');
const waitForDB = require("./db/dbConnect");

(async () => {
  try {
    // 1. Aspetta che il DB sia disponibile
    await waitForDB();

    // 2. Inizializza il DB (tabelle, dati iniziali)
    await initializeDatabase();

    // 3. Avvia il server
    const app = express();
    const port = process.env.PORT || 3000;

    app.use(cors());
    app.use(express.json());

    // Importa i router
    const appointmentsRouter = require('./routes/appointments');
    app.use('/appointments', appointmentsRouter);

    const { authRouter } = require('./routes/auth');
    app.use('/auth', authRouter);

    const reviewRouter = require('./routes/reviews');
    app.use('/reviews', reviewRouter);

    const pushRouter = require('./routes/push');
    app.use('/push', pushRouter);

    app.get('/', (req, res) => {
      res.send('HairTime backend is running!');
    });

    app.listen(port, () => {
      console.log(`Server in ascolto su http://localhost:${port}`);
    });

  } catch (error) {
    console.error('Errore durante l\'avvio del server:', error);
    process.exit(1);
  }
})();