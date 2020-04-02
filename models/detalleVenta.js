const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DetalleVentaSchema = Schema({
    idproducto: { type: Schema.ObjectId, ref: 'producto' },
    cantidad: Number,
    idventa: { type: Schema.ObjectId, ref: 'venta' },
});

module.exports = mongoose.model('detalleventa', DetalleVentaSchema);