const express = require('express');
const router = express.Router();
const controller = require('../controller/UserController');

module.exports = function () {
    router.get('/', controller.getAllUsers);
    router.get('/:id', controller.getSpecificUser);
    router.post('/register', controller.addUsers );
    router.put('/update/:id',controller.editUsers);
    router.delete('/:id',controller.deleteUsers);
    router.post('/login',controller.loginUser);
    router.post('/admin_reg',controller.adminAddUsers);
    return router;
}