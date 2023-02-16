const selectNoticeByIdQuery = require('../../db/noticesQueries/selectNoticeByIdQuery');

const getNotice = async (req, res, next) => {
    try {
        const { idNotice } = req.params;

        const notice = await selectNoticeByIdQuery(idNotice);

        res.send({
            status: 'ok',
            data: {
                notice,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = getNotice;
