const WorkshopEvent = require('../schemas/WorkshopEvents');

const addWorkshopEvents = async (req, res) => {
    if (req.body) {
        const course = new WorkshopEvent(req.body);
        await course.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

module.exports = {
    addWorkshopEvents
};