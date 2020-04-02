const User = require('../models/user');
const bcrypt = require('bcrypt-nodejs');

const jwt = require('../helpers/jwt');

function registrar(req, res) {
    const params = req.body;
    const user = new User();

    if (params.password) {
        bcrypt.hash(params.password, null, null, function(err, hash) {
            if (hash) {
                user.password = hash;
                user.nombres = params.nombres;
                user.apellidos = params.apellidos;
                user.email = params.email;
                user.telefono = params.telefono;
                user.role = params.role;

                user.save((err, user_save) => {
                    if (err) {
                        res.status(500).send({ error: 'El usuario no pudo ser Registrado' });
                    } else {
                        res.status(200).send({ user: user_save })
                    }
                })
            }
        });
    } else {
        res.status(403).send({ error: 'Debe ingresar una contraseña' });
    }
}

function login(req, res) {
    const data = req.body;
    User.findOne({ email: data.email }, (err, user_data) => {
        if (err) {
            res.status(500).send({ message: 'Error en el Servidor' });
        } else {
            if (user_data) {
                bcrypt.compare(data.password, user_data.password, function(err, check) {
                    if (check) {
                        if (data.getToken) {
                            res.status(200).send({
                                jwt: jwt.createToken(user_data),
                                user: user_data
                            });
                        } else {
                            res.status(200).send({
                                user: user_data,
                                message: 'no token',
                                jwt: jwt.createToken(user_data),
                            });
                        }
                    } else {
                        res.status(403).send({ message: 'El Email o Contraseña no coinciden.' });
                    }
                });
            } else {
                res.status(403).send({ message: 'El Email no existe' });
            }
        }
    });
}

module.exports = {
    registrar,
    login
}