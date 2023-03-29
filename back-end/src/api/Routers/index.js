const { Router } = require('express');
const loginRoute = require('./Login.router');

const route = Router();

route.use(loginRoute);

module.exports = route;
