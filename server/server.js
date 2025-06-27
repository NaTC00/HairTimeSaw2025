// Carica le variabili d'ambiente da .env
require('dotenv').config();

const express = require('express');
const cors = require('cors');

// Avvia il task programmato per inviare promemoria automatici
require('./cron/reminderJob');

const initializeDatabase = require('./db/initDb'); // Inizializza le tabelle e i dati iniziali
const waitForDB = require("./db/dbConnect");       // Aspetta che il database sia disponibile

(async () => {
  try {
    // Attende che il database sia pronto prima di procedere
    await waitForDB();

    // Inizializza il database (creazione tabelle e dati di base)
    await initializeDatabase();

    const app = express();
    const PORT = process.env.PORT || 3000;


    

    // Abilita CORS per le richieste provenienti da altri domini (es. frontend)
    app.use(cors());

    // Abilita la lettura del corpo delle richieste in formato JSON
    app.use(express.json());

    // Importa e monta i router per le varie funzionalità

    const appointmentsRouter = require('./routes/appointments');
    app.use('/appointments', appointmentsRouter); // Gestione appuntamenti

    const servicesRouter = require('./routes/services');
    app.use('/services', servicesRouter); // Lista dei servizi

    const slotsRouter = require('./routes/slots');
    app.use('/slots', slotsRouter); // Calcolo degli slot disponibili

    const { authRouter } = require('./routes/auth');
    app.use('/auth', authRouter); // Autenticazione: login e registrazione

    const reviewRouter = require('./routes/reviews');
    app.use('/reviews', reviewRouter); // Recensioni utenti

    const pushRouter = require('./routes/push');
    app.use('/push', pushRouter); // Notifiche push

   

    // Avvia il server HTTP sulla porta specificata
    app.listen(PORT, '192.168.1.20', () => {
      console.log(`Server in ascolto su http://0.0.0.0:${PORT}`);
    });
    

  } catch (error) {
    // In caso di errore all'avvio, stampa l'errore e termina l'app
    console.error('Errore durante l\'avvio del server:', error);
    process.exit(1);
  }
})();
