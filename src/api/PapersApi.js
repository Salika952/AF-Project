const express = require('express');
const router = express.Router();
const controller = require('../controller/PapersController');

module.exports = function () {
    router.get('/', controller.getAllPapers);
    router.get('/:id', controller.getSpecificPaper);
    router.post('/',controller.addPaper);
    router.put('/:id',controller.editPaper);
    router.delete('/:id',controller.deletePaper);
    return router;
}