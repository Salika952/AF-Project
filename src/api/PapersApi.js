const express = require('express');
const router = express.Router();
const controller = require('../controller/PapersController');
const upload = require('../middleware/uploard')

module.exports = function () {
    router.get('/', controller.getAllPapers);
    router.get('/:id', controller.getSpecificPaper);
    router.post('/',upload.single('pdf'),controller.addPaper);
    router.put('/:id',controller.editPaper);
    router.delete('/:id',controller.deletePaper);
    router.post('/mail',controller.MailSend);
    router.get('/download',controller.downloadPaper);
    return router;
}