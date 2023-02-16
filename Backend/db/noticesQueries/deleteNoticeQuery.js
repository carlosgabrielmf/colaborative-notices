const getConnection = require('../getConnections');

const deleteNoticeQuery = async (idNotice) => {
    let connection;
    try {
        connection = await getConnection();

        // Eliminamos la noticia.
        await connection.query(`DELETE FROM notices WHERE id = ?`, [idNotice]);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deleteNoticeQuery;
