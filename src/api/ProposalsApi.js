const express = require('express');
const router = express.Router();
 const controller = require('../controller/ProposalController');

module.exports = function () {
    router.get('/', controller.getAllProposal);
    router.get('/:id', controller.getSpecificProposal);
    router.post('/',controller.addProposal );
    router.put('/:id',controller.editProposal);
    router.delete('/:id',controller.deleteProposal);
    router.patch('/add',controller.addProposalIdEvents);
    return router;
}
