require('express-async-errors');
const express = require('express');
const cors = require('cors');

const handleError = require('./Middlewares/HandleError');
const route = require('./Routers');

const app = express();
app.use(cors());
app.use(express.json());
app.use(route);
app.get('/coffee', (_req, res) => res.status(418).end());

app.use(handleError);

module.exports = app;
