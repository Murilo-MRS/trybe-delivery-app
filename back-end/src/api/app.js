const express = require('express');
require('express-async-errors');
const handleError = require('./Middlewares/HandleError');

const app = express();
app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(handleError);

module.exports = app;
