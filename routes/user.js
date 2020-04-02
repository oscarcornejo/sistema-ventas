const express = require('express');
const userController = require('../controllers/UserController');

const api = express.Router();

api.post('/registrar', userController.registrar);
api.post('/login', userController.login);

module.exports = api;