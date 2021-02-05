DROP DATABASE IF EXISTS sdc_overview;

CREATE DATABASE sdc_overview;

\c sdc_overview;

CREATE TABLE IF NOT EXISTS products (
  product_id BIGSERIAL NOT NULL PRIMARY KEY,
  brand_name TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  base_price INT NOT NULL,
  discount INT,
  current INT NOT NULL,
  rating_stars SMALLINT,
  rating_count SMALLINT,
  options JSONB
);

CREATE TABLE IF NOT EXISTS images (
  product_id INT NOT NULL PRIMARY KEY,
  image_urls TEXT[],
  FOREIGN KEY(product_id) REFERENCES products(product_id)
);
