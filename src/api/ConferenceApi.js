const express = require('express');
const router = express.Router();
const controller = require('../controller/ConferenceController');

module.exports = function () {
    router.get('/', controller.getAllConferences);
    router.get('/:id', controller.getSpecificConference);
    router.get('/conAccepted/add/add',controller.getACon);
    router.post('/',controller.addConference );
    router.put('/:id',controller.editConference);
    router.delete('/:id',controller.deleteConference);
    router.patch('/attend',controller.addAttendee);
    router.patch('/research',controller.addResearch);
    router.patch('/workshop',controller.addWorkshop);
    router.patch('/main',controller.MainUpdate);
    router.post('/mail',controller.MailSend);
    router.post('/join/mail/to',controller.JoinMail);
    return router;
}