const getConnection = require('../db/getConnections');
const { generateError } = require('../helpers');

const noticeExists = async (req, res, next) => {
    let connection;
    try {
        connection = await getConnection();

        const { idNotice } = req.params;

        const [notices] = await connection.query(
            `SELECT id FROM notices WHERE id = ?`,
            [idNotice]
        );

        if (notices.length < 1) {
            throw generateError('La noticia no existe', 404);
        }
        // Saltamos al siguiente controlador.
        next();
    } catch (err) {
        next(err);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = noticeExists;
