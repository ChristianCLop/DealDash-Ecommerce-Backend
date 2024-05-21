const { Router } = require('express');
const pool = require('../configDB');
const { getProductos, getProducto, getProductosPorUsuario, createProducto, updateProducto, deleteProducto, getProductosNoUsuario, updateProductoCal } = require('../controllers/productos.controlles');

const router = Router();

router.get('/productos', getProductos);

router.get('/productos/:id', getProducto);

router.get('/productosU/:id', getProductosPorUsuario);

router.get('/productosNo/:id', getProductosNoUsuario);

router.post('/productos', createProducto);

router.put('/productos/:id', updateProducto);

router.put('/productosCal/:id', updateProductoCal);

router.delete('/productos/:id', deleteProducto);

module.exports = router;