const { Pool } = require('pg');

const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'sdc_overview',
  password: 'password',
  port: 5432,
});
