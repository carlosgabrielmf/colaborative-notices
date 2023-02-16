const selectNotice = require('../../db/noticesQueries/selectNoticeByIdQuery');
const deleteNoticeQuery = require('../../db/noticesQueries/deleteNoticeQuery');

const { generateError, deleteImg } = require('../../helpers');

const deleteNotice = async (req, res, next) => {
    try {
        // Obtenemos el id de la noticia que se quiere eliminar.
        const { idNotice } = req.params;

        // Obtenemos los datos de la noticia.
        const notice = await selectNotice(idNotice);

        // Verificamos que sea la misma persona.
        if (req.idUser !== notice[0].idUser) {
            throw generateError(
                'No puedes eliminar una noticia de otra persona.',
                401
            );
        }

        // Si la noticia tiene una imagen la eliminamos.
        if (notice.image) {
            await deleteImg(notice.image);
        }

        await deleteNoticeQuery(idNotice);

        res.send({
            status: 'ok',
            message: 'Noticia eliminada',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = deleteNotice;
