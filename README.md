# GAR-FEC-Product-Overview

## Instructions:
- fork (optional) and clone this repo
- `npm install`
- ensure postgresql is installed and running on your machine
- `npm run headers` to create csv files, add headers, and one data entry
- `npm run generate [x]` to save fake data in csv files, where `x` is the desired number of entries
- `npm run seed` to seed the database with the fake data from products.csv and images.csv
- `npm start [port]` to start the server where `port` is desired port number (defaults to 3001)
- to be continued...

## API Methods:
- GET /api/products/id/x
  - Returns the product document with product_id of x
- GET /api/products/all
  - Returns all product documents
- GET /api/products/random
  - Returns a random product document

## Tests:
- Product API:
  - `npm run test:api`
