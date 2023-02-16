const jwt = require('jsonwebtoken');

const { generateError } = require('../helpers');

const authUser = (req, res, next) => {
    try {
        // Obtenemos el token.
        const { authorization } = req.headers;

        if (authorization) {
            // Variable que contendrá la información del token (la parte del paylaod).
            let token;

            try {
                // Intentamos obtener la info del token.
                token = jwt.verify(authorization, process.env.SECRET);
            } catch {
                throw generateError('Token incorrecto', 401);
            }

            // Agregamos una nueva propiedad a la request.
            req.idUser = token.id;
        }

        // Saltamos al siguiente controlador.
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = authUser;
