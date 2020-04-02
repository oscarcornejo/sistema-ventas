const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'monoDigital#1';

exports.createToken = function(user) {
    const payload = {
        sub: user._id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        email: user.email,
        telefono: user.telefono,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix(),
    }
    return jwt.encode(payload, secret);
}