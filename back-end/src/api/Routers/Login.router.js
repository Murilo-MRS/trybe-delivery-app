const { Router } = require('express');
const loginController = require('../Controllers/Login.controller');

const route = Router();

route.get('/sellers', loginController.getSellers);
route.post('/login', loginController.login);
route.post('/register', loginController.register);

module.exports = route;
