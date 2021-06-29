const ResearchEvents = require('../schemas/ResearchEvents');

const addResearchEvents = async (req, res) => {
    if (req.body) {
        const researchEvent = new ResearchEvents(req.body);
        await researchEvent.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllResearchEvents = async (req, res) => {

    await ResearchEvents.find()
        .populate('res_presenters', 'user_name user_email')
        .populate('res_papers', 'paper_content paper_sign')
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}





const getSpecificResearchEvent = async (req, res) => {
    if (req.params && req.params.id) {
        await ResearchEvents.findById(req.params.id)
            .populate('res_presenters', 'user_name user_telephone')
            .populate('res_papers', 'paper_content paper_sign')
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const editResearchEvents = async (req, res) => {
    if (req.params && req.params.id) {

        const updated = req.body;

        await ResearchEvents.findByIdAndUpdate(req.params.id,updated)
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const deleteResearchEvents = async (req, res) => {
    if (req.params && req.params.id) {

        await ResearchEvents.findByIdAndDelete(req.params.id)
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAcceptedResearchEvent = async (req, res) => {

    await ResearchEvents.find({res_validation:true})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}


module.exports = {
    addResearchEvents,
    getAllResearchEvents,
    getSpecificResearchEvent,
    editResearchEvents,
    deleteResearchEvents,
    getAcceptedResearchEvent
};