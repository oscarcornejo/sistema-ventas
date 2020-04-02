const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductoSchema = Schema({
    nombre: String,
    descripcion: String,
    imagen: String,
    precio_compra: Number,
    precio_venta: Number,
    stock: Number,
    idcategoria: { type: Schema.ObjectId, ref: 'categoria' },
    puntos: Number,
    createAtt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('producto', ProductoSchema);