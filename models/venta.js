const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VentaSchema = Schema({
    idcliente: { type: Schema.ObjectId, ref: 'cliente' },
    iduser: { type: Schema.ObjectId, ref: 'user' },
    fecha: { type: Date, default: Date.now },
});

module.exports = mongoose.model('venta', VentaSchema);