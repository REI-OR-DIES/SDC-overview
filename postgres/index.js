const { Pool } = require('pg');

const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'sdc_overview',
  password: 'password',
  port: 5432,
});

module.exports = pool;
/* figure out how to establish connection in order to run seed from generated data! */
