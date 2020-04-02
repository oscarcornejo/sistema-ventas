const express = require('express');
const clienteController = require('../controllers/ClienteController');

const api = express.Router();

api.post('/cliente', clienteController.registrar);
api.put('/cliente/editar/:id', clienteController.editar);
api.delete('/cliente/eliminar/:id', clienteController.eliminar);

module.exports = api;