const pool = require('./index.js');
/* refactor this example function to match my data */
const createProduct = (body) => new Promise((resolve, reject) => {
  const { name, email } = body;
  pool.query('INSERT INTO products (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
    if (error) {
      reject(error);
    }
    resolve(`A new merchant has been added added: ${results.rows[0]}`);
  });
});

/* break data.csv into an array and call createProduct on every element */