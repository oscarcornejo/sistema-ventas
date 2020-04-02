const Producto = require('../models/producto');
const fs = require('fs');
const path = require('path');


function registrar(req, res) {
    const data = req.body;
    // console.log(req.files.imagen)
    if (req.file || req.files.imagen.path !== undefined) {
        const imagen_path = req.files.imagen.path;
        const name = imagen_path.split('/');
        const imagen_name = name[2];

        const producto = new Producto();

        producto.nombre = data.nombre;
        producto.descripcion = data.descripcion;
        producto.imagen = imagen_name;
        producto.precio_compra = data.precio_compra;
        producto.precio_venta = data.precio_venta;
        producto.stock = data.stock;
        producto.idcategoria = data.idcategoria;
        producto.puntos = data.puntos;

        producto.save((err, producto_save) => {
            if (err) {
                res.status(500).send({ message: 'Error en el Servidor' });
            } else {
                if (producto_save) {
                    res.status(200).send({ producto: producto_save })
                } else {
                    res.status(403).send({ message: 'El producto no pudo registrarse.' });
                }
            }
        })
    } else {
        const producto = new Producto();

        producto.nombre = data.nombre;
        producto.descripcion = data.descripcion;
        producto.imagen = null;
        producto.precio_compra = data.precio_compra;
        producto.precio_venta = data.precio_venta;
        producto.stock = data.stock;
        producto.idcategoria = data.idcategoria;
        producto.puntos = data.puntos;

        producto.save((err, producto_save) => {
            if (err) {
                res.status(500).send({ message: 'Error en el Servidor' });
            } else {
                if (producto_save) {
                    res.status(200).send({ producto: producto_save })
                } else {
                    res.status(403).send({ message: 'El producto no pudo registrarse.' });
                }
            }
        })
    }
}

function listar(req, res) {
    const nombre = req.params['nombre'];

    Producto.find({ nombre: new RegExp(nombre, 'i') }).populate('idcategoria').exec(
        (err, producto_listado) => {
            if (err) {
                res.status(500).send({ message: 'Error en el Servidor' });
            } else {
                if (producto_listado) {
                    res.status(200).send({ productos: producto_listado })
                } else {
                    res.status(403).send({ message: 'No existenten productos con ese nombre.' });
                }
            }
        }
    );
}

function editar(req, res) {
    const data = req.body;
    const id = req.params['id'];
    const img = req.params['img'];

    // console.log('img: ', img);

    if (req.files.imagen) {

        if (img || img !== null || img !== undefined) {
            fs.unlink('./uploads/productos/' + img, (err) => {
                if (err) {
                    // throw err;
                    console.log(err);
                }
            });
        }


        const imagen_path = req.files.imagen.path;
        const name = imagen_path.split('/');
        const imagen_name = name[2];

        // console.log('imagen_name', imagen_name)



        Producto.findByIdAndUpdate({ _id: id }, {
            nombre: data.nombre,
            descripcion: data.descripcion,
            imagen: imagen_name,
            precio_compra: data.precio_compra,
            precio_venta: data.precio_venta,
            stock: data.stock,
            idcategoria: data.idcategoria,
            puntos: data.puntos
        }, (err, producto_edit) => {
            if (err) {
                res.status(500).send({ message: 'Error en el Servidor' });
            } else {
                if (producto_edit) {
                    res.status(200).send({ producto: producto_edit })
                } else {
                    res.status(403).send({ message: 'El producto no pudo ser actualizado.' });
                }
            }
        });
    } else {

        Producto.findByIdAndUpdate({ _id: id }, {
            nombre: data.nombre,
            descripcion: data.descripcion,
            precio_compra: data.precio_compra,
            precio_venta: data.precio_venta,
            stock: data.stock,
            idcategoria: data.idcategoria,
            puntos: data.puntos
        }, (err, producto_edit) => {
            if (err) {
                res.status(500).send({ message: 'Error en el Servidor' });
            } else {
                if (producto_edit) {
                    res.status(200).send({ producto: producto_edit })
                } else {
                    res.status(403).send({ message: 'El producto no pudo ser actualizado.' });
                }
            }
        });
    }
}

function obtener_producto(req, res) {
    const id = req.params['id'];

    Producto.findOne({ _id: id }, (err, producto_data) => {
        if (err) {
            res.status(500).send({ message: 'Error en el Servidor' });
        } else {
            if (producto_data) {
                res.status(200).send({ producto: producto_data })
            } else {
                res.status(403).send({ message: 'No existe el producto.' });
            }
        }
    });
}

function eliminar(req, res) {
    const id = req.params['id'];

    Producto.findByIdAndRemove({ _id: id }, (err, producto_delete) => {
        if (err) {
            res.status(500).send({ message: 'Error en el Servidor' });
        } else {
            if (producto_delete) {
                fs.unlink('./uploads/productos/' + producto_delete.imagen, (err) => {
                    if (err) throw err;
                });
                res.status(200).send({ producto: producto_delete })
            } else {
                res.status(403).send({ message: 'No se pudo eliminar el producto.' });
            }
        }
    })
}

function update_stock(req, res) {
    const data = req.body;
    const id = req.params['id'];

    Producto.findById(id, (err, producto_data) => {
        if (producto_data) {
            Producto.findByIdAndUpdate(id, { stock: parseInt(producto_data.stock) + parseInt(data.stock) }, (err, producto_edit) => {
                if (producto_edit) {
                    res.status(200).send({ producto: producto_edit })
                }
            });
        } else {
            res.status(500).send(err);
        }
    })
}

function get_img(req, res) {
    const img = req.params['img'];

    if (img != 'null') {
        let path_img = './uploads/productos/' + img;
        res.status(200).sendFile(path.resolve(path_img));
    } else {
        let path_img = './uploads/productos/no_image.png';
        res.status(200).sendFile(path.resolve(path_img));
    }
}

module.exports = {
    registrar,
    listar,
    editar,
    obtener_producto,
    eliminar,
    update_stock,
    get_img
}