const jwt = require('jsonwebtoken');

const { generateError } = require('../helpers');

const userAuth = (req, res, next) => {
    try {
        // Obtenemos el token en la cabecera.
        const { authorization } = req.headers;

        // Si no existe el token lanzamos error.
        if (!authorization) {
            throw generateError('Debes iniciar sesión', 401);
        }

        // Variable que almacenara inf. del token.
        let token;

        try {
            // Intentamos obtener inf. del token.
            token = jwt.verify(authorization, process.env.SECRET);
        } catch {
            throw generateError(
                'No tienes suficientes permisos, debes iniciar sesión.',
                401
            );
        }

        // Agregamos a la request.
        req.idUser = token.id;

        // Saltamos al siguiente controlador.
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = userAuth;
