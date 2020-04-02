const Categoria = require('../models/categoria');

function registrar(req, res) {
    const data = req.body;

    const categoria = new Categoria();
    categoria.titulo = data.titulo;
    categoria.descripcion = data.descripcion;

    categoria.save((err, categoria_save) => {
        if (err) {
            res.status(500).send({ message: 'Error en el Servidor' })
        } else {
            if (categoria_save) {
                res.status(200).send({ categoria: categoria_save })
            } else {
                res.status(403).send({ message: 'La categoría no se pudo Registrar' })
            }
        }
    });
}

function obtener_categoria(req, res) {
    const id = req.params['id'];

    Categoria.findById({ _id: id }, (err, categoria_data) => {
        if (err) {
            res.status(500).send({ message: 'Error en el Servidor' });
        } else {
            if (categoria_data) {
                res.status(200).send({ categoria: categoria_data })
            } else {
                res.status(403).send({ message: 'La categoría no existe' })
            }
        }
    });
}

function editar(req, res) {
    const id = req.params['id'];
    const data = req.body;
    Categoria.findByIdAndUpdate({ _id: id }, { titulo: data.titulo, descripcion: data.descripcion }, (err, categoria_edit) => {
        if (err) {
            res.status(500).send({ message: 'Error en el Servidor' });
        } else {
            if (categoria_edit) {
                res.status(200).send({ categoria: categoria_edit })
            } else {
                res.status(403).send({ message: 'La categoría no pudo ser actualizada' })
            }
        }
    });
}

function eliminar(req, res) {
    const id = req.params['id'];

    Categoria.findByIdAndRemove({ _id: id }, (err, categoria_delete) => {
        if (err) {
            res.status(500).send({ message: 'Error en el Servidor' });
        } else {
            if (categoria_delete) {
                res.status(200).send({ categoria: categoria_delete })
            } else {
                res.status(403).send({ message: 'La categoría no pudo ser eliminada' })
            }
        }
    })
}

function listar(req, res) {
    const nombre = req.params['nombre'];

    Categoria.find({ titulo: new RegExp(nombre, 'i') }, (err, categoria_listado) => {
        if (err) {
            res.status(500).send({ message: 'Error en el Servidor' });
        } else {
            if (categoria_listado) {
                res.status(200).send({ categorias: categoria_listado })
            } else {
                res.status(403).send({ message: 'no existen registros con ese título' })
            }
        }
    });
}


module.exports = {
    registrar,
    obtener_categoria,
    editar,
    eliminar,
    listar
}