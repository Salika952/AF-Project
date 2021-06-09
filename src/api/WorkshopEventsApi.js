const express = require('express');
const router = express.Router();
 const controller = require('../controller/WorkshopEventsController');

module.exports = function () {
    router.get('/', controller.getAllWorkshopEvents);
    router.get('/:id', controller.getSpecificWorkshopEvent);
    router.post('/',controller.addWorkshopEvents);
    router.put('/:id',controller.editWorkshopEvents);
    router.delete('/:id',controller.deleteWorkshopEvents);
    return router;
}
