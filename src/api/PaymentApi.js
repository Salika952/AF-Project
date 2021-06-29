const express = require('express');
const router = express.Router();
const controller = require('../controller/PaymentController');

module.exports = function () {
    router.get('/', controller.getAllPayment);
    router.get('/amount/:id', controller.calculateAmount);
    router.get('/:id', controller.getSpecificPayment);
    router.put('/:id',controller.editPayment);
    router.delete('/:id', controller.deletePayment);
    router.post('/',controller.addPayment);
    router.post('/mail',controller.MailSend);

    return router;
}