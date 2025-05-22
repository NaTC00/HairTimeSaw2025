const { Pool } = require('pg');

const pool = new Pool({
  user: 'macbook_intouch',
  host: 'localhost',
  database: 'DBHairTime',
  password: 'sawdatabase',
  port: 5432,
});

module.exports = pool;
