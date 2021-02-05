DROP DATABASE IF EXISTS sdc_overview;

CREATE DATABASE sdc_overview;

\c sdc_overview;

CREATE TABLE IF NOT EXISTS products (
  product_id BIGSERIAL NOT NULL PRIMARY KEY,
  brand_name TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price JSONB,
  rating JSONB,
  options JSONB
);

CREATE TABLE IF NOT EXISTS images (
  image_id BIGSERIAL NOT NULL PRIMARY KEY,
  product_id INT NOT NULL,
  image_url TEXT,
  FOREIGN KEY(product_id) REFERENCES products(product_id)
);
