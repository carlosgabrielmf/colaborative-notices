const path = require('path');
const sharp = require('sharp');
const { nanoid } = require('nanoid');
const insertNoticeQuery = require('../../db/noticesQueries/insertNoticeQuery');

const { generateError, createPath } = require('../../helpers');

const newNotice = async (req, res, next) => {
    try {
        // Obtenemos las variables que necesitamos confirmar.
        const { title, intro, text, theme } = req.body;

        // Verificamos la longitud del texto y si existe.
        if (!text || text.length > 150) {
            throw generateError(
                `Falta texto o tiene mas de 150 caracteres`,
                400
            );
        }

        // Verificamos que vengan todos los datos.
        if (!title || !theme) {
            throw generateError(`Faltan datos`, 400);
        }

        // Nombre de imagen en el disco.
        let imgName;

        // Si la imagen exsite la guardamos.
        if (req.files && req.files.image) {
            // Creamos una ruta absoluta al directorio de descargas.
            const uploadsDir = path.join(__dirname, '../../uploads');

            // Creamos el directorio si aun no existe.
            await createPath(uploadsDir);

            // Procesamos la imagen y la convertimos en un objeti de tipo "Sharp".
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

        // Agregamos la noticia.
        insertNoticeQuery(req.idUser, title, intro, text, imgName, theme);

        res.send({
            status: 'ok',
            message: 'Noticia creada',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = newNotice;
