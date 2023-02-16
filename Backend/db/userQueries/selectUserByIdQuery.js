const getConnection = require('../getConnections');

const { generateError } = require('../../helpers');

const selectUserById = async (idUser) => {
    let connection;

    try {
        connection = await getConnection();

        // Buscamos al usuario en la base de datos.
        const [user] = await connection.query(
            `SELECT id, name, email, biography, image FROM users WHERE id = ?`,
            [idUser]
        );

        if (user.length < 1) {
            throw generateError('Usuario no encontrado.', 404);
        }

        return user;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectUserById;
