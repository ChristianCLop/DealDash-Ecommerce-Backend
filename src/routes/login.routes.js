const { Router } = require('express');
const pool = require('../configDB');
const { loginUsuario, logoutUsuario } = require('../controllers/login.controlles');

const router = Router();

router.post('/login', loginUsuario);

router.post('/logout', logoutUsuario);

module.exports = router;