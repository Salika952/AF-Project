const ProposalController = require('../schemas/Proposals');

const addProposals = async (req, res) => {
    if (req.body) {
        const workshop = new ProposalController(req.body);
        await workshop.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllProposals = async (req, res) => {

    await ProposalController.find()
        .populate('propo_author', 'user_name user_telephone')
        .then(data => {
            res.status(200).send({ data: data });
            console.log(data);
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getSpecificProposal = async (req, res) => {
    if (req.params && req.params.id) {
        await ProposalController.findById(req.params.id)
            .populate('propo_author', 'user_name user_telephone')

            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const editProposals = async (req, res) => {
    if (req.params && req.params.id) {

        const updated = req.body;

        await ProposalController.findByIdAndUpdate(req.params.id,updated)
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const deleteProposals = async (req, res) => {
    if (req.params && req.params.id) {

        await ProposalController.findByIdAndDelete(req.params.id)
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}


module.exports = {
    addProposals,
    getAllProposals,
    getSpecificProposal,
    editProposals,
    deleteProposals
};
