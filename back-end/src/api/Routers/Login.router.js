const { Router } = require('express');
const loginController = require('../Controllers/Login.controller');
const { validTokenAdmin } = require('../Middlewares/ValidToken');

const route = Router();

route.get('/sellers', loginController.getSellers);
route.post('/login', loginController.login);
route.post('/register', loginController.register);
route.post('/admin/register', validTokenAdmin, loginController.register);
route.get('/users', loginController.getAll);

module.exports = route;
