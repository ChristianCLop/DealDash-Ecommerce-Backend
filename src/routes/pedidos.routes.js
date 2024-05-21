const { Router } = require('express');
const pool = require('../configDB');
const { getPedidos, getPedido, createPedido, updatePedido, deletePedido, getPedidosUsu, getPedidosMio } = require('../controllers/pedidos.controlles');

const router = Router();

router.get('/pedidos', getPedidos);

router.get('/pedidos/:id', getPedido);

router.get('/pedidosUsu/:id', getPedidosUsu);

router.get('/pedidosMio/:id', getPedidosMio);

router.post('/pedidos', createPedido);

router.put('/pedidos/:id', updatePedido);

router.delete('/pedidos/:id', deletePedido);

module.exports = router; 