const Conferences = require('../schemas/Conferences');

const addConference = async (req, res) => {
    if (req.body) {
        const conference = new Conferences(req.body);
        await conference.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllConferences = async (req, res) => {

    await Conferences.find()
            .populate('con_researchList', 'res_topic res_presenterFee')
            .populate('con_workshopList', 'work_topic')
            .populate('con_attendees', 'user_name user_email')
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
            .populate('con_researchList', 'res_topic res_presenterFee')
            .populate('con_workshopList', 'work_topic')
            .populate('con_attendees', 'user_name user_email')
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
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const addAttendee = async (req, res) => {
    if (req.params) {

        const aID = req.body.attendeeID;

        const post = await Conferences.findById(req.body.conferenceID);

        await post.con_attendees.push(aID);

        await Conferences.findByIdAndUpdate(req.body.conferenceID,post)
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
    deleteConference,
    addAttendee
};