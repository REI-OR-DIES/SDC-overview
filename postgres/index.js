const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'sdc-overview',
  password: 'password',
  port: 5432,
});
