const NotifySchema = require('../schemas/Notification');

const getSpecificNotification = async (req, res) => {

    await NotifySchema.find({type: req.params.userType})
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
const getNotificationAll =async (req,res)=>{
    await NotifySchema.find()
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ message: "abc" });
        });
}
const deleteNotify = async (req, res) => {
    if (req.params && req.params.id) {
        console.log(req.params.id);
        await NotifySchema.findByIdAndDelete(req.params.id)
            .then(() => res.json('notification Deleted Successful!'))
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}
module.exports = {
    createNotification,
    getSpecificNotification,
    getNotificationAll,
    deleteNotify
}
