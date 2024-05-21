const pool = require('../configDB');
const bcrypt = require('bcrypt');

const getUsuarios = async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM "Usuarios"');

        console.log("Mostrando usuarios");
        res.json(result.rows);

    } catch (error) {
        next(error);
    }
};

const getUsuario = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await pool.query('SELECT * FROM "Usuarios" WHERE id_usu = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            })
        }

        console.log(id);
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
};

const createUsuario = async (req, res, next) => {
    try {
        const { ced_usu, nom_usu, ape_usu, cor_usu, cel_usu, ima_usu, con_usu, conf_con_usu } = req.body;

        const result = await pool.query('INSERT INTO "Usuarios" (ced_usu, nom_usu, ape_usu, cor_usu, cel_usu, ima_usu, con_usu, conf_con_usu) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *', [ced_usu, nom_usu, ape_usu, cor_usu, cel_usu, ima_usu, con_usu, conf_con_usu]);

        console.log("Se añadio un usuario");
        console.log(result);

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const updateUsuario = async (req, res, next) => {
    try {
        const { id } = req.params;

        const { ced_usu, nom_usu, ape_usu, cor_usu, cel_usu, ima_usu, con_usu, conf_con_usu } = req.body

        const result = await pool.query('UPDATE "Usuarios" SET ced_usu = $1, nom_usu = $2, ape_usu = $3, cor_usu = $4, cel_usu = $5, ima_usu = $6, con_usu = $7, conf_con_usu = $8 WHERE id_usu = $9', [ced_usu, nom_usu, ape_usu, cor_usu, cel_usu, ima_usu, con_usu, conf_con_usu, id]);

        console.log(result.rows[0]);
        res.send('Se actualizo correctamente');
    } catch (error) {
        next(error);
    }
};

const deleteUsuario = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await pool.query('DELETE FROM "Usuarios" WHERE id_usu = $1', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'No se encontro el usuario' });
        }

        res.send('Se elimino correctamente');
    } catch (error) {
        next(error);
    }
}
module.exports = {
    getUsuarios,
    getUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario
}