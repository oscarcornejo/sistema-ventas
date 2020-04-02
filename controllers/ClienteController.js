const Cliente = require('../models/cliente');

function registrar(req, res) {
    const data = req.body;
    const cliente = new Cliente();

    cliente.nombre_comprador = data.nombre_comprador;
    cliente.nombre_empresa = data.nombre_empresa;
    cliente.rut = data.rut;
    cliente.direccion = data.direccion;
    cliente.telefono = data.telefono;
    cliente.correo = data.correo;
    cliente.comuna = data.comuna;
    cliente.ciudad = data.ciudad;
    cliente.pais = data.pais;
    cliente.puntos = 10;

    cliente.save((err, cliente_save) => {
        if (cliente_save) {
            res.status(200).send({ cliente: cliente_save });
        } else {
            res.status(500).send(err)
        }
    })
}

function editar(req, res) {
    const id = req.params['id'];
    const data = req.body;

    Cliente.findByIdAndUpdate(id, {
        nombre_comprador: data.nombre_comprador,
        nombre_empresa: data.nombre_empresa,
        rut: data.rut,
        direccion: data.direccion,
        telefono: data.telefono,
        correo: data.correo,
        comuna: data.comuna,
        ciudad: data.ciudad,
        pais: data.pais,
    }, (err, cliente_edit) => {
        if (cliente_edit) {
            res.status(200).send({ cliente: cliente_edit })
        } else {
            res.status(500).send(err);
        }
    });
}

function eliminar(req, res) {
    const id = req.params['id'];

    Cliente.findOneAndRemove(id, (err, cliente_delete) => {
        if (cliente_delete) {
            res.status(200).send({ cliente: cliente_delete })
        } else {
            res.status(500).send(err);
        }
    });
}

module.exports = {
    registrar,
    editar,
    eliminar
}