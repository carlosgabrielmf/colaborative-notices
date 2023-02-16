// Conectamos con la base de datos y requerimos los modulos necesarios.
const getConnection = require('../getConnections');

// Creamos la funcion que añadira un like a una noticia.
const likesQueries = async (idNotice, idUser, vote) => {
    let connection;

    try {
        connection = await getConnection();

        // Comprobamos si la noticia que la persona quiere votar existe.
        const [likes] = await connection.query(
            `SELECT  id, vote FROM likes WHERE idUser = ? AND idNotice = ?`,
            [idUser, idNotice]
        );

        // Si el usuario no a dado Like o Dislike, lo agregamos
        if (likes.length < 1) {
            await connection.query(
                `
                INSERT INTO likes (idNotice, idUser, vote, createdAt) 
                VALUES (?, ?, ?, ?)`,
                [idNotice, idUser, vote, new Date()]
            );
        }
        // Si el usuario ya a dado like y vuelve a dar like, se elimina el like.
        else if (likes[0].vote && vote) {
            await connection.query(
                `DELETE FROM likes WHERE idNotice = ? AND idUser = ?`,
                [idNotice, idUser]
            );
        }
        // Si el usuario ya a dado dislike y vuelve a dar dislike, se elimina el dislike.
        else if (!likes[0].vote && !vote) {
            await connection.query(
                `DELETE FROM likes WHERE idNotice = ? AND idUser = ?`,
                [idNotice, idUser]
            );
        }
        // En cualquier otro caso se actualiza.
        else {
            await connection.query(
                `UPDATE likes SET vote = ? WHERE idNotice = ? AND idUser = ? `,
                [vote, idNotice, idUser]
            );
        }
    } finally {
        if (connection) connection.release();
    }
};

// Exportamos la funcion para poder usarla en otro fichero.
module.exports = likesQueries;
