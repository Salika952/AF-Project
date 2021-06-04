const express = require('express');
const router = express.Router();
const controller = require('../schemas/Conferences');

module.exports = function () {
    router.get('/', controller.getAllConferences);
    router.get('/:id', controller.getSpecificConference);
    router.post('/',controller.addConference );
    router.put('/:id',controller.editConference);
    router.delete('/:id',controller.deleteConference);
    return router;
}