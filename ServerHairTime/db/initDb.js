const fs = require('fs');
const path = require('path');
const pool = require('./db');

async function initializeDatabase() {
  const schemaPath = path.join(__dirname, 'sql', 'schema.sql'); 
  const schema = fs.readFileSync(schemaPath, 'utf8');

  try {
    await pool.query(schema);
    console.log('Database inizializzato con successo.');
  } catch (err) {
    console.error('Errore inizializzazione DB:', err);
  }
}

module.exports = initializeDatabase;
