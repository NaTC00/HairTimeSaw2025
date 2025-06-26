const fs = require('fs');
const path = require('path');
const  pool = require('./db'); 

async function initializeDatabase() {
  const schemaPath = path.join(__dirname, 'sql', 'schema.sql'); 
  const schema = fs.readFileSync(schemaPath, 'utf8');

  try {
    // Esegui lo schema
    await pool.query(schema);
    console.log('Struttura database verificata.');

    // Verifica se la tabella `services` è vuota
    const result = await pool.query('SELECT COUNT(*) FROM services');
    const count = parseInt(result.rows[0].count, 10);

    if (count === 0) {
      // Inserisci dati iniziali
      await pool.query(`
        INSERT INTO services (name, cost, duration_minutes) VALUES
        ('Taglio', 20.00, 30),
        ('Piega', 15.00, 30),
        ('Colore', 50.00, 60),
        ('Tonalizzante', 30.00, 20),
        ('Maschera', 10.00, 10),
        ('Schiariture', 100.00, 180);
      `);      
      console.log('Servizi iniziali inseriti.');
    } else {
      console.log('Servizi già presenti. Nessun inserimento effettuato.');
    }
  } catch (err) {
    console.error('Errore durante l\'inizializzazione del DB:', err);
  }
}


module.exports = initializeDatabase;
