DROP DATABASE sdc-overview

CREATE DATABASE sdc-overview

USE sdc-overview

CREATE TABLE products (
  product_id BIGSERIAL NOT NULL PRIMARY KEY,
  brand_name TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  base_price INT NOT NULL,
  discount INT,
  current INT NOT NULL,
  rating_stars SMALLINT,
  rating_count SMALLINT
);

CREATE TABLE images (
  product_id INT NOT NULL PRIMARY KEY,
  image_urls TEXT[]
  FOREIGN KEY(product_id) REFERENCES products(product_id)
);

CREATE TABLE options (
  product_id INT NOT NULL PRIMARY KEY,
  color_name TEXT,
  color_value TEXT,
  sizes TEXT[],
  FOREIGN KEY(product_id) REFERENCES products(product_id)
);