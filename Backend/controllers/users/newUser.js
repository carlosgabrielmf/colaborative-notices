const insertUserQuery = require('../../db/userQueries/insertUserQuery');
const { generateError, createPath } = require('../../helpers');
const path = require('path');
const sharp = require('sharp');
const { nanoid } = require('nanoid');

const newUser = async (req, res, next) => {
    try {
        // Obtenemos los campos del body.
        const { name, email, password, biography } = req.body;

        // Si faltan campos lanzamos un error.
        if (!name || !email || !password) {
            throw generateError('Debes rellenar los campos requeridos.', 400);
        }

        // Nombre de imagen en el disco.
        let imgName;

        // Si la imagen exsite la guardamos.
        if (req.files && req.files.image) {
            // Creamos una ruta absoluta al directorio de descargas.
            const uploadsDir = path.join(__dirname, '../../uploads');

            // Creamos el directorio si aun no existe.
            await createPath(uploadsDir);

            // Procesamos la imagen y la convertimos en un objeto de tipo "Sharp".
            const sharpImg = sharp(req.files.image.data);

            // Le asignamos un valor especifico a la imagen.
            sharpImg.resize(500);

            // Nombre de la imagen.
            imgName = `${nanoid(10)}.jpg`;

            // Ruta absoluta de imagen.
            const imgPath = path.join(uploadsDir, imgName);

            // Guardamos la imagen en el directorio de descargas.
            await sharpImg.toFile(imgPath);
        }

        // Creamos un usuario en la base de datos y obtenemos el id.
        await insertUserQuery(name, email, password, biography, imgName);

        res.send({
            status: 'ok',
            message: `Usuario creado correctamente.`,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = newUser;
