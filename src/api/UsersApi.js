const express = require('express');
const router = express.Router();
const controller = require('../controller/UserController');
const auth =require('../middleware/auth/auth');
const auth1 =require('../middleware/auth/authentication');

module.exports = function () {
    router.get('/', auth,controller.getSpecificUser);
    router.post('/admin_register',controller.adminAddUsers );
    router.post('/login',controller.loginUser );
    router.post('/register',controller.addUsers );
    router.post('/activate',controller.UserActiveEmail );
    router.put('/update',auth,controller.updateProfile);
    router.delete('/delete/:id',auth,controller.deleteUsers);
    router.post('/forgot_password',controller.forgotPassword);
    router.post('/reset_password',auth1,controller.resetPassword);
    router.get('/all',auth,controller.getUserAll);
    router.put('/admin_update/:id',controller.updateAdminUser);
    router.get('/:id', controller.getSpecificAdminUsers);
    return router;
}