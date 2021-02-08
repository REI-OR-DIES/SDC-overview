/* eslint-disable max-len */
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sdc_overview',
  password: 'password',
  port: '5432',
});

pool.query("COPY products FROM '/home/melissa_ganzfried/hackreactor/SDC-overview/postgres/products.csv' DELIMITER ',' CSV HEADER;")
  .then(() => pool.query('ALTER TABLE products ADD COLUMN products_id BIGSERIAL PRIMARY KEY;'))
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

pool.query("COPY images FROM '/home/melissa_ganzfried/hackreactor/SDC-overview/postgres/images.csv' DELIMITER ',' CSV HEADER;")
  .then(() => pool.query('ALTER TABLE images ADD COLUMN image_id BIGSERIAL PRIMARY KEY;'))
  .then((res) => {
    console.log(res);
    pool.end();
  })
  .catch((err) => {
    console.log(err);
  });
