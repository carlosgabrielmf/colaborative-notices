const fs = require('fs/promises');
const path = require('path');

const generateError = (message, status) => {
    const error = new Error(message);
    error.statusCode = status;
    return error;
};

const createPath = async (path) => {
    try {
        // Accedemos al directorio.
        await fs.access(path);
    } catch {
        // Si no logramos acceder, se crea la carpeta directamente.
        await fs.mkdir(path);
    }
};

const deleteImg = async (image) => {
    try {
        // Creamos la ruta a la imagen.
        const imgPath = path.join(__dirname, 'uploads', image);

        // Eliminamos la imagen.
        await fs.unlink(imgPath);
    } catch {
        throw new Error('Error al eliminar la imagen');
    }
};

module.exports = {
    generateError,
    createPath,
    deleteImg,
};
