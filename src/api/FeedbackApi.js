const express = require('express');
const router = express.Router();
const controller = require('../controller/feedback');

module.exports = function () {
     router.get('/', controller.calculateAmount);
    // router.get('/:id', controller.getSpecificFeedback);
    // router.post('/',controller.addFeedback );
    // router.put('/:id',controller.editFeedback);
    // router.delete('/:id',controller.deleteFeedback);
    return router;
}