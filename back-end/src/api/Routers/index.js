const { Router } = require('express');
const loginRoute = require('./Login.router');

const route = Router();

route.use('/login', loginRoute);

module.exports = route;
