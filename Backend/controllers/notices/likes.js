// Importamos la query de likesQueries.js.
const likesQueries = require('../../db/noticesQueries/likesQueries');

// Creamos la funcion de likes.
const likes = async (req, res, next) => {
    try {
        // Obtenemos el id de la noticia y el id del usuario.
        const { idNotice } = req.params;

        const { idUser } = req;

        const { vote } = req.body;

        // Comprobamos que los valores esten correctos antes de la llamada a la query.
        if (vote === true) {
            // Llamamos a la funcion likeQueries.
            await likesQueries(idNotice, idUser, vote);

            res.send({ status: 'ok', message: 'like añadido' });
        } else if (vote === false) {
            // Llamamos a la funcion likeQueries.
            await likesQueries(idNotice, idUser, vote);

            res.send({ status: 'ok', message: 'Dislike añadido' });
        }
    } catch (err) {
        next(err);
    }
};

// Exportamos la funcion de likes.
module.exports = likes;
