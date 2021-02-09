/* eslint-disable no-console */
/* eslint-disable arrow-parens */
const { Pool } = require('pg');

const port = '5432';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sdc_overview',
  password: 'password',
  port,
});

pool.connect()
  .then(() => console.log(`Connected to PostgreSQL at port ${port}!`))
  .catch(err => console.log(err));

const getProductByIdOrRandom = (idParam) => {
  const id = idParam || Math.floor(Math.random() * 10000000);
  const queryString = 'SELECT * FROM products INNER JOIN images ON products_id = image_id WHERE products_id=$1';
  return pool.query(queryString, [id])
    .then(result => result)
    .catch(err => err);
};

module.exports = { getProductByIdOrRandom };
