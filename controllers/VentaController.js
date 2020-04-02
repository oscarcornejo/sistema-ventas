const Venta = require('../models/venta');
const DetalleVenta = require('../models/detalleVenta');
const Producto = require('../models/producto');

function registrar(req, res) {
    const data = req.body;
    const venta = new Venta();

    venta.idcliente = data.idcliente;
    venta.iduser = data.iduser;

    venta.save((err, venta_save) => {
        if (err) {
            res.status(500).send({ message: 'Error en el Servidor' })
        } else {
            if (venta_save) {
                // res.status(200).send({ categoria: categoria_save });
                let detalles = data.detalles;

                detalles.forEach((element, index) => {
                    const detalleVenta = new DetalleVenta();

                    detalleVenta.idproducto = element.idproducto;
                    detalleVenta.cantidad = element.cantidad;
                    detalleVenta.idventa = venta_save.id;

                    detalleVenta.save((err, detalle_save) => {
                        if (err) {
                            res.status(500).send({ message: 'Error en el Servidor' })
                        } else {
                            if (detalle_save) {
                                Producto.findById({ _id: element.idproducto }, (err, producto_data) => {
                                    if (producto_data) {
                                        Producto.findByIdAndUpdate({ _id: producto_data._id }, { stock: parseInt(producto_data.stock) - parseInt(element.cantidad) },
                                            (err, producto_edit) => {
                                                res.end();
                                            });
                                    } else {
                                        res.send('No se pudo encontrar el producto.');
                                    }
                                });
                            } else {
                                res.send('No se pudo registrar los datos de la venta.');
                            }
                        }
                    });
                });
            } else {
                // res.status(403).send({ message: 'No se pudo registrar los datos de la venta.' });
                res.send('No se pudo registrar los datos de la venta.');
            }
        }
    });
}

function datos_venta(req, res) {
    const id = req.params['id'];

    Venta.findById(id, (err, data_venta) => {
        if (data_venta) {
            DetalleVenta.find({ idventa: id }, (err, data_detalle) => {
                if (err) {
                    // console.log(err);
                    res.status(500).send({ message: 'Error en el Servidor' });
                } else {
                    if (data_detalle) {
                        res.status(200).send({
                            venta: data_venta,
                            detalles: data_detalle
                        })
                    }
                }
            })
        };
    })
}

module.exports = {
    registrar,
    datos_venta,
}