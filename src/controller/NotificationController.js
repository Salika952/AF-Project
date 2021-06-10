const NotifySchema = require('../schemas/Notification');


const getSpecificNotification = async (req, res) => {
    if (req.params && req.params.id) {
        await NotifySchema.findById(req.params.id)
            .populate('noti_users', 'user_name user_position')
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const addNotification = async (req, res) => {
    if (req.body) {
        const notify = new NotifySchema(req.body);
        await notify.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}


module.exports = {
    addNotification,
    getSpecificNotification
}
