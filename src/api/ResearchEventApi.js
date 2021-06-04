const express = require('express');
const router = express.Router();
const controller = require('../schemas/ResearchEvents');

module.exports = function () {
    router.get('/', controller.getAllResearchEvents);
    router.get('/:id', controller.getSpecificResearchEvent);
    router.post('/',controller.addResearchEvents );
    router.put('/:id',controller.editResearchEvents);
    router.delete('/:id',controller.deleteResearchEvents);
    return router;
}