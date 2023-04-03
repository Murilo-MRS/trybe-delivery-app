const { Router } = require('express');
const saleController = require('../Controllers/Sale.contoller');
const ValidToken = require('../Middlewares/ValidToken');

const route = Router();

route.get('/customer/:id/sales', ValidToken, saleController.getOrdersByCustomer);
route.get('/seller/:id/sales', ValidToken, saleController.getOrdersBySeller);
route.get('/sales/:id', ValidToken, saleController.getSaleById);
route.patch('/sales/:id', ValidToken, saleController.changeStatus);
route.post('/sales', ValidToken, saleController.createSale);

module.exports = route;
