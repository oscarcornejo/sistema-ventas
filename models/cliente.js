const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClienteSchema = Schema({
    nombre_comprador: String,
    nombre_empresa: String,
    rut: String,
    direccion: String,
    telefono: String,
    correo: String,
    comuna: String,
    ciudad: String,
    pais: String,
    puntos: Number,
    createAtt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('cliente', ClienteSchema);