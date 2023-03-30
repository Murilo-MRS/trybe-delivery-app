const { Router } = require('express');
const loginRoute = require('./Login.router');
const productRoute = require('./Product.router');

const route = Router();

route.use(loginRoute);
route.use(productRoute);

module.exports = route;
