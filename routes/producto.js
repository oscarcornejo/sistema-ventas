const express = require('express');
const productoController = require('../controllers/ProductoController');
const multipart = require('connect-multiparty');
const path = multipart({ uploadDir: './uploads/productos' });

const api = express.Router();

api.post('/producto/registrar', path, productoController.registrar);
api.get('/productos/:nombre?', productoController.listar);
api.put('/producto/editar/:id/:img?', path, productoController.editar);
api.get('/producto/obtener/:id', productoController.obtener_producto);
api.delete('/producto/eliminar/:id', productoController.eliminar);
api.put('/producto/stock/:id', productoController.update_stock);
api.get('/producto/img/:img', productoController.get_img);




module.exports = api;