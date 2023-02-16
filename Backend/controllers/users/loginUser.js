const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const loginUserEmail = require('../../db/userQueries/loginUserEmailQuery');

const { generateError } = require('../../helpers');

const loginUser = async (req, res, next) => {
    try {
        // Obtenemos el email y la contraseña.
        const { email, password } = req.body;

        // Si no existe alguno de esas dos variables lanzamos un error.
        if (!email || !password) {
            throw generateError('Faltan datos.', 400);
        }

        // Obtenemos al usuario con el email del body.
        const user = await loginUserEmail(email);

        // Comprobamos si las contraseñas coinciden.
        const validatorPassword = await bcrypt.compare(password, user.password);

        // Si el valor es falso no coinciden las contraseñas.
        if (!validatorPassword) {
            console.log(validatorPassword);
            throw generateError('Clave incorrecta.', 401);
        }

        // Guardamos informacion en el token.
        const infTkn = { id: user.id };

        const token = jwt.sign(infTkn, process.env.SECRET, {
            expiresIn: '1d',
        });

        // Enviamos mensaje de proceso correcto.
        res.send({
            status: 'ok',
            data: {
                token,
                infTkn,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = loginUser;
