const Payment = require('../schemas/Payment');

const addPayment = async (req, res) => {
    if (req.body) {
        const course = new Payment(req.body);
        await course.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllPayment = async (req, res) => {

    await Payment.find()
        .then(data => {
            res.status(200).send({ data: data });
            console.log(data);
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

module.exports = {
    addPayment,
    getAllPayment
};

// .populate('pay_users', 'user_name')