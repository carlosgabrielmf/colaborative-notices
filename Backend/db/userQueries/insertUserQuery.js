const bcrypt = require('bcrypt');
const getConnection = require('../getConnections');

const { generateError } = require('../../helpers');

const insertUserQuery = async (
    name,
    email,
    password,
    biography,
    image = ''
) => {
    let connection;

    try {
        connection = await getConnection();

        // Obtenemos un array de usuarios para verificar su email.
        const [users] = await connection.query(
            `SELECT id FROM users WHERE email = ?`,
            [email]
        );

        // Si el array users > 0 quiere decir que ya hay alguien registrado con ese email.
        if (users.length > 0) {
            throw generateError(
                'Ya existe un usuario registrado con este Email',
                409
            );
        }

        // Encriptamos la contraseña.
        const hashPassword = await bcrypt.hash(password, 10);

        // Creamos el usuario.
        const [newUser] = await connection.query(
            `INSERT INTO users (name, email, password, biography, image, createdAt) VALUES (?, ?, ?, ?, ?, ?)`,
            [name, email, hashPassword, biography, image, new Date()]
        );

        return newUser.insertId;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertUserQuery;
