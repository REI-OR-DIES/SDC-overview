const app = require('./app');

const port = process.argv[2] || 3001;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
