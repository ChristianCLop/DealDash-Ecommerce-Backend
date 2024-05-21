const { Router } = require('express');
const { cancelPayment, captureOrder, createOrder } = require('../controllers/payment.controllers');

const router = Router();

router.post('/create-order', createOrder);

router.get('/capture-order', captureOrder);

router.get('/cancel-payment', cancelPayment);

module.exports = router;