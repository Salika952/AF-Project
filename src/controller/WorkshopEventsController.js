const WorkshopController = require('../schemas/WorkshopEvents');

const addWorkshopEvents = async (req, res) => {
    console.log("aaaaa");
    if (req.body) {
        const workshop = new WorkshopController(req.body);
        await workshop.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllWorkshopEvents = async (req, res) => {

    await WorkshopController.find()
        .populate('work_conductors', 'user_name user_telephone')
        .populate('work_proposal', 'propo_content propo_contact propo_sign')
        .then(data => {
            res.status(200).send({ data: data });
            console.log(data);
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getSpecificWorkshopEvent = async (req, res) => {
    if (req.params && req.params.id) {
        await WorkshopController.findById(req.params.id)
            .populate('work_conductors', 'user_name user_telephone')
            .populate('work_proposal', 'propo_content propo_contact propo_sign')
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const editWorkshopEvents = async (req, res) => {
    if (req.params && req.params.id) {

        const updated = req.body;

        await WorkshopController.findByIdAndUpdate(req.params.id,updated)
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const deleteWorkshopEvents = async (req, res) => {
    if (req.params && req.params.id) {

        await WorkshopController.findByIdAndDelete(req.params.id)
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}
const getAWork = async (req, res) => {

    await WorkshopController.find({work_validation:true})
        .then(response => {
            res.status(200).send({ data: response });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });


}

module.exports = {
    addWorkshopEvents,
    getAllWorkshopEvents,
    getSpecificWorkshopEvent,
    editWorkshopEvents,
    deleteWorkshopEvents,
    getAWork
};