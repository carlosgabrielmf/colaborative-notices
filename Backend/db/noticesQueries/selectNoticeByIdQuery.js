const getConnection = require('../getConnections');

const { generateError } = require('../../helpers');

const selectNotice = async (idNotice) => {
    let connection;

    try {
        connection = await getConnection();

        // Actualizamos la Noticia.
        const [notices] = await connection.query(
            `
                SELECT N.id, N.idUser, N.title, N.intro, N.text, N.image, N.theme, N.createdAt, SUM(IFNULL(L.vote = 1, 0)) AS likes, SUM(IFNULL(L.vote = 0, 0)) AS dislikes 
                FROM notices N
                LEFT JOIN likes L
                ON (N.id = L.idNotice)
                WHERE N.id = ?
                GROUP BY N.id
                `,
            [idNotice]
        );

        if (notices.length < 1) {
            throw generateError('Esta noticia no existe', 404);
        }

        return notices;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectNotice;
