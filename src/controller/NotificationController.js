const NotifySchema = require('../schemas/Notification');

const getSpecificNotification = async (req, res) => {
        await NotifySchema.find(req.params.userType)
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
}
const createNotification = async (req, res) => {
    if (req.body) {
        let {title, type, message, expire} = req.body;
        const notification = new NotifySchema({
            title,
            type,
            message,
            expire,
        });
        await notification.save()
            .then(notification => {
                res.status(200).send({notification: notification });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}


module.exports = {
    createNotification,
    getSpecificNotification
}
