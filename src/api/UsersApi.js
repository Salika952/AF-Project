const express = require('express');
const router = express.Router();
const controller = require('../controller/UserController');

module.exports = function () {
    // router.get('/', controller.getAllUsers);
    // router.get('/:id', controller.getSpecificUser);
    router.post('/',controller.addUsers);
    // router.put('/:id',controller.editUsers);
    // router.delete('/:id',controller.deleteUsers);
    return router;
}