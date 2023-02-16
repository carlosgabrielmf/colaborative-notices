const selectAllNoticesQuery = require('../../db/noticesQueries/selectAllNoticesQuery');

const listNotices = async (req, res, next) => {
    try {
        const { keyword } = req.query;

        const { idUser } = req;

        const notices = await selectAllNoticesQuery(idUser, keyword);

        // Si notice es menor que 1 quiere decir que no hay noticia hasta el momento o que no arrojo ninguna busqueda.
        if (notices < 1) {
            res.send({
                status: 'error',
                message: 'No hay Noticias.',
            });
        } else {
            res.send({
                status: 'ok',
                data: {
                    notices,
                },
            });
        }
    } catch (err) {
        next(err);
    }
};

module.exports = listNotices;
