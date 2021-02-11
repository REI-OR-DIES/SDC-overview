/* eslint-disable max-len */
const path = require('path');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'ec2-54-215-151-110.us-west-1.compute.amazonaws.com',
  database: 'sdc_overview',
  password: 'password',
  port: '5432',
});

// create products table from products csv file
// then add auto-incrementing id column in that table
const productsFile = path.join(__dirname, 'products.csv');
console.log(productsFile);
const productsQuery = `\copy products FROM '${productsFile}' DELIMITER ',' CSV HEADER;`;
pool.query(productsQuery)
  .then(() => pool.query('ALTER TABLE products ADD COLUMN products_id BIGSERIAL PRIMARY KEY;'))
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

// create images table from images csv file
// then add auto-incrementing id column in that table
const imagesFile = path.join(__dirname, 'images.csv');
const imagesQuery = `\copy images FROM '${imagesFile}' DELIMITER ',' CSV HEADER;`;
pool.query(imagesQuery)
  .then(() => pool.query('ALTER TABLE images ADD COLUMN image_id BIGSERIAL PRIMARY KEY;'))
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
