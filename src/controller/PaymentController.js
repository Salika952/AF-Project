const Payment = require('../schemas/Payment');

const addPayment = async (req, res) => {
    if (req.body) {
        const payment = new Payment(req.body);
        await payment.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllPayment = async (req, res) => {

    await Payment.find().populate('pay_users', 'user_name user_email user_telephone user_address user_position user_password')
        .then(data => {
            res.status(200).send({ data: data });
            console.log(data);
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getSpecificPayment = async (req, res) => {
    if (req.params && req.params.id) {
        await Payment.findById(req.params.id)
            .populate('pay_users', 'user_name')
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}
const editPayment = async (req, res) => {
    if (req.params && req.params.id) {

        const updated = req.body;

        await Payment.findByIdAndUpdate(req.params.id,updated)
            .populate('pay_users', 'user_name')
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}


const deletePayment = async (req, res) => {
    if (req.params && req.params.id) {

        await Payment.findByIdAndDelete(req.params.id)
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}


const calculateAmount = async (req, res) => {

    const course = await Payment.find()
        .then(data => {
            res.status(200).send({ data: data.pay_amount });
            console.log(Payment.pay_amount);
        })
    // let totalAmount = Payment.pay_amount;
    // let i = 0;
    // for (i=0;i<5;i++){
    //     totalAmount = totalAmount + 5;
    // }


        // course.Payment.map((subject) => {
        //     totalAmount += subject.pay_amount;
        // });

    // res.status(200).send({ totalAmount: totalAmount });



}


module.exports = {
    addPayment,
    getAllPayment,
    getSpecificPayment,
    editPayment,
    calculateAmount,
    deletePayment
};

// .populate('pay_users', 'user_name')