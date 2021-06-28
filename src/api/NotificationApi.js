const express = require('express');
const router = express.Router();
const controller = require('../controller/NotificationController');
const auth = require('../middleware/auth/auth')

module.exports = function () {
    router.get('/:id', controller.getSpecificNotification);
    router.post('/create_notify',controller.createNotification );
    return router;
}