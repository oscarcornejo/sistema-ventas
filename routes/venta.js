const express = require('express');
const ventaController = require('../controllers/VentaController');

const api = express.Router();

api.post('/venta/registrar', ventaController.registrar);
api.get('/venta/datos/:id', ventaController.datos_venta);

module.exports = api;