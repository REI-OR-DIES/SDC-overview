const express = require('express');
const path = require('path');
const api = require('./api');
require('../database');

const app = express();

app.use(express.static(path.resolve(__dirname, '../client/public')));

app.use('/api', api);

module.exports = app;
