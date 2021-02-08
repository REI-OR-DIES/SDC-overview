DROP DATABASE sdc_overview;

CREATE DATABASE sdc_overview;

\c sdc_overview;

CREATE TABLE IF NOT EXISTS products (
  brand_name TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price JSONB,
  rating JSONB,
  options JSONB
);

CREATE TABLE IF NOT EXISTS images (
  image_url TEXT
);
