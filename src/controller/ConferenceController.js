const Conferences = require('../schemas/Conferences');

const addConference = async (req, res) => {
    if (req.body) {
        const course = new Conferences(req.body);
        await course.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllConferences = async (req, res) => {
    await Conferences.find().populate('researchList', 'topic presenterFee')
            .populate('workshopList', 'topic')
            //.populate('attendees', 'name role')
        .then(data => {
            res.status(200).send({ data: data });
            console.log(data);
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}





const getSpecificConference = async (req, res) => {
    if (req.params && req.params.id) {
        await Conferences.findById(req.params.id)
            .populate('researchList', '_id topic presenterFee')
            .populate('workshopList', '_id topic')
            .populate('attendees', '_id name role')
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const editConference = async (req, res) => {
    if (req.params && req.params.id) {

        const updated = req.body;

        await Conferences.findByIdAndUpdate(req.params.id,updated)
            .populate('researchList', '_id topic presenterFee')
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const deleteConference = async (req, res) => {
    if (req.params && req.params.id) {

        await Conferences.findByIdAndDelete(req.params.id)
            .populate('researchList', '_id topic presenterFee')
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}


module.exports = {
    addConference,
    getAllConferences,
    getSpecificConference,
    editConference,
    deleteConference
};