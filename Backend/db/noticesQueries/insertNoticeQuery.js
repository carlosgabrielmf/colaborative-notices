const getConnection = require('../getConnections');

const inserUserQuery = async (
    idUser,
    title,
    intro,
    text,
    image = '',
    theme
) => {
    let connection;

    try {
        connection = await getConnection();

        // Creamos la noticia.
        await connection.query(
            `INSERT INTO notices (idUser, title, intro, text, image, theme, createdAt) 
            VALUES (?,?,?,?,?,?,?)`,
            [idUser, title, intro, text, image, theme, new Date()]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = inserUserQuery;
