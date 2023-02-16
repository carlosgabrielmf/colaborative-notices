const getConnection = require('../getConnections');

const { generateError } = require('../../helpers');

const loginUserEmail = async (email) => {
    let connection;

    try {
        connection = await getConnection();

        // Buscamos en la base de datos un usuario con ese Email.
        const [users] = await connection.query(
            `SELECT id, password FROM users WHERE email = ?`,
            [email]
        );

        // Si se cumple esta condicion quiere decir que no existe
        // Ningun usuario con ese Email.
        if (users.length < 1) {
            throw generateError(
                'No hay usuario registrado con este Email.',
                404
            );
        }

        // Retornamos el usuario.
        return users[0];
    } finally {
        if (connection) connection.release();
    }
};

module.exports = loginUserEmail;
