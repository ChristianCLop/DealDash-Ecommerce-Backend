const pool = require('../configDB');
const bcrypt = require('bcrypt');

const loginUsuario = async (req, res, next) => {
    try {
        const { cor_usu, con_usu } = req.body;

        // Busca al usuario por su correo electrónico y contraseña
        const result = await pool.query('SELECT * FROM "Usuarios" WHERE cor_usu = $1 AND con_usu = $2', [cor_usu, con_usu]);

        if (result.rows.length === 0) {
            return res.status(401).json({
                message: 'Credenciales inválidas'
            });
        }

        const usuario = result.rows[0];

        req.session.id = usuario.id_usu;
        
        res.json({
            message: 'Inicio de sesión exitoso',
            usuario: {
                id_usu: usuario.id_usu,
                nom_usu: usuario.nom_usu,
                cor_usu: usuario.cor_usu                
            },
            message: req.session.id
        });

    } catch (error) {
        next(error);
    }
};

const logoutUsuario = (req, res) => {
    req.logout();
    res.json({ message: 'Sesión cerrada exitosamente' });
};

module.exports = {
    loginUsuario,
    logoutUsuario
}