const { Pool } = require('pg');

const RETRIES = 10;
const INTERVAL = 3000;

const waitForDB = async () => {
  for (let i = 0; i < RETRIES; i++) {
    try {
      const pool = new Pool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
      });
      await pool.query('SELECT 1');
      console.log("Database pronto");
      return pool;
    } catch (e) {
      console.log(`⏳ Connessione DB fallita. Tentativo ${i + 1}`);
      await new Promise(r => setTimeout(r, INTERVAL));
    }
  }
  throw new Error("Connessione al database fallita.");
};

module.exports = waitForDB;
