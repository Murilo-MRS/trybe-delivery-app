const { Router } = require('express');
const saleController = require('../Controllers/Sale.contoller');
const ValidToken = require('../Middlewares/ValidToken');

const route = Router();

route.get('/sales/:id', ValidToken, saleController.getOrdersByUser);
route.get('/salesDetails/:id', saleController.getSaleById);
route.patch('/salesDetails/:id', saleController.changeStatus);
route.post('/sales', saleController.createSale);

module.exports = route;
