const { Router } = require('express');
const loginController = require('../Controllers/Login.controller');

const route = Router();

route.post('/', loginController.login);

module.exports = route;
