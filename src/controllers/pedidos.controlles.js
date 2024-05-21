const pool = require('../configDB');

const getPedidos = async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM "Pedidos"');

        console.log("Mostrando pedidos");
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
};

const getPedidosUsu = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await pool.query('SELECT * FROM "Pedidos" WHERE id_usu = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Productos no encontrados'
            });
        }

        console.log(id)
        res.json(result.rows);
    } catch (error) {
        console.log(error)
    }
};

const getPedidosMio = async (req, res, next) => {
    try {
        const { id } = req.params;

        const productosResult = await pool.query('SELECT id_pro FROM "Productos" WHERE id_usu = $1', [id]);

        if (productosResult.rows.length === 0) {
            return res.status(404).json({
                message: 'No se encontraron productos para el usuario'
            });
        }

        const allPedidos = [];

        for (const producto of productosResult.rows) {
            const idPro = producto.id_pro;

            const pedidosResult = await pool.query('SELECT * FROM "Pedidos" WHERE id_pro = $1 AND est_ped = \'Procesando\'', [idPro]);

            if (pedidosResult.rows.length > 0) {
                allPedidos.push(...pedidosResult.rows);
            }
        }

        if (allPedidos.length === 0) {
            return res.status(404).json({
                message: 'Pedidos no encontrados para los productos del usuario'
            });
        }

        res.json(allPedidos);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const getPedido = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await pool.query('SELECT * FROM "Pedidos" WHERE id_ped = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Pedido no encontrado'
            })
        }

        console.log(id);
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
};

const createPedido = async (req, res, next) => {
    try {
        const { id_pro, id_usu } = req.body;

        const nomUsuResult = await pool.query('SELECT nom_usu FROM "Usuarios" WHERE id_usu = $1', [id_usu]);
        const nomProResult = await pool.query('SELECT nom_pro FROM "Productos" WHERE id_pro = $1', [id_pro]);

        const nomUsu = nomUsuResult.rows[0].nom_usu;
        const nomPro = nomProResult.rows[0].nom_pro;

        const result = await pool.query('INSERT INTO "Pedidos" (id_pro, id_usu, est_ped, nom_usu, nom_pro) VALUES ($1,$2,$3,$4,$5) RETURNING *', [id_pro, id_usu, "Procesando", nomUsu, nomPro]);

        console.log("Se añadio un pedido");

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al crear el producto:', error);
        next(error);
    }
};

const updatePedido = async (req, res, next) => {
    try {
        const { id } = req.params;

        const { est_ped } = req.body;

        const result = await pool.query('UPDATE "Pedidos" SET est_ped = $1 WHERE id_ped = $2', [est_ped, id]);

        console.log(result.rows[0]);
        res.send('Se actualizo correctamente');
    } catch (error) {
        next(error);
    }
};

const deletePedido = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await pool.query('DELETE FROM "Pedidos" WHERE id_ped = $1', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'No se encontro el pedido' });
        }

        res.send('Se elimino correctamente');
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getPedidos,
    getPedidosUsu,
    getPedidosMio,
    getPedido,
    createPedido,
    updatePedido,
    deletePedido
}