const { Router } = require('express');
const pool = require('../configDB');
const { getUsuarios, getUsuario, createUsuario, updateUsuario, deleteUsuario } = require('../controllers/usuarios.controlles');

const router = Router();

router.get('/usuarios', getUsuarios);

router.get('/usuarios/:id', getUsuario);

router.post('/usuarios', createUsuario);

router.put('/usuarios/:id', updateUsuario);

router.delete('/usuarios/:id', deleteUsuario);

module.exports = router;