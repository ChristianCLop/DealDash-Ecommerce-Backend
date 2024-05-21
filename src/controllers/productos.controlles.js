const pool = require('../configDB');

const getProductos = async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM "Productos"');

        console.log("Mostrando productos");
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
};

const getProducto = async (req, res, next) => {
    try {
        const { id } = req.params.id;

        const result = await pool.query('SELECT * FROM "Productos" WHERE id_pro = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Producto no encontrado'
            })
        }

        console.log(id);
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
};

const getProductosPorUsuario = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await pool.query('SELECT * FROM "Productos" WHERE id_usu = $1 AND sto_pro > 0', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Productos no encontrados'
            });
        }

        console.log(id)
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
};

const getProductosNoUsuario = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nom_pro, cat_pro } = req.query;

        let query = 'SELECT * FROM "Productos" WHERE id_usu != $1 AND sto_pro > 0';

        const params = [id];

        if (nom_pro) {
            query += ' AND LOWER(nom_pro) LIKE LOWER($2)';
            params.push(`%${nom_pro}`);
        }

        if (cat_pro) {
            const index = nom_pro ? 3 : 2;
            query += ` AND cat_pro = $${index}`;
            params.push(cat_pro);
        }

        const result = await pool.query(query, params);

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'No se encontraron productos'
            });
        }

        res.json(result.rows);
    } catch (error) {
        next(error);
    }
};

const createProducto = async (req, res, next) => {
    try {

        if (!req.session || !req.session.id) {
            return res.status(401).json({ message: 'Usuario no autenticado' });
        }

        const { id_usu, cat_pro, nom_pro, des_pro, ima_pro, sto_pro, cos_pro, desc_pro } = req.body;

        if (desc_pro > 0) {
            const descuento = (cos_pro * desc_pro) / 100;
            const cos_fin_pro = cos_pro - descuento;

            const cal_pro = 5;

            const result = await pool.query('INSERT INTO "Productos" (id_usu, cat_pro, nom_pro, des_pro, ima_pro, sto_pro, cos_pro, desc_pro, cos_fin_pro, cal_pro) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *', [id_usu, cat_pro, nom_pro, des_pro, ima_pro, sto_pro, cos_pro, desc_pro, cos_fin_pro, cal_pro]);

            console.log("Se añadio un producto");
            console.log(result);

            res.json(result.rows[0]);

        } else {
            const cos_fin_pro = cos_pro;

            const cal_pro = 5;

            const result = await pool.query('INSERT INTO "Productos" (id_usu, cat_pro, nom_pro, des_pro, ima_pro, sto_pro, cos_pro, desc_pro, cos_fin_pro, cal_pro) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *', [id_usu, cat_pro, nom_pro, des_pro, ima_pro, sto_pro, cos_pro, desc_pro, cos_fin_pro, cal_pro]);

            console.log(result);

            res.json(result.rows[0]);

        }

    } catch (error) {
        console.error('Error al crear el producto:', error);
        next(error);
    }
};

const updateProducto = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { sto_pro } = req.body;

        const resultSelect = await pool.query('SELECT sto_pro FROM "Productos" WHERE id_pro = $1', [id]);
        const cantidadActual = resultSelect.rows[0].sto_pro;

        const nuevaCantidad = cantidadActual - sto_pro;

        const resultUpdate = await pool.query('UPDATE "Productos" SET sto_pro = $1 WHERE id_pro = $2', [nuevaCantidad, id]);

        console.log(resultUpdate.rows[0]);
        res.send('Se actualizó correctamente');
    } catch (error) {
        next(error);
    }
};

const updateProductoCal = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { cal_pro } = req.body;

        const result = await pool.query('SELECT cal_pro FROM "Productos" WHERE id_pro = $1', [id]);
        const calActual = result.rows[0].cal_pro;

        const nuevaCal = (calActual + cal_pro) / 2;

        const calUpdate = await pool.query('UPDATE "Productos" SET cal_pro = $1 WHERE id_pro = $2', [nuevaCal, id]);

        console.log(calUpdate.rows[0]);
    } catch (error) {
        next(error);
    }
};

const deleteProducto = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await pool.query('DELETE FROM "Productos" WHERE id_pro = $1', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'No se encontro el producto' });
        }

        res.send('Se elimino correctamente');
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProductos,
    getProducto,
    getProductosPorUsuario,
    getProductosNoUsuario,
    createProducto,
    updateProducto,
    updateProductoCal,
    deleteProducto,
}