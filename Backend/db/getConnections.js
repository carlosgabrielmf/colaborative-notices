require('dotenv').config();

const mysql = require('mysql2/promise');

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env;

// Pool de conexiones.
let pool;

// Funcion que retorna una conexion libre.
const getConnection = async () => {
    try {
        // Si no hay un grupo de conexiones lo creamos.
        if (!pool) {
            pool = mysql.createPool({
                connectionLimit: 10,
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
                database: MYSQL_DB,
                timezone: 'Z',
            });
        }

        // Retornamos una conexion libre.
        return await pool.getConnection();
    } catch {
        throw new Error(
            'Error al conectar con MySQL o base de datos no encontrada'
        );
    }
};

// Exportamos la funcion.
module.exports = getConnection;
