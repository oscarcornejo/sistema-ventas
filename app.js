const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 4201;


// ROUTES
const user_routes = require('./routes/user');
const categoria_routes = require('./routes/categoria');
const producto_routes = require('./routes/producto');
const cliente_routes = require('./routes/cliente');
const venta_routes = require('./routes/venta');

var app = express();

mongoose.connect('mongodb://localhost:27017/sistema', { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log('Servidor Run!');
        app.listen(port, function() {
            console.log('Servidor conectado a ' + port);
        })
    }
});

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use((req, res, next) => {
    res.header('Content-Type: application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, x-auth-token, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow', 'GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use('/api', user_routes);
app.use('/api', categoria_routes);
app.use('/api', producto_routes);
app.use('/api', cliente_routes);
app.use('/api', venta_routes);

module.exports = app;