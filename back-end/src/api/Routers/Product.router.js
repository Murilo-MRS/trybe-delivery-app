const { Router } = require('express');
const productController = require('../Controllers/Product.controller');

const route = Router();

route.get('/customer/products', productController.getAll);
route.get('/customer/products/:id', productController.getById);

module.exports = route;