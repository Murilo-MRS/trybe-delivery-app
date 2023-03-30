const { Router } = require('express');
const loginRoute = require('./Login.router');
const productRoute = require('./Product.router');
const saleRoute = require('./Sale.router');

const route = Router();

route.use(loginRoute);
route.use(productRoute);
route.use(saleRoute);

module.exports = route;
