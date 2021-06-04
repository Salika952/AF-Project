const express = require('express');
const router = express.Router();
const controller = require('../schemas/Notification');

module.exports = function () {
    router.get('/', controller.getAllNotification);
    router.get('/:id', controller.getSpecificNotification);
    router.post('/',controller.addNotification );
    router.put('/:id',controller.editNotification);
    router.delete('/:id',controller.deleteNotification);
    return router;
}