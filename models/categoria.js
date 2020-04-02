const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoriaSchema = Schema({
    titulo: String,
    descripcion: String,
});

module.exports = mongoose.model('categoria', CategoriaSchema);