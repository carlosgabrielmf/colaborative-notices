const selectUserByIdQuery = require('../../db/userQueries/selectUserByIdQuery');

const getUser = async (req, res, next) => {
    try {
        // Obtenemos la información del usuario.
        const user = await selectUserByIdQuery(req.idUser);

        res.send({
            status: 'ok',
            data: {
                user,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = getUser;
