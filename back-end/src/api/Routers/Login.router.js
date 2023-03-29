const { Router } = require('express');
const loginController = require('../Controllers/Login.controller');

const route = Router();

route.post('/login', loginController.login);
route.post('/register', loginController.register);

module.exports = route;
